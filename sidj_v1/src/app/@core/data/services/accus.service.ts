import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {SidjData} from "../models/shared/SidjData";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Accu} from "../models/accus/accu";

@Injectable()
export class AccuService {
  private readonly accusEndpoint = environment.apiUrl + 'accus';
  constructor(private http: HttpClient) { }


  accus: Accu[];

  private currentAccu = new BehaviorSubject<Accu[]>(this.accus);

  setCurrentAccu(accus: Accu[]) {
    this.currentAccu.next(accus);
  }

  getCurrentAccu(): Accu[] {
    return this.currentAccu.getValue();
  }

  getAccu(id) {
    return this.http.get<Accu>(this.accusEndpoint + '/' + id);
  }

  getAll(filter) {
    return this.http.get<SidjData<Accu>>(this.accusEndpoint + '?' + this.toQueryString(filter));
  }

  create(accu: any) {
    return this.http.post<Accu>(this.accusEndpoint, accu);
  }

  update(accu: any) {
    return this.http.put<Accu>(this.accusEndpoint + '/' + accu.id, accu)
  }

  delete (id: number) {
    return this.http.delete(this.accusEndpoint + '/' + id);
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
