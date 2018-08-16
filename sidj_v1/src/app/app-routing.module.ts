import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {PasswordComponent} from './pages/reset-password/password/password.component';


const routes: Routes = [
  { path: 'home', loadChildren: 'app/pages/pages.module#PagesModule'},
  { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },

  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'reset-password',
        component: PasswordComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'home/dashboard' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
