import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-home-register',
  template: '<router-outlet></router-outlet>',
})
export class HomeRegisterComponent implements OnInit {

  constructor(
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
  }


}
