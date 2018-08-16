import {RouterModule, Routes} from "@angular/router";
import {EpsComponent} from "./eps.component";
import {NgModule} from "@angular/core";
import {EpsMainComponent} from "./eps-main/eps-main.component";

const routes: Routes = [{
  path: '',
  component: EpsComponent,
  children: [
    {
      path: 'main',
      component: EpsMainComponent,
    },
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class EpsRoutingModule {}
