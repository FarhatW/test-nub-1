import {UserService} from "../../@core/data/services/user.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgModule} from "@angular/core";
import {PageSharedModule} from "../shared/page-shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ThemeModule} from "../../@theme/theme.module";
import {InterceptorService} from "../../@core/data/services/interceptor.service";
import {CommonModule} from "@angular/common";
import {ToasterModule} from "angular2-toaster";
import {HttpLoaderFactory} from '../suppliers/suppliers.module';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminEpseFormComponent } from './admin-epse-form/admin-epse-form.component';
import { AdminSidjFormComponent } from './admin-sidj-form/admin-sidj-form.component';
import { AdminListFormComponent } from './admin-list-form/admin-list-form.component';
import {AdminComponent} from "./admin.component";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    HttpClientModule,
    NgxDatatableModule,
    PageSharedModule,
    ToasterModule,
    AdminRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [
    AdminComponent,
  AdminEpseFormComponent,
  AdminSidjFormComponent,
  AdminListFormComponent] ,
  exports: [
    AdminComponent,
    AdminEpseFormComponent,
    AdminSidjFormComponent,
    AdminListFormComponent
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
})
export class AdminModule { }
