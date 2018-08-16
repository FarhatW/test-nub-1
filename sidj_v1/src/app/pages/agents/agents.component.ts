import { Component } from '@angular/core';
import {UserToken} from "../../@core/data/models/users/UserToken";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../@core/data/services/user.service";
import {TranslationService} from "../../@core/data/services/translation.service";

@Component({
  selector: 'ngx-agents',
  template: `
    <toaster-container></toaster-container>
    <router-outlet></router-outlet>
  `,
})

export class AgentsComponent {
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
