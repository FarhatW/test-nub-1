import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRegisterUserComponent} from './home-register/home-register-user/home-register-user.component';
import {HomeContentComponent} from './home-content/home-content.component';
import {HomeRegisterComponent} from './home-register/home-register.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      component: HomeContentComponent,
    },
    {
      path: 'register',
      component: HomeRegisterComponent,
      children: [
        {
          path: 'supplier',
          component: HomeRegisterUserComponent,
          data: {
            isHomePage: true,
            isSupplier: true,
            isConfirmedSupplier: true

          }
        },
        {
          path: 'agent',
          component: HomeRegisterUserComponent,
          data: {
            isHomePage: true,
            isSupplier: false,
            isConfirmedSupplier: false


          }
        }
      ]
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class HomeRoutingModule {
}

