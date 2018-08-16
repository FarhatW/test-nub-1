import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {GoodService} from '../../../../@core/data/services/good.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {GoodFormService} from '../shared/good-form.service';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {RedirectService} from '../../../../@core/data/services/redirect.service';
import {Subscription} from 'rxjs/Subscription';
import {ToasterService} from 'angular2-toaster';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {NotificationService} from '../../../../@core/data/services/notification.service';

@Component({
  selector: 'ngx-good-form-step-4',
  templateUrl: './good-form-step-4.component.html',
  styleUrls: ['./good-form-step-4.component.scss'],
})
export class GoodFormStep4Component implements OnInit, AfterContentChecked {
  @ViewChild('f') validMainForm: NgForm;
  dimensionPattern =
    '(\\d+(?:,\\d+)?)x(\\d+(?:,\\d+)?)(?:x(\\d+(?:,\\d+)?))?|(\\d+(?:,\\d+)?)X(\\d+(?:,\\d+)?)(?:X(\\d+(?:,\\d+)?))?';
  numberPattern = '^[0-9]+$';
  numberWithPointPattern = '^[+ -]?[0-9]{1,4}([.][0-9]{1,4})?$';
  good: SaveSidjGood;
  calcul: number;
  separator: string;
  getCurrentId: number;
  isFrench: boolean;
  languageSub: Subscription;
  isEdit: boolean;

  constructor(public goodsService: GoodService,
              private router: Router,
              private goodFormService: GoodFormService,
              private redirectService: RedirectService,
              private toasterService: ToasterService,
              private translationService: TranslationService,
              private notificationService: NotificationService) {
    this.goodsService.getCurrentGoodId().subscribe( x => {
      this.getCurrentId = x;
    });
  }

  ngAfterContentChecked() {
    this.goodFormService.setValidForm(this.validMainForm.valid);
  }

  ngOnInit() {
    this.goodsService.getCurrentSaveGood().subscribe(g => {
      if (g === undefined) {
        (this.getCurrentId) ? this.redirectService.getRedirectEditForm(this.getCurrentId)
          : this.redirectService.getRedirectNewForm();
      } else {
        this.isEdit = !!g.id;
        this.good = this.goodFormService.checkCurrentGood(g.id, g, this.router.url);
      }
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  submit() {}

  updateStep4(isNextStep: boolean) {
    this.goodsService.setCurrentSaveGoods(this.good);
    if (this.isEdit) {
      const $result = this.goodsService.update(this.good);
      $result.subscribe(x => {
        if (isNextStep) {
          this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-five'])
        } else {
          this._handleSubmitSuccess();
        }
      }, error => {
        this._handleSubmitError(error)
      });
    } else {
      this.router.navigate(['home/goods/form/step-five'])
    }
  }

  private _handleSubmitSuccess() {
    this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-four']);
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

  goToBefore() {
    this.goodsService.setCurrentSaveGoods(this.good);
    !this.isEdit ? this.router.navigate(['home/goods/form/step-three'])
      : this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-three'])
  }

  onVolumeChanged(longueur) {
      this.separator = 'x';
    longueur = longueur.toLowerCase().split(this.separator);
    this.calcul = (longueur[0] * longueur[1] * longueur[2]) / 1000000;
    this.good.outCartonCbm = this.calcul;
  }

}
