import { Component, OnInit } from '@angular/core';
import {SaveSupplier} from "../../../@core/data/models/users/suppliers/saveSupplier";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {ToasterService} from "angular2-toaster";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../@core/data/services/authenticationService";
import {UserService} from "../../../@core/data/services/user.service";
import {HelperService} from "../../../@core/utils/Helper.service";
import {MappingUserService} from "../../../@core/data/services/mapping-user.service";
import {EMAIL_REGEX} from "../../../@core/utils/regex-base";

@Component({
  selector: 'ngx-active-suppliers-modal',
  templateUrl: './active-suppliers-modal.component.html',
  styleUrls: ['./active-suppliers-modal.component.scss']
})
export class ActiveSuppliersModalComponent implements OnInit {
  user: SaveSupplier;
  isFrench: boolean;
  errors: string[];
  messages: string[];
  emailPattern = EMAIL_REGEX;
  isSupplier: boolean;
  englishTranslation: any = {
    editSupplierTitle: 'Supplier has been updated.',
    editSupplierBody: 'Informations have been updated on this profile.',
    editAgentTitle: 'Agent has been updated.',
    editAgentBody: 'Informations have been updated on this profile.',
    error: 'Error !'

  };

  frenchTranslation: any = {
    editSupplierTitle: 'Fournisseur modifié.',
    editSupplierBody: 'Les informations ont été modifiées sur ce profile.',
    editAgentTitle: 'Agent modifié.',
    editAgentBody: 'Les informations ont été modifiées sur ce profile.',

    error: 'Erreur !'
  };
  constructor(private activeModal: NgbActiveModal,
              private toasterService: ToasterService,
              private route: Router,
              private userService:  UserService,
              private helperService: HelperService,
              private mappingService: MappingUserService,
              private translationService: TranslationService,
              private notificationService: NotificationService,
              private authService: AuthenticationService) {

   this.user = this.mappingService.setSupplier( this.userService.getCurrentSupplier())

  }

  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }

  updateUser() {
    const toasterContent = this.isFrench ? this.frenchTranslation : this.englishTranslation;
    this.user.isConfirmedAccount = true;
    this.userService.updateSupplier(this.user).subscribe(data => {
      switch (data.userType.toLowerCase()) {
        case 'supplier': {
          this.isSupplier = true;
          break;
        }

        default: {
          // TODO : manage errors.
          this.notificationService.showErrorToast('error', 'error')
        }
      }
      this._handleSubmitSuccess(data, toasterContent);
    });
  }

  _handleSubmitSuccess(res, toasterContent ) {

    const title = this.isSupplier ? toasterContent.editSupplierTitle : toasterContent.editAgentTitle;

    const body = this.isSupplier ? toasterContent.editSupplierBody : toasterContent.editAgentBody;


    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
      this.closeModal();
   }
}
