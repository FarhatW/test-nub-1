import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {ListerarticleComponent} from '../dashboard/listerarticle/listerarticle.component';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxBarcodeModule} from 'ngx-barcode';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeHeaderComponent} from '../home/home-header/home-header.component';
import { SharedUserFormComponent } from './shared-user-form/shared-user-form.component';
import {SharedSupplierListComponent} from './shared-supplier-list/shared-supplier-list.component';
import {RouterModule} from '@angular/router';
import {SharedAgentListComponent} from './shared-agent-list/shared-agent-list.component';
import {SharedProductListComponent} from './shared-product-list/shared-product-list.component';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {SharedExportPdfComponent} from './shared-export-pdf/shared-export-pdf.component';
import {SharedButtonsComponent} from './shared-buttons/shared-buttons.component';
import {ActiveSuppliersModalComponent} from "../suppliers/active-suppliers-modal/active-suppliers-modal.component";
import {GoodViewPdfModalComponent} from "../goods/good-view-pdf-modal/good-view-pdf-modal.component";
import { SharedPdfViewComponent } from './shared-pdf-view/shared-pdf-view.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ThemeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
    NgxEchartsModule,
    NgxBarcodeModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    PDFExportModule,
  ],
  declarations: [
    ListerarticleComponent,
    HomeHeaderComponent,
    SharedUserFormComponent,
    SharedSupplierListComponent,
    SharedAgentListComponent,
    SharedProductListComponent,
    SharedButtonsComponent,
    SharedExportPdfComponent,
    ActiveSuppliersModalComponent,
    GoodViewPdfModalComponent,
    SharedPdfViewComponent
  ],
  exports: [
    ListerarticleComponent,
    HomeHeaderComponent,
    SharedUserFormComponent,
    SharedSupplierListComponent,
    SharedAgentListComponent,
    SharedProductListComponent,
    SharedButtonsComponent ,
    SharedExportPdfComponent,
    GoodViewPdfModalComponent,
    SharedPdfViewComponent

  ],
  entryComponents: [
    ActiveSuppliersModalComponent,
    GoodViewPdfModalComponent
  ],
})
export class PageSharedModule { }
