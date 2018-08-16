import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-admin-sidj-form',
  templateUrl: './admin-sidj-form.component.html',
  styleUrls: ['./admin-sidj-form.component.scss']
})
export class AdminSidjFormComponent implements OnInit {

  isFrench: boolean;
  user: any;
  id: number;


  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService) {
    route.params.subscribe(p => {
      this.id = +p['id'] || 0
    });

  }

  ngOnInit() {
  }


}
