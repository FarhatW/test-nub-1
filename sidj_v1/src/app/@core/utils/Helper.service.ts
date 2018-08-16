import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {LocalStorageService} from 'angular-2-local-storage';
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";
import {TranslationService} from "../data/services/translation.service";
import {UserToken} from "../data/models/users/userToken";

@Injectable()
export class HelperService {

  isFrench: boolean;
  cookieValue = 'UNKNOWN';
  constructor(private localStorageService: LocalStorageService,
              private cookieService: CookieService,
              private translationService: TranslationService,
              private translate: TranslateService) {
  }

  getDecodedAccessToken(token: string): UserToken {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getToken(): string  {
    return this.localStorageService.get('Token');
  }

  setLanguage(currentLanguage: string) {
    let lang = 'en';
    if (currentLanguage != null) {
      lang = currentLanguage
    }
    // this.translate.currentLang = currentLanguage;
    this.isFrench = lang === 'fr';
    this.translationService.setLanguage(this.isFrench);
    this.cookieService.set( 'Langue', lang );
  }

  toQueryString(obj) {
    const parts = [''];
    for (const property in obj){
      const value =  obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }
}

