import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-home',
  template: `<nb-layout>
    <nb-layout-header>
      <ngx-home-header class="col-12"></ngx-home-header>
    </nb-layout-header>
    <nb-layout-column>
     <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>`,
  styles: [`:host ::ng-deep nb-layout .layout nb-layout-header nav{background: #417CAA; height: 150px}` ]
})

export class HomeComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {

  }
}
