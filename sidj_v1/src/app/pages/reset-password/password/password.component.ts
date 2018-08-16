import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordFormService} from "./password-form.service";
import {UserService} from "../../../@core/data/services/user.service";
import {HelperService} from "../../../@core/utils/Helper.service";
import {ToasterService} from "angular2-toaster";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {
  FormUserPasswordSaveModel,
  ResetPasswordResource
} from "../../../@core/data/models/password/ResetPasswordResource";
import {User} from "../../../@core/data/models/users/user";
import {Agent} from "../../../@core/data/models/users/agents/agent";

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  apiKey: string;
  userFormErrorsBool: any;
  userAuthForm: FormGroup;
  userFormErrors: any;
  submitting: boolean;
  userAuth: ResetPasswordResource = {
    code: '',
    confirmPassword: '',
    email: '',
    password: ''
  };
  error: boolean;
  submitUserSub: Subscription;
  formUserAuth: FormUserPasswordSaveModel;
  formChangeSub: Subscription;
  isEdit: boolean;
  constructor(public userf: PasswordFormService,
              private fb: FormBuilder,
              public toasterService: ToasterService,
              public notificationService: NotificationService,
              private userService: UserService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              private router: Router) {
    this.apiKey = this.route.snapshot.queryParams['apiKey'] || undefined;
    }

  ngOnInit() {

    if ( this.apiKey !== undefined) {

      this.userFormErrors = this.userf.usersPasswordFormErrors;
      this.userFormErrorsBool = this.userf.usersPasswordFormErrorsBool;
      this.formUserAuth = this._setFormUser();
      this._buildForm();
      const user = this.helperService.getDecodedAccessToken(this.apiKey);
      this.userAuth.code = this.apiKey;
      this.userAuth.email = user.email;

    }

  }

  isPasswordConfirmed() {

    return  this.userAuthForm.get([ 'password']).value ===
      this.userAuthForm.get(['confirmPassword']).value
      && this.userAuthForm.get([ 'confirmPassword']).value !== '' ;


  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value)  {

      return {invalid: true};
    }
  }
  private _setFormUser() {
    if (!this.isEdit) {
      return new FormUserPasswordSaveModel(
        null,
        null
      );
    } else {
      return new FormUserPasswordSaveModel(
        this.userAuth.password,
        this.userAuth.confirmPassword,
      )
    }

  }
  _blurError(formError, event) {
    this.userFormErrorsBool[event.srcElement.id] = !!formError;
    this.isPasswordConfirmed();
  }

  private _buildForm() {
    this.userAuthForm = this.fb.group({
      password:  [this.formUserAuth.password,[
        Validators.minLength(this.userf.nameMin),
        Validators.required
      ]],
      confirmPassword:  [this.formUserAuth.confirmPassword,[
        Validators.minLength(this.userf.nameMin),
        Validators.required
      ]],


    }, {validator : this.passwordConfirming});

    this.formChangeSub = this.userAuthForm
      .valueChanges
      .subscribe(data => this._onValueChanged());

    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty()
          }
        }
      };
      _markDirty(this.userAuthForm);
    }
    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.userAuthForm) {
      return;
    }
    this.isPasswordConfirmed();
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {

      if (control && control.dirty && control.invalid) {

        const messages = this.userf.usersPasswordFormValidationMessages[field];

        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };
    for (const field in this.userFormErrors) {
      if (this.userFormErrors.hasOwnProperty(field)) {
        // if (field !== 'datesGroup') {
        this.userFormErrors[field] = '';
        _setErrMsgs(this.userAuthForm.get(field), this.userFormErrors, field);
      }
    }
  }

  onSubmit() {
    this.submitting = true;
    this.userAuth.password =  this.userAuthForm.get([ 'password']).value;
    this.userAuth.confirmPassword =  this.userAuthForm.get([ 'confirmPassword']).value;
    this.submitUserSub = this.userService.resetPassword(this.userAuth)
      .subscribe(data => this._handleSubmitSucuserss(data),
        err => this._handleSubmitError(err));


  }

  private _handleSubmitSucuserss(res) {
    this.error = false;
    this.submitting = false;
    const title = this.isEdit ? 'user Modifié' : 'user Ajouté'
    let body = 'Le user ' + res.firstName + ' a bien été ';
    body += this.isEdit ? 'modifié.' : 'ajouté.'
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
    this.router.navigate(['/']);

  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
    const title = 'une erreur est survenue';
    const body = err.error;
    this.toasterService.popAsync(this.notificationService.showErrorToast('ERROR',
      err.error.Email !== undefined ? err.error.Email : err.error.detailedMessage))
  }


  _resetForm() {
    this.userAuthForm.reset();
  }
}
