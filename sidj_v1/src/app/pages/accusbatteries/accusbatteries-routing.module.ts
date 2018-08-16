import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AccusbatteriesComponent} from "./accusbatteries.component";
import {AccusbatteriesListComponent} from "./accusbatteries-list/accusbatteries-list.component";
import {AccusBatteryFormComponent} from "./accusbatteries-list/accusbattery-form/accus-battery-form.component";

const routes: Routes = [{
  path: '',
  component: AccusbatteriesComponent,
  children: [
   {
    path: 'list',
    component: AccusbatteriesListComponent,
     children: [
       {
         path: 'new-accus',
         component: AccusBatteryFormComponent,
         data: {
           isAccus: true,
           title: 'Nouvelle Batterie'
         }
       },
       {
         path: 'new-battery',
         component: AccusBatteryFormComponent,
         data: {
           isAccus: false,
           title: 'Nouvelle pile'

         }
       },
       {
         path: 'accus/:id',
         component: AccusBatteryFormComponent,
         data: {
           isAccus: true,
           title: 'Batterie '

         }
       },
       {
         path: 'battery/:id',
         component: AccusBatteryFormComponent,
         data: {
           isAccus: false,
           title: 'Pile '
         }
       }
     ]
  },
    {
      path: '',
      redirectTo: 'list'
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccusbatteriesRoutingModule { }

export const routedComponents = [
];
