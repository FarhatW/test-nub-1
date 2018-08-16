import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {AuthenticationService} from '../../@core/data/services/authenticationService';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UserService} from '../../@core/data/services/user.service';
import {HomeComponent} from './home.component';
import {HomeContentLoginComponent} from './home-content/home-content-login/home-content-login.component';
import {HomeContentComponent} from './home-content/home-content.component';
import {HomeRegisterUserComponent} from './home-register/home-register-user/home-register-user.component';
import { PageSharedModule } from '../shared/page-shared.module';
import { ForgotPasswordModalComponent } from './home-content/home-content-login/forgot-password-modal/forgot-password-modal.component';
import { HomeContentRegisterComponent } from './home-content/home-content-register/home-content-register.component';
import { HomeContentIdentificationComponent } from './home-content/home-content-identification/home-content-identification.component';
import { HomeContentSidjContactComponent } from "./home-content/home-content-sidj-contact/home-content-sidj-contact.component";
import {HomeRegisterComponent} from './home-register/home-register.component';
import {NbUserModule} from "@nebular/theme";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    NbUserModule,
    HttpClientModule,
    HomeRoutingModule,
    PageSharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [
    HomeComponent,
    HomeContentLoginComponent,
    HomeContentComponent,
    HomeRegisterUserComponent,
    ForgotPasswordModalComponent,
    HomeContentRegisterComponent,
    HomeContentIdentificationComponent,
    HomeContentSidjContactComponent,
    HomeRegisterComponent
  ],
  entryComponents: [
    ForgotPasswordModalComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
  ],
})
export class HomeModule { }
