import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodService} from '../../../../@core/data/services/good.service';
import {ToasterService} from 'angular2-toaster';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {CookieService} from 'ngx-cookie-service';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {UserToken} from '../../../../@core/data/models/users/userToken';
import {UserService} from '../../../../@core/data/services/user.service';
import {GoodFormService} from '../shared/good-form.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {RedirectService} from '../../../../@core/data/services/redirect.service';

@Component({
  selector: 'ngx-good-form-step-5',
  templateUrl: './good-form-step-5.component.html',
  styleUrls: ['./good-form-step-5.component.scss'],
})
export class GoodFormStep5Component implements OnInit, AfterContentChecked {
  @ViewChild('f') validMainForm: NgForm;
  good: SaveSidjGood;
  user: UserToken;
  getCurrentId: number;
  isFrench: boolean;
  isEdit: boolean;
  languageSub: Subscription;
  constructor(public goodsService: GoodService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private toasterService: ToasterService,
              private translationService: TranslationService,
              private goodFormService: GoodFormService,
              private cookieService: CookieService,
              private notificationService: NotificationService,
              private redirectService: RedirectService) {
    this.goodsService.getCurrentGoodId().subscribe( x => {
      this.getCurrentId = x;
    });
  }

  ngAfterContentChecked() {
    this.goodFormService.setValidForm(this.validMainForm.valid);
  }

  ngOnInit() {
    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });

    this.user = this.userService.getCurrentUser();

    this.goodsService.getCurrentSaveGood().subscribe(g => {
      if (g === undefined) {
        (this.getCurrentId) ? this.redirectService.getRedirectEditForm(this.getCurrentId)
          : this.redirectService.getRedirectNewForm();
      } else {
        this.isEdit = !!g.id;
        this.good = this.goodFormService.checkCurrentGood(g.id, g, this.router.url);
      }
    });
  }

  submit() {
    this.goodsService.setCurrentSaveGoods(this.good);
        const $result = this.isEdit ? this.goodsService.update(this.good) :
      this.goodsService.create(this.good);
    $result.subscribe(x => {
      this._handleSubmitSuccess(x, this.isEdit);
      },
      error => {
      this._handleSubmitError(error)
      });
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  private _handleSubmitSuccess(res, isEdit: boolean) {
    this.good.id = res.id;
    this.goodsService.setCurrentSaveGoods(this.good);
    this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-six'])
    const title = this.isFrench ? (this.isEdit ? 'Produit Mis à jour !' : 'Produit Enregistré !') :
      (this.isEdit ? 'Product Updated !' : 'Product Save !');
    const body = this.isFrench ? (this.isEdit ? 'Vous avez bien mis à jour votre produit.' :
      'Vous avez bien enregistré votre produit.' )
      : (this.isEdit ? 'You have successfully update your product.' : 'You have successfully registered your product.');
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
  }

  private _handleSubmitError(err) {
    const title = this.isFrench ? 'Une erreur est survenu !' : '\n' + 'an error has occurred !'
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

  goToBefore() {
    this.goodsService.setCurrentSaveGoods(this.good);
    !this.isEdit ? this.router.navigate(['home/goods/form/step-four'])
      : this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-four'])
  }
}
