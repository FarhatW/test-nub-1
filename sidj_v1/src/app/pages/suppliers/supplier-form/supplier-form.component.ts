import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Supplier} from '../../../@core/data/models/users/suppliers/supplier';
import {UserService} from '../../../@core/data/services/user.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../../@core/utils/Helper.service';
import {CookieService} from 'ngx-cookie-service';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {ToasterService} from 'angular2-toaster';
import {CountryService} from "../../../@core/data/services/country.service";
import {Country} from "../../../@core/data/models/country";
import {NotificationService} from "../../../@core/data/services/notification.service";
import {SaveSupplier} from "../../../@core/data/models/users/suppliers/saveSupplier";

// import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'ngx-supplier-form',
  styleUrls: ['./supplier-form.component.scss'],
  templateUrl: './supplier-form.component.html',
})
export class SupplierFormComponent implements OnInit {
  isFrench: boolean;
  user: any;
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
