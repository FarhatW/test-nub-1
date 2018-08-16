import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-accusbatteries',
  template: '<toaster-container></toaster-container>' +
  '<router-outlet></router-outlet>',
  styleUrls: ['./accusbatteries.component.scss']
})
export class AccusbatteriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
