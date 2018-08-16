import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpsFileListComponent } from './eps-file-list/eps-file-list.component';
import { EpsFileImportComponent } from './eps-file-import/eps-file-import.component';
import { EpsSupplierListComponent } from './eps-supplier-list/eps-supplier-list.component';
import {RouterModule} from "@angular/router";
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ToasterModule} from "angular2-toaster";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {DragDropModule} from "primeng/primeng";
import { EpsMainComponent } from './eps-main/eps-main.component';
import {EpsRoutingModule} from "./eps-routing.module";
import {EpsComponent} from "./eps.component";
import {NgAutoCompleteModule} from "ng-auto-complete";
import {EpseService} from "../../@core/data/services/epse.service";
import {EpsFileService} from "../../@core/data/services/epsFile.service";
import {InterceptorService} from "../../@core/data/services/interceptor.service";
import {GenderService} from "../../@core/data/services/gender.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ExcelImportValueConverterService} from "../goods/good-excel-import/shared/excel-import-value-converter.service";
import {ExcelImportValueCheckerService} from "../goods/good-excel-import/shared/excel-import-value-checker.service";
import {NgbPopover, NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule,
    NgxDatatableModule,
    DragDropModule,
    NgbPopoverModule,
    NgAutoCompleteModule,
    EpsRoutingModule
  ],
  declarations: [
    EpsComponent,
    EpsFileListComponent,
    EpsFileImportComponent,
    EpsSupplierListComponent,
    EpsMainComponent],
  providers: [
    EpseService,
    EpsFileService
  ]
})
export class EpsModule { }
