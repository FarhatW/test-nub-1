import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ForgotPasswordResource} from "../../../../../@core/data/models/password/ForgotPasswordResource";
import {ToasterService} from "angular2-toaster";
import {CookieService} from "ngx-cookie-service";
import {TranslationService} from "../../../../../@core/data/services/translation.service";
import {AuthenticationService} from "../../../../../@core/data/services/authenticationService";
import {NotificationService} from "../../../../../@core/data/services/notification.service";


@Component({
  selector: 'ngx-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  user: ForgotPasswordResource= {
    email: ''
  };
  isFrench: boolean;
  showMessages = {};
  submitted: boolean;
  errors: string[];
  messages: string[];
  constructor(private activeModal: NgbActiveModal,
              private toasterService: ToasterService,
              private route: Router,
              private cookieService: CookieService,
              private translationService: TranslationService,
              private notificationService: NotificationService,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }
  SignUp(){
  this.closeModal();
  this.route.navigate(['register'])
}
  SignIn() {
    this.closeModal();
    this.route.navigate(['home'])
  }
  forgetPassword() {
    this.translationService.getLanguage().subscribe(language => {
      if (language === undefined) {
        language = this.cookieService.get('Langue') === 'fr' ? true : false;
      }
      this.isFrench = language
    });

    this.authService.forgotPassword(this.user.email, this.isFrench).subscribe(x => {
        this.closeModal();
        this.toasterService.popAsync(this.notificationService.showSuccessToast('Success',
          'un email a été envoyé a ' + this.user.email))

      }, err => { console.log(err);
        this.toasterService.popAsync(this.notificationService.showErrorToast('ERROR',
          err.error.Email !== undefined ? err.error.Email : err.error.detailedMessage))
    }

    )


  }
}
