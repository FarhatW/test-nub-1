import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HelperService} from '../@core/utils/Helper.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {TranslationService} from '../@core/data/services/translation.service';
import {CookieService} from 'ngx-cookie-service';
import {ToasterConfig} from 'angular2-toaster';
import {UserToken} from "../@core/data/models/users/userToken";
import {UserService} from "../@core/data/services/user.service";
import {AuthenticationService} from "../@core/data/services/authenticationService";
import {MENU_ITEMS} from "./pages-menu-fr";
import {MENU_ITEMS_EN} from "./pages-menu-en";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from 'rxjs/Subscription';
import {NbMenuItem} from "@nebular/theme";


@Component({
  selector: 'ngx-pages',
  template: `
    <toaster-container></toaster-container>
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {


  isFrench: boolean;
  menu = MENU_ITEMS;
  menuSub: Subscription;
  user: UserToken;
  userSub: any

  constructor(private helperService: HelperService,
              private localStorage: LocalStorageService,
              private userService: UserService,
              private router: Router,
              private translate: TranslateService,
              private translationService: TranslationService,
  ) {

    this.userSub = this.userService.getSetUser().subscribe(x => this.user = x);
    console.log('this.user', this.user);

    this.menuSub = this.translationService.getLanguage().subscribe(l => setTimeout(() => {
      this.menu = (this.isFrench = l === true) ? MENU_ITEMS : MENU_ITEMS_EN;
      if (this.user !== null) {

        this.menu.filter(x => x.roles !== undefined)
          .map(x => x.hidden = this.checkRoles(x, this.user));

        this.menu.filter(x => x.children !== undefined)
          .map(x => x.children.filter(c => c.roles !== undefined)
            .map(c => c.hidden = this.checkRoles(c, this.user)));

        // this.menu.find(x => x.title.toLowerCase() === 'Mon Profil'.toLowerCase() ||
        //   x.title.toLowerCase() === 'My Profile'.toLowerCase()).link = 'profile/' + this.user.nameid;


        this.menu.find(x => x.title.toLowerCase()
          === 'Produit'.toLowerCase() || x.title.toLowerCase() === 'Product'.toLowerCase())
          .children.find(x => x.title.toLowerCase() === 'Liste des produits'.toLowerCase() ||
          x.title.toLowerCase() === 'Product List'.toLowerCase()).link = 'goods/list/' + this.user.nameid;
      }
    }, 0));
  }

  checkRoles(menuItem: NbMenuItem, userToken: UserToken): boolean {
    let isValidRole: boolean = false;
    if (userToken.role instanceof Array) {
      userToken.role.forEach(item => {
        if (!isValidRole) {
          isValidRole = menuItem.roles.includes(item);
        }
      });
    } else if (userToken.role) {
      isValidRole = menuItem.roles.includes(userToken.role);
    }

    return !isValidRole;
  }

  config: ToasterConfig;

  ngOnInit(): void {

    if (this.helperService.getToken() === null) {
      this.router.navigate(['/']);
    }

    this.config = new ToasterConfig({
      positionClass: 'toast-top-right',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'fade',
      limit: 5,
    });

  }

  ngOnDestroy(): void {
    if (this.menuSub) {
      this.menuSub.unsubscribe();
    }
  }
}
