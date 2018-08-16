import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SuppliersRoutingModule, routedComponents } from './suppliers-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserService } from '../../@core/data/services/user.service';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DeleteRoleModalComponent} from './shared/Modal/DeleteSupplierModal.component';
import { SupplierFormComponent} from './supplier-form/supplier-form.component';
import {SuppliersComponent} from './suppliers.component';
import {InterceptorService} from '../../@core/data/services/interceptor.service';
import {ToasterModule} from "angular2-toaster";
import {PageSharedModule} from '../shared/page-shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    ThemeModule,
    HttpClientModule,
    SuppliersRoutingModule,
    NgxDatatableModule,
    PageSharedModule,
    ToasterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [
    ...routedComponents,
    SupplierListComponent,
    DeleteRoleModalComponent,
    SupplierFormComponent,
    SuppliersComponent,

  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
})
export class SuppliersModule { }
