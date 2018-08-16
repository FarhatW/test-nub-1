import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {SidjData} from "../models/shared/SidjData";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Battery} from "../models/batteries/battery";

@Injectable()
export class BatteryService {
  private readonly batteryEndpoint = environment.apiUrl + 'battery';
  constructor(private http: HttpClient) { }

  batteries: Battery[];

  private currentBatteries = new BehaviorSubject<Battery[]>(this.batteries);

  setCurrentBatteries(batteries: Battery[]) {
    this.currentBatteries.next(batteries);
  }

  getCurrentBatteries(): Battery[] {
    return this.currentBatteries.getValue();
  }
  getBattery(id) {
    return this.http.get<Battery>(this.batteryEndpoint + '/' + id);
  }

  getAll(filter) {
    return this.http.get<SidjData<Battery>>(this.batteryEndpoint + '?' + this.toQueryString(filter));
  }

  create(battery: any) {
    return this.http.post<Battery>(this.batteryEndpoint, battery);
  }

  update(battery: any) {
    return this.http.put<Battery>(this.batteryEndpoint + '/' + battery.id, battery)
  }

  delete (id: number) {
    return this.http.delete(this.batteryEndpoint + '/' + id);
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
