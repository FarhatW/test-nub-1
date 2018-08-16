import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {EnumTranslation} from "../models/enums/enumTranslation";

@Injectable()
export class LanguageService {
  private readonly languageEndPpoint = environment.apiUrl + 'languages';
  constructor(private http: HttpClient) { }

  languages: EnumTranslation[];

  private currentLanguages = new BehaviorSubject<EnumTranslation[]>(this.languages);

  setCurrentLanguages(languages: EnumTranslation[]) {
    this.currentLanguages.next(languages);
  }

  getCurrentLanguages(): EnumTranslation[] {
    return this.currentLanguages.getValue();
  }


  getGoodLanguage(id) {
    return this.http.get<EnumTranslation>(this.languageEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<EnumTranslation[]>(this.languageEndPpoint);
  }
}
