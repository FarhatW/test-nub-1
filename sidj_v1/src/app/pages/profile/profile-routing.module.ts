import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../@core/AuthGuard/auth.guard";
import {ProfileComponent} from "./profile.component";
import {NgModule} from "@angular/core";
import {ProfileFormComponent} from "./profile-form/profile-form.component";

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: ':id',
      component: ProfileFormComponent,
      data: {
        isProfile: true
      },
    },
    ]}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProfileRoutingModule {

}
