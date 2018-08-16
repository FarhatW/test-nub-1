import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {Enum} from "../models/enums/enum";

@Injectable()
export class VatRateService {
  private readonly vatRateEndPpoint = environment.apiUrl + 'vatrates';
  constructor(private http: HttpClient) { }

  getGoodVat(id) {
    return this.http.get<Enum>(this.vatRateEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<Enum[]>(this.vatRateEndPpoint);
  }
}
