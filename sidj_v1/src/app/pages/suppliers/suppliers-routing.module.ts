import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SuppliersComponent} from './suppliers.component';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';
import {AuthGuard} from '../../@core/AuthGuard/auth.guard';
import {SupplierListComponent} from './supplier-list/supplier-list.component';

const routes: Routes = [{
  path: '',
  component: SuppliersComponent,
  data: {
    isSupplier: true,
    isHomePage: false,
    isConfirmedSupplier: false
  },
  children: [
    {
      path: 'new',
      component: SupplierFormComponent,
      canActivate: [AuthGuard], data: {
        roles: ['AGENTS', 'SUPADM'],
        isHomePage: false,
        isSupplier: true,
        isProfile: false
      },
    },
    {
      path: 'edit/:id',
      component: SupplierFormComponent,
      canActivate: [AuthGuard], data:
        {
          roles: ['AGENTS', 'ADSIDJ', 'SUPADM'],
          isHomePage: false,
          isSupplier: true,
          isProfile: false},
    },
    {
      path: 'list',
      component: SupplierListComponent,
      canActivate: [AuthGuard], data: {roles: ['AGENTS', 'ADSIDJ', 'SUPADM']},
    },
    {
      path: 'list/:id',
      component: SupplierListComponent,
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
export class SuppliersRoutingModule {

}

export const routedComponents = [
  SupplierFormComponent,
  SupplierListComponent,
];
