import {HostListener, Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Supplier} from "../models/users/suppliers/supplier"
import {NotificationService} from "./notification.service";
import {ToasterService} from "angular2-toaster";
import {BehaviorSubject, Observable} from "@angular/cli/node_modules/rxjs";
import {SaveSidjGood} from "../models/goods/sidjGood/saveSidjGood";

@Injectable()
export class AuthenticationService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toasterService: ToasterService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService) { }

  login( email: string, password: string) {

    return this.http.post<any>(environment.apiUrl + 'users/authenticate/',
      { SupplierMail: email,
        Password: password});
  }
  reactiveUser(id: number ) {
    return this.http.put<any>(environment.apiUrl + 'users/reactive/' + id, {});
  }



  logout() {
    // remove user from local storage to log user out
    this.localStorageService.remove('Token');
    this.localStorageService.clearAll();
    this.router.navigate(['/']);
    window.location.reload();



  }
  forgotPassword(email: string, isFrench: boolean ) {
    return this.http.post<any>(environment.apiUrl + 'users/forgotPassword/',
      { Email: email, isFrench: isFrench} );
  }

}
