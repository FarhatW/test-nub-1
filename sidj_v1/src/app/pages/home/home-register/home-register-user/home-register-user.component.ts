import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../@core/utils/Helper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {ToasterService} from 'angular2-toaster';
import {Country} from '../../../../@core/data/models/country';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../../../@core/data/services/user.service';
import {CountryService} from '../../../../@core/data/services/country.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {SaveSupplier} from "../../../../@core/data/models/users/suppliers/saveSupplier";
import {Supplier} from "../../../../@core/data/models/users/suppliers/supplier";

@Component({
  selector: 'ngx-register-supplier',
  templateUrl: './home-register-user.component.html',
  styleUrls: ['./home-register-user.component.scss'],
})
export class HomeRegisterUserComponent implements OnInit {

  constructor(
              public translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
    console.log('register/supplier');
  }


}
