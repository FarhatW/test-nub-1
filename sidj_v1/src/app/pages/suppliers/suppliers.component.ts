import {Component} from '@angular/core';
import {TranslationService} from "../../@core/data/services/translation.service";
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from "../../@core/data/services/user.service";
import {UserToken} from "../../@core/data/models/users/userToken";


@Component({
  selector: 'ngx-supplier',
  template: '<toaster-container></toaster-container>' +
  '<router-outlet></router-outlet>',
})
export class SuppliersComponent {

  languageSub: Subscription;
  userToken: UserToken;

  constructor(private cookieService: CookieService,
              private translationService: TranslationService,
              private userService: UserService,
              public translate: TranslateService) {

    this.languageSub = this.translationService.getLanguage().subscribe(lang => setTimeout( () => {
      translate.setDefaultLang(this.translationService.getCurrentLanguageAsString());
    }, 0));

    this.userService.getSetUser().subscribe(x => {
        this.userToken = x
      },
      err => {
        console.log('err', err);
      });
  }
}
