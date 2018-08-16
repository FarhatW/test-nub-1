/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InterceptorService} from './@core/data/services/interceptor.service';
import {AuthGuard} from './@core/AuthGuard/auth.guard';
import {LocalStorageModule, LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from './@core/utils/Helper.service';
import {PagesModule} from './pages/pages.module';
import {HomeModule} from './pages/home/home.module';
import {CookieService} from 'ngx-cookie-service';
import {NgAutoCompleteModule} from "ng-auto-complete";
import {ToasterModule} from 'angular2-toaster';
import {ResetPasswordModule} from './pages/reset-password/reset-password.module';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "./pages/dashboard/dashboard.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModalModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'sidj',
      storageType: 'localStorage',
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    PagesModule,
    ToasterModule,
    HomeModule,
    ResetPasswordModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    AuthGuard,
    LocalStorageService,
    HelperService,
    CookieService,

  ],
})
export class AppModule {
}
