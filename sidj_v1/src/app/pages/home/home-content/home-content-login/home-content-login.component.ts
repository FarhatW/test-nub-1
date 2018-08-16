import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../@core/data/services/authenticationService';
import {LocalStorageService} from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {HelperService} from '../../../../@core/utils/Helper.service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {ForgotPasswordModalComponent} from './forgot-password-modal/forgot-password-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {User} from "../../../../@core/data/models/users/user";
import {UserToken} from "../../../../@core/data/models/users/userToken";
import {UserService} from "../../../../@core/data/services/user.service";

@Component({
  selector: 'ngx-home-content-login',
  templateUrl: './home-content-login.component.html',
  styleUrls: ['./home-content-login.component.scss'],
})
export class HomeContentLoginComponent implements OnInit {

  frenchSub: Subscription;
  isFrench: boolean;
  user: UserToken;


  constructor(public authenticationService: AuthenticationService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private  modalService: NgbModal,
              private translationService: TranslationService,
              public translate: TranslateService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private userService: UserService,
              private cookieService: CookieService,
              private helperService: HelperService) {

    this.frenchSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });
  }

  showAddModal() {

    const activeModal = this.modalService.open(ForgotPasswordModalComponent, {size: 'lg', container: ''});
    activeModal.result.then(result => {
    });
    activeModal.componentInstance.modalHeader = 'Votre email';
  }

  ngOnInit() {
  }

  saveLogin = {userMail: '', password: ''}

  submit() {

    this.authenticationService.login(this.saveLogin.userMail, this.saveLogin.password)
      .subscribe(x => {
          this.localStorageService.clearAll();
          this.localStorageService.set('Token', x.token);
         this.router.navigate(['/home/dashboard']);

        },
        err => {
          const title = this.isFrench ? 'Erreur !' : 'Error !';
          const body = this.isFrench ? err.error.messageData.fr : err.error.messageData.eng;
          this.toasterService.popAsync(this.notificationService.showErrorToast(title, body));

        });
  }

  checkHighestRank(intArr: number[]): number {
    let highest = 10;
    let i = 0;

    for (i; i >= highest; i++) {
      if (intArr[i] < highest) {
        highest = intArr[i]
      }
    }
    return highest;
  }
}
