import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../../@core/AuthGuard/auth.guard';
import {GoodFormComponent} from './good-form/good-form.component';
import {GoodsComponent} from './goods.component';
import {GoodFormStep2Component} from './good-form/good-form-step-2/good-form-step-2.component';
import {
  GoodFormStep1Component,
} from './good-form/good-form-step-1/good-form-step-1.component';
import {GoodFormStep4Component} from './good-form/good-form-step-4/good-form-step-4.component';
import {
  GoodFormStep3Component,
} from './good-form/good-form-step-3/good-form-step-3.component';
import {GoodFormStep6Component} from './good-form/good-form-step-6/good-form-step-6.component';
import {GoodFormStep5Component} from './good-form/good-form-step-5/good-form-step-5.component';
import {GoodExcelImportComponent} from './good-excel-import/good-excel-import.component';
import {GoodFileManagerComponent} from './good-file-manager/good-file-manager.component';
import {GoodsListComponent} from "./good-list/goods-list.component";

const routes: Routes = [{
  path: '', component: GoodsComponent,
  canActivate: [AuthGuard], data: {
    roles: ['BASERL']
  },
  children: [
    {
      path: 'list/:id',
      component: GoodsListComponent,
      canActivate: [AuthGuard], data: { roles: ['BASERL'] },
    },
    {
      path: 'list',
      component: GoodsListComponent,
      canActivate: [AuthGuard], data: { roles: ['SUPADM'] },
    },
    {
      path: 'form', component: GoodFormComponent,
      data: {
        roles: ['BASERL', 'SUPADM']
      },
      children: [
        {
          path: 'new', component: GoodFormStep1Component,
        },
        {
          path: 'step-two', component: GoodFormStep2Component,
        }, {
          path: 'step-four', component: GoodFormStep4Component,
        }, {
          path: 'step-three', component: GoodFormStep3Component,
        }, {
          path: 'step-six', component: GoodFormStep6Component,
        }, {
          path: 'step-five', component: GoodFormStep5Component,
        }],
    },

    {
      path: 'form-edit/:id',
      component: GoodFormComponent,
      canActivate: [AuthGuard], data: {
        roles: ['BASERL', 'SUPADM']
      },
      children: [
        {
          path: '', component: GoodFormStep1Component,
        },
        {
          path: 'step-two', component: GoodFormStep2Component,
        }, {
          path: 'step-four', component: GoodFormStep4Component,
        }, {
          path: 'step-three', component: GoodFormStep3Component,
        }, {
          path: 'step-six', component: GoodFormStep6Component,
        }, {
          path: 'step-five', component: GoodFormStep5Component,
        }],
    },
    {
      path: 'excel-import',
      component: GoodExcelImportComponent,
      canActivate: [AuthGuard], data: {
        roles: ['BASERL', 'SUPADM']
      },
    },
    {
      path: 'pics-manager',
      component: GoodFileManagerComponent,
      canActivate: [AuthGuard], data: {
        roles: ['BASERL', 'SUPADM']
      },
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
export class GoodsRoutingModule {

}

export const GoodsroutedComponents = [
  GoodFormComponent,
];
