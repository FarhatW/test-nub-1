import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { TeamComponent } from './team/team.component';
import { WeatherComponent } from './weather/weather.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PageSharedModule} from "../shared/page-shared.module";
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    PDFExportModule,
    ThemeModule,
    NgxEchartsModule,
    NgxBarcodeModule,
    PageSharedModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [
    DashboardComponent,
    TeamComponent,
    WeatherComponent,
  ],
  exports: [
  ],
  providers: [
    SmartTableService,
  ],
})
export class DashboardModule { }
