import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {GoodService} from '../../../../@core/data/services/good.service';
import {Router} from '@angular/router';
import {CurrencyService} from '../../../../@core/data/services/currency.service';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {ToasterService} from 'angular2-toaster';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {CookieService} from 'ngx-cookie-service';
import {VatRateService} from '../../../../@core/data/services/vatRate.service';
import {NgForm} from '@angular/forms';
import {Enum} from '../../../../@core/data/models/enums/enum';
import {GoodFormService} from '../shared/good-form.service';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {Subscription} from 'rxjs/Subscription';
import {RedirectService} from '../../../../@core/data/services/redirect.service';


@Component({
  selector: 'ngx-good-form-step-2',
  templateUrl: './good-form-step-2.component.html',
  styleUrls: ['./good-form-step-2.component.scss'],
})
export class GoodFormStep2Component implements OnInit, AfterContentChecked {
  @ViewChild('f') validMainForm: NgForm;
  date = new Date();
  numberPattern = '^[0-9]+$';
  numberWithPointPattern = '^[+ -]?[0-9]{1,3}([.][0-9]{1,3})?$';
  getCurrentId: number;
  goods: SaveSidjGood;
  currency: Enum[];
  vatRate: Enum[];
  isFrench: boolean;
  isValidityDate: boolean = true;
  isAvailabilityDate: boolean = true;
  isVerifDate: boolean;
  isEdit: boolean;
  languageSub: Subscription;

  constructor(public goodsService: GoodService,
              private router: Router,
              private currencyService: CurrencyService,
              private vatRateService: VatRateService,
              private notificationService: NotificationService,
              private toasterService: ToasterService,
              private translationService: TranslationService,
              private cookieService: CookieService,
              private goodFormService: GoodFormService,
              private redirectService: RedirectService) {
    this.goodsService.getCurrentGoodId().subscribe( x => {
      this.getCurrentId = x;
    });
  }

  ngAfterContentChecked() {
    this.goodFormService.setValidForm(this.validMainForm.valid);
  }

  ngOnInit() {
    this.goodsService.getCurrentSaveGood().subscribe( g => {
      if (g === undefined) {
        (this.getCurrentId) ? this.redirectService.getRedirectEditForm(this.getCurrentId)
          : this.redirectService.getRedirectNewForm();
      } else {
        this.isEdit = !!g.id;
        this.goods = this.goodFormService.checkCurrentGood(g.id, g, this.router.url);
      }
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });

    this.currencyService.getAll().subscribe(currency => {
      this.currency = currency;
    });

    this.vatRateService.getAll().subscribe(vat => {
      this.vatRate = vat;
    });
  }

  submit() {}

  updateStep2(isNextStep: boolean) {
    this.goodsService.setCurrentSaveGoods(this.goods);
    if (this.isEdit) {
      const $result = this.goodsService.update(this.goods);
      $result.subscribe(x => {
        if (isNextStep) {
          this.router.navigate(['home/goods/form-edit/' + this.goods.id + '/step-three'])
        } else {
          this._handleSubmitSuccess();
        }
      }, error => {
        this._handleSubmitError(error)
      });
    } else {
      this.router.navigate(['home/goods/form/step-three'])
    }
  }

  private _handleSubmitSuccess() {
    this.router.navigate(['home/goods/form-edit/' + this.goods.id + '/step-two'])
    const title = this.isFrench ? ('Produit Mis à jour !') :
      ('Product Updated !');
    const body = this.isFrench ? ('Vous avez bien mis à jour votre produit.')
      : ('You have successfully update your product.');
    this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body));
  }

  private _handleSubmitError(err) {
    const title = this.isFrench ? 'Une erreur est survenu !' : '\n' + 'an error has occurred !'
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

  VerifyDate(date, inputName) {
    this.isVerifDate = true;
    const userDate = Date.parse(date);
    const currentDate = new Date().getTime();
    switch (inputName) {
      case 'availabilityProduct': {
        this.isAvailabilityDate = userDate > currentDate;
        break;
        }
      case 'dateOfValidity': {
        this.isValidityDate = userDate > currentDate;
        break;
      }
    }
    if (userDate < currentDate) {
      this._handleDateError();
    }
  }

  private _handleDateError() {
    const title = this.isFrench ? 'Problème date !' : 'Date problem !';
    const body =  this.isFrench ?
      'La date rentrée ne peut être inférieur à la date du jour' :
      'The date entered can not be less than the current date';
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

  goToBefore() {
    this.goodsService.setCurrentSaveGoods(this.goods);
    !this.isEdit ? this.router.navigate(['home/goods/form/new'])
      : this.router.navigate(['home/goods/form-edit/' + this.goods.id])
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

}
