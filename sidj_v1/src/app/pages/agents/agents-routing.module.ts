import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../../@core/AuthGuard/auth.guard';
import {AgentsComponent} from "./agents.component";
import {AgentListComponent} from "./agent-list/agent-list.component";
import {SupplierListComponent} from "../suppliers/supplier-list/supplier-list.component";
import {SupplierFormComponent} from "../suppliers/supplier-form/supplier-form.component";
import {AgentFormComponent} from "./agent-form/agent-form.component";
import {SharedSupplierListComponent} from "../shared/shared-supplier-list/shared-supplier-list.component";

const routes: Routes = [{
  path: '',
  component: AgentsComponent,
  children: [
    {
      path: 'list',
      component: AgentListComponent,
      //  canActivate: [AuthGuard], data: {roles: ['ADSIDJ', 'SUPADM']},
    },
    {
      path: 'new',
       component: AgentFormComponent,
      canActivate: [AuthGuard], data: {roles: ['ADSIDJ', 'SUPADM']},
    },
    {
      path: ':id',
       component: AgentFormComponent,
      canActivate: [AuthGuard], data: {roles: ['ADSIDJ', 'SUPADM']},
    },

  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AgentsRoutingModule {

}

