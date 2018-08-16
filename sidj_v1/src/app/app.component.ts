/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Compiler, Component, OnInit} from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {BodyOutputType, Toast, ToasterConfig} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {Title} from "@angular/platform-browser";
import {TranslationService} from './@core/data/services/translation.service';
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "./@core/data/services/user.service";
import {AuthenticationService} from "./@core/data/services/authenticationService";

@Component({
  selector: 'ngx-app',
  template: '<toaster-container></toaster-container>' +
  '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private translationService: TranslationService,
              private cookieService: CookieService,
              public  translate: TranslateService,
              private userService: UserService,
              private compiler: Compiler,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Sidj Info');
    this.analytics.trackPageViews();
  }
}
