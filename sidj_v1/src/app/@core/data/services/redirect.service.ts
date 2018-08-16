import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class RedirectService {
  constructor(
  private router: Router) { }

  getRedirectEditForm(getCurrentId: number) {
      this.router.navigate(['/home/goods/form-edit/' + getCurrentId])
  }

  getRedirectNewForm() {
    this.router.navigate(['/home/goods/form/new'])
  }
}
