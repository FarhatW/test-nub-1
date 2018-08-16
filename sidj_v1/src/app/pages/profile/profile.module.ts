import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {HttpLoaderFactory} from "../suppliers/suppliers.module";
import {SuppliersRoutingModule} from "../suppliers/suppliers-routing.module";
import {PageSharedModule} from "../shared/page-shared.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ToasterModule} from "angular2-toaster";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";



@NgModule({
  imports: [
    ThemeModule,
    HttpClientModule,
    PageSharedModule,
    ProfileRoutingModule,
    ToasterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [ProfileFormComponent, ProfileComponent]
})
export class ProfileModule { }
