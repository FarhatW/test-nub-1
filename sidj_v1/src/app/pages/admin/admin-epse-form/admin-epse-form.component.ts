import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-admin-epse-form',
  templateUrl: './admin-epse-form.component.html',
  styleUrls: ['./admin-epse-form.component.scss']
})
export class AdminEpseFormComponent implements OnInit {

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
