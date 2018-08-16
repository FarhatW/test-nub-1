import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {SidjData} from '../models/shared/SidjData';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {GoodList} from '../models/goods/goodList';
import {SaveGood} from "../models/goods/saveGood";
import {Good} from "../models/goods/good";
import {SaveSidjGood} from "../models/goods/sidjGood/saveSidjGood";
import {SidjGood} from "../models/goods/sidjGood/sidjGood";
import {UserToken} from "../models/users/UserToken";


@Injectable()
export class GoodService {
  public readonly goodPicture = environment.apiPicture;
  private readonly goodsEndpoint = environment.apiUrl + 'sidjGoods';
  saveSidjGood: SaveSidjGood;
  good: SidjGood;
  id: number;
  goodId: number;
  constructor(private http: HttpClient) { }

  private currentGoodsId = new BehaviorSubject<number>(this.goodId);
  private currentGoodsSave = new BehaviorSubject<SaveSidjGood>(this.saveSidjGood);
  private currentGood = new BehaviorSubject<SidjGood>(this.good);

  setCurrentGoods(good: SidjGood) {
    this.currentGood.next(good);
  }

  getCurrentGood(): SidjGood {
    return this.currentGood.getValue();
  }

  setCurrentSaveGoods(good: SaveSidjGood) {
    this.currentGoodsSave.next(good);
  }

  getCurrentSaveGood(): Observable<SaveSidjGood> {
    return this.currentGoodsSave.asObservable();
  }

  getCurrentGoodId(): Observable<number> {
    return this.currentGoodsId.asObservable();
  }

  setCurrentGoodId(goodId: number) {
    this.currentGoodsId.next(goodId);
  }

  create(goods: SaveSidjGood) {
    return this.http.post<SidjGood>(this.goodsEndpoint, goods);
  }

  update(goods: SaveSidjGood) {
    return this.http.put<SidjGood>(this.goodsEndpoint + '/' + goods.id, goods);
  }

  getGoods(id) {
    return this.http.get<SidjGood>(this.goodsEndpoint + '/' + id);
  }

  delete(id) {
    return this.http.delete(this.goodsEndpoint + '/' + id);
  }

  getAll(filter) {
    return this.http.get<SidjData<SidjGood>>(this.goodsEndpoint + '?' + this.toQueryString(filter));
  }

  multiCreateProduct(goodArray: SidjGood[]) {
    return this.http.post<GoodList>(this.goodsEndpoint + '/multiAdd', goodArray)
  }

  verifyGencod(gencod: any) {
    return this.http.post<boolean>(this.goodsEndpoint + '/verifygencod', gencod);
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
