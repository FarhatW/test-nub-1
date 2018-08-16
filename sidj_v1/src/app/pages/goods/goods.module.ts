import { NgModule } from '@angular/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ThemeModule} from '../../@theme/theme.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {InterceptorService} from '../../@core/data/services/interceptor.service';
import {GoodsComponent} from './goods.component';
import {GoodFormComponent} from './good-form/good-form.component';
import {GoodsroutedComponents, GoodsRoutingModule} from './goods-routing.module';
import {ToasterModule} from 'angular2-toaster';
import {GoodExcelImportComponent} from './good-excel-import/good-excel-import.component';
import {GoodFormStep2Component} from './good-form/good-form-step-2/good-form-step-2.component';
import {GoodFormStep1Component} from './good-form/good-form-step-1/good-form-step-1.component';
import {GoodFormStep4Component} from './good-form/good-form-step-4/good-form-step-4.component';
import {GoodFormStep3Component} from './good-form/good-form-step-3/good-form-step-3.component';
import {GoodFormStep6Component} from './good-form/good-form-step-6/good-form-step-6.component';
import {GoodFormStep5Component} from './good-form/good-form-step-5/good-form-step-5.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ExcelImportValueCheckerService} from './good-excel-import/shared/excel-import-value-checker.service';
import {GoodFileManagerComponent} from './good-file-manager/good-file-manager.component';
import {
  ButtonModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  GrowlModule,
  InputTextModule,
  SharedModule,
  TreeModule,
} from 'primeng/primeng';
import {GenderService} from '../../@core/data/services/gender.service';
import {
  GoodExcelFieldsToPdfComponent} from './good-excel-import/good-excel-fields-to-pdf/good-excel-fields-to-pdf.component';
import {ExcelImportValueConverterService} from './good-excel-import/shared/excel-import-value-converter.service';
import {NgAutoCompleteModule} from 'ng-auto-complete';
import {GoodFormService} from './good-form/shared/good-form.service';
import { GoodsListComponent } from './good-list/goods-list.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxBarcodeModule} from 'ngx-barcode';
import {
  GoodFormSupplierDisplayComponent } from './good-form/good-form-supplier-display/good-form-supplier-display.component';
import {BreadcrumbComponent} from './good-form/shared/breadcrumb/breadcrumb.component';
import {PageSharedModule} from '../shared/page-shared.module';
import {NbPopoverModule} from '@nebular/theme';
import {SharedExportPdfComponent} from "../shared/shared-export-pdf/shared-export-pdf.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    ThemeModule,
    NgxBarcodeModule,
    HttpClientModule,
    GoodsRoutingModule,
    Ng2SmartTableModule,
    ButtonModule,
    GrowlModule,
    ToasterModule,
    DropdownModule,
    FileUploadModule,
    DataTableModule,
    TreeModule,
    SharedModule,
    NbPopoverModule,
    PageSharedModule,
    DialogModule,
    InputTextModule,
    NgAutoCompleteModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }})],
  declarations: [...GoodsroutedComponents,
    GoodsComponent,
    GoodFormComponent,
    GoodFormStep2Component,
    GoodFormStep1Component,
    GoodFormStep4Component,
    GoodFormStep3Component,
    GoodFormStep6Component,
    GoodFormStep5Component,
    GoodExcelImportComponent,
    GoodFileManagerComponent,
    GoodExcelFieldsToPdfComponent,
    GoodsListComponent,
    GoodFormSupplierDisplayComponent,
    BreadcrumbComponent,
  ],
  exports: [SharedExportPdfComponent],
  providers: [
    ExcelImportValueCheckerService,
    ExcelImportValueConverterService,
    GoodFormService,
    GenderService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
})
export class GoodsModule { }
