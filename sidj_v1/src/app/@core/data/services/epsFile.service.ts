import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Supplier} from "../models/users/suppliers/supplier";

@Injectable()
export class EpsFileService {

  selectedSupplier: any;
  constructor() { }

  private selectedSupplierSource = new BehaviorSubject<any>(this.selectedSupplier);
  currentSupplier = this.selectedSupplierSource.asObservable();


  setSupplier(supplier: any) {
    this.selectedSupplierSource.next(supplier);
  }

  getSupplier(): any {
    return this.selectedSupplierSource.getValue();
  }
}
