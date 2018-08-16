import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Enum} from "../models/enums/enum";

@Injectable()
export class CurrencyService {
  private readonly currencyEndPpoint = environment.apiUrl + 'currencies';
  constructor(private http: HttpClient) { }

  currencies: Enum[];

  private currentCurrencies = new BehaviorSubject<Enum[]>(this.currencies);

  setCurrentCurrencies(currencies: Enum[]) {
    this.currentCurrencies.next(currencies);
  }

  getCurrentCurrencies(): Enum[] {
    return this.currentCurrencies.getValue();
  }

  getgoodCurrency(id) {
    return this.http.get<Enum>(this.currencyEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<Enum[]>(this.currencyEndPpoint);
  }
}
