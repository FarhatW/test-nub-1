import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EnumTranslation} from '../models/enums/enumTranslation';

@Injectable()
export class GenderService {
  private readonly genderEndPpoint = environment.apiUrl + 'genders';
  constructor(private http: HttpClient) { }

  genders: EnumTranslation[];

  private currentGenders = new BehaviorSubject<EnumTranslation[]>(this.genders);

  setCurrentGenders(genders: EnumTranslation[]) {
    this.currentGenders.next(genders);
  }

  getCurrentGenders(): EnumTranslation[] {
    return this.currentGenders.getValue();
  }

  getGoodSexe(id) {
    return this.http.get<EnumTranslation>(this.genderEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<EnumTranslation[]>(this.genderEndPpoint);
  }
}
