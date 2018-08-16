import {Component, OnInit} from '@angular/core';
import {equalParamsAndUrlSegments} from "@angular/router/src/router_state";

@Component({
  selector: 'ngx-users-elements',
  template: `<toaster-container></toaster-container>` +
  `<router-outlet></router-outlet>
  `,
})

export class EpsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log("eps")
  }
}
