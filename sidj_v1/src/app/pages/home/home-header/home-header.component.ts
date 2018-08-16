import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HelperService} from "../../../@core/utils/Helper.service";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {TranslationService} from "../../../@core/data/services/translation.service";
import {EventEmitter} from "selenium-webdriver";
import {NbMenuService} from "@nebular/theme";
import { filter, map } from 'rxjs/operators';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../@core/data/services/authenticationService";
@Component({
  selector: 'ngx-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @ViewChild('langSelect') langSelect;


  constructor(public translate: TranslateService,

              private helperService: HelperService,
              private router: Router,
              private authService:  AuthenticationService,
              private translationService: TranslationService,
              private cookieService: CookieService) {

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    if (this.cookieService.get('Langue') === 'fr') {
      translate.currentLang = 'fr';
      translate.setDefaultLang('fr');
    } else {
      translate.currentLang = 'en';
      translate.setDefaultLang('en');
    }
    this.translationService.setLanguage(translate.currentLang === 'fr')


  }
  public logoff(a) {
    console.log(a);


  }
  setLanguage() {
    this.translate.use(this.langSelect.nativeElement.value);
    this.translate.currentLang = this.langSelect.nativeElement.value;
    this.translate.setDefaultLang(this.langSelect.nativeElement.value);
    this.translationService.setLanguage(this.langSelect.nativeElement.value === 'fr');
    this.cookieService.set( 'Langue', this.langSelect.nativeElement.value );
  }

  ngOnInit() {


  }


}
