import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusbatteriesComponent } from './accusbatteries.component';
import { AccusbatteriesListComponent } from './accusbatteries-list/accusbatteries-list.component';
import { AccusListComponent } from './accusbatteries-list/accus-list/accus-list.component';
import { BatteryListComponent } from './accusbatteries-list/battery-list/battery-list.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ThemeModule} from "../../@theme/theme.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AccusbatteriesRoutingModule} from "./accusbatteries-routing.module";
import {ToasterModule} from "angular2-toaster";
import {HttpLoaderFactory} from "../dashboard/dashboard.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { AccusBatteryFormComponent } from './accusbatteries-list/accusbattery-form/accus-battery-form.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    HttpClientModule,
    NgxDatatableModule,
    AccusbatteriesRoutingModule,
    ToasterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }}),
  ],
  declarations: [AccusbatteriesComponent, AccusbatteriesListComponent, AccusListComponent,
    BatteryListComponent,
    AccusBatteryFormComponent]
})
export class AccusbatteriesModule { }
