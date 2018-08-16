import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {SaveSidjGood} from "../../../../@core/data/models/goods/sidjGood/saveSidjGood";
import {Router} from "@angular/router";

@Injectable()
export class GoodFormService {

  validForm: boolean;
  affectedSupplier: any;

  constructor(private router: Router) {
  }

  private selectedValidForm = new BehaviorSubject<boolean>(this.validForm);
  private currentAffectedSupplier = new BehaviorSubject<any>(this.affectedSupplier);


  setCurrentAffectedSupplier(supplier: any) {
    this.currentAffectedSupplier.next(supplier);
  }

  getCurrentAffectedSupplier(): Observable<any> {
    return this.currentAffectedSupplier.asObservable();
  }

  getCurrentAffectecSupplierValue() {
    return this.currentAffectedSupplier.getValue();
  }

  setValidForm(validForm: boolean) {
    this.selectedValidForm.next(validForm);
  }

  getValidForm(): Observable<boolean> {
    return this.selectedValidForm.asObservable();
  }

  checkCurrentGood(id: number, good: SaveSidjGood, currentRoute: string): SaveSidjGood {
    if (good && good.reference) {
      return good
    }

    id ? this.router.navigate(['home/goods/form-edit/' + id]) :
      this.router.navigate(['home/goods/form/new'])

  }
}
