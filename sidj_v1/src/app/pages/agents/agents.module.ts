import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ThemeModule} from '../../@theme/theme.module';
import {PageSharedModule} from '../shared/page-shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ToasterModule} from 'angular2-toaster';
import {HttpLoaderFactory} from '../suppliers/suppliers.module';
import {AgentsRoutingModule} from './agents-routing.module';
import {AgentsComponent} from "./agents.component";
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import {SupplierListComponent} from "../suppliers/supplier-list/supplier-list.component";
import {InterceptorService} from "../../@core/data/services/interceptor.service";
import {UserService} from "../../@core/data/services/user.service";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    HttpClientModule,
    NgxDatatableModule,
    AgentsRoutingModule,
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
    AgentsComponent,
    AgentListComponent,
    AgentFormComponent,
  ] ,
  exports: [
    AgentsComponent,
    AgentListComponent,
    AgentFormComponent,
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
})
export class AgentsModule { }
