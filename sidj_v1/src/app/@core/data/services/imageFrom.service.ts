import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/environment';
import {EnumTranslation} from '../models/enums/enumTranslation';

@Injectable()
export class ImageFromService {
  private readonly imageFromEndPpoint = environment.apiUrl + 'imagefrom';
  constructor(private http: HttpClient) { }

  getGoodImageFrom(id) {
    return this.http.get<EnumTranslation>(this.imageFromEndPpoint + '/' + id);
  }

  getAll() {
    return this.http.get<EnumTranslation[]>(this.imageFromEndPpoint);
  }
}
