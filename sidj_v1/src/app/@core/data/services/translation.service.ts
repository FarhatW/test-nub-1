import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EnumTranslation} from "../models/enums/enumTranslation";

@Injectable()
export class TranslationService {

  isFrench: boolean;

  constructor() {
  }

  private isLanguageState = new BehaviorSubject<boolean>(this.isFrench);

  setLanguage(isFrench: boolean) {
    this.isLanguageState.next(isFrench);
  }

  getLanguage(): Observable<boolean> {
    return this.isLanguageState.asObservable();
  }

  getCurrentLanguageAsBool(): boolean {
    return this.isLanguageState.getValue();
  }

  getCurrentLanguageAsString():
    string {
    return this.isLanguageState.getValue() ? 'fr' : 'en';
  }
}
