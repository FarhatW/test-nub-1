import {RouterModule, Routes} from "@angular/router";
import {AgentFormComponent} from "../agents/agent-form/agent-form.component";
import {AuthGuard} from "../../@core/AuthGuard/auth.guard";
import {AgentsComponent} from "../agents/agents.component";
import {NgModule} from "@angular/core";
import {AdminListFormComponent} from "./admin-list-form/admin-list-form.component";
import {AdminEpseFormComponent} from "./admin-epse-form/admin-epse-form.component";
import {AdminSidjFormComponent} from "./admin-sidj-form/admin-sidj-form.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'list',
      component: AdminListFormComponent,
      //  canActivate: [AuthGuard], data: {roles: ['ADSIDJ', 'SUPADM']},
    },
    {
      path: 'epse/new',
      component: AdminEpseFormComponent,
      canActivate: [AuthGuard], data: {roles: ['SUPADM']},
    },
    {
      path: 'epse/edit/:id',
      component: AdminEpseFormComponent,
      canActivate: [AuthGuard], data: {roles: ['SUPADM']},
    },
    {
      path: 'sidj/new',
      component: AdminSidjFormComponent,
      canActivate: [AuthGuard], data: {roles: ['SUPADM']},
    },
    {
      path: 'sidj/edit/:id',
      component: AdminSidjFormComponent,
      canActivate: [AuthGuard], data: {roles: ['SUPADM']},
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
export class AdminRoutingModule {

}
