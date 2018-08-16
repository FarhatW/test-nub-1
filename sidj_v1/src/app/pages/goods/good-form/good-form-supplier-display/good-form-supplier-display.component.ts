import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../@core/data/services/user.service';
import {GoodFormService} from '../shared/good-form.service';

@Component({
  selector: 'ngx-good-form-supplier-display',
  templateUrl: './good-form-supplier-display.component.html',
  styleUrls: ['./good-form-supplier-display.component.scss'],
})
export class GoodFormSupplierDisplayComponent implements OnInit {

  currentSupplier: any;
  constructor(private userService: UserService,
              private goodFormService: GoodFormService) { }

  ngOnInit() {
    this.goodFormService.getCurrentAffectedSupplier().subscribe(x => {
        this.currentSupplier = x
    });
  }
}
