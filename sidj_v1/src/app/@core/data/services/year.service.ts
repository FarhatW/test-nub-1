import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {EnumTranslation} from '../models/enums/enumTranslation';

@Injectable()
export class YearService {
  private readonly yearEndPpoint = environment.apiUrl + 'years';
  constructor(private http: HttpClient) { }

  getGoodYear(id) {
    return this.http.get<EnumTranslation>(this.yearEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<EnumTranslation[]>(this.yearEndPpoint);
  }
}
