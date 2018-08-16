import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../@core/utils/Helper.service';
import {CookieService} from "ngx-cookie-service";
import {Supplier} from "../../@core/data/models/users/suppliers/supplier";
import {UserService} from "../../@core/data/services/user.service";
import {unescapeHtml} from "@angular/platform-browser/src/browser/transfer_state";
import {User} from "../../@core/data/models/users/user";
import {Agent} from "../../@core/data/models/users/agents/agent";



@Component({
selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  isLogged: boolean = false;
  isAdmin: boolean = false;
  user: any;


  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private userService: UserService,
              private cookieService: CookieService,
              private helperService: HelperService) {
  }

  ngOnInit() {
    const user=this.helperService.getDecodedAccessToken(this.helperService.getToken());
    switch (user.userType.toLowerCase()) {
      case 'supplier': {
        this.router.navigate(['/home/goods/list/' + user.nameid])
        break;
      }
      case 'Agent': {
        this.router.navigate(['/home/suppliers/list/' + user.nameid])
        break;
      }
      default: {
        this.router.navigate(['/home/suppliers/list/']);
        break;
      }
    }

  }
}
