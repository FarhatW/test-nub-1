import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../utils/Helper.service';
import {AuthenticationService} from "../data/services/authenticationService";
import {NotificationService} from "../data/services/notification.service";
import {ToasterService} from "angular2-toaster";
import {UserToken} from "../data/models/users/userToken";

@Injectable()
export class AuthGuard implements CanActivate {

  userToken: UserToken;

  constructor(private router: Router,
              private Aut: AuthenticationService,
              private localStorageService: LocalStorageService,
              private helperService: HelperService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const token = String(this.localStorageService.get('Token'));

    const user = this.helperService.getDecodedAccessToken(token);
    this.userToken = user;
    // this.userToken.userType = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'];


    if (this.localStorageService.get('Token')) {
      if (route.data.roles !== undefined) {

        const mapped = Object.keys(this.userToken).map(key => (
          {
            type: key === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authentication' ?
              'authentication' : key, value: this.userToken[key]

          }));

        if (this.findObjectByValue(mapped, 'authentication').value === 'connected') {

          this.checkTokenExpiration(token);

          if (!!route.data.roles.find(x => this.userToken.role.indexOf(x) !== -1)) {
            console.log('canActivate', this.userToken.role)
            return true;
          } else {
            this.router.navigate(['/home/dashboard']);
            return false;
          }
        } else {
          this.Aut.logout();
          return false;
        }
      }
    }
    // not logged in so redirect to home-content-login page with the return url
    this.router.navigate(['']);
    return false;
  }

  checkTokenExpiration(token: string) {
    const result = this.helperService.getDecodedAccessToken(token);
    if (new Date(result.exp * 1000) < new Date()) {
      this.Aut.reactiveUser(+result.nameid).subscribe(x => {

        this.localStorageService.set('Token', x.token);
        return true;
      }, error => {
        this.Aut.logout();
        return false
      });
    }
  }

  findObjectByValue(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].type === value) {
        return array[i];
      }
    }
    return null;
  }


}
