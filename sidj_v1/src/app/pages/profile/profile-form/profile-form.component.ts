import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
  ) {
    route.params.subscribe(p => {
      this.id = +p['id'] || 0
    });

  }

  ngOnInit() {
  }

}
