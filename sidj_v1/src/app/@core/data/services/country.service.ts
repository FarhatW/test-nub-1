import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {SidjData} from '../models/shared/SidjData';
import {environment} from '../../../../environments/environment';
import {Country} from '../models/country';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CountryService {
  private readonly countriesEndpoint = environment.apiUrl + 'countries';
  constructor(private http: HttpClient) { }

  countries: Country[];

  private currentCountry = new BehaviorSubject<Country[]>(this.countries);

  setCurrentCountries(countries: Country[]) {
    this.currentCountry.next(countries);
  }

  getCurrentCountries(): Country[] {
    return this.currentCountry.getValue();
  }

  getCountry(id) {
    return this.http.get<Country>(this.countriesEndpoint + '/' + id);
  }

  getAll() {
    return this.http.get<SidjData<Country>>(this.countriesEndpoint);
  }
}
