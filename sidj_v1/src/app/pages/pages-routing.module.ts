import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../@core/AuthGuard/auth.guard';
import {SharedUserFormComponent} from './shared/shared-user-form/shared-user-form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'home/dashboard',
      pathMatch: 'full',
      canActivate: [AuthGuard]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile',
      loadChildren: './profile/profile.module#ProfileModule',
    },
    {
      path: 'dashboard/:id',
      component: DashboardComponent,
    },
    {
      path: 'epse',
      loadChildren: './eps/eps.module#EpsModule',
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule',
    },
    {
      path: 'ui-features',
      loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    }, {
      path: 'components',
      loadChildren: './components/components.module#ComponentsModule',
    }, {
      path: 'suppliers',
      loadChildren: './suppliers/suppliers.module#SuppliersModule',
    }, {
      path: 'goods',
      loadChildren: './goods/goods.module#GoodsModule',
    }, {
      path: 'accusbatteries',
      loadChildren: './accusbatteries/accusbatteries.module#AccusbatteriesModule',
    },
    {
      path: 'agents',
      loadChildren: './agents/agents.module#AgentsModule'
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
