import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodFormStep1Component} from '../../good-form-step-1/good-form-step-1.component';
import {GoodFormStep2Component} from '../../good-form-step-2/good-form-step-2.component';
import {GoodFormStep3Component} from '../../good-form-step-3/good-form-step-3.component';
import {GoodFormStep4Component} from '../../good-form-step-4/good-form-step-4.component';
import {GoodFormStep5Component} from '../../good-form-step-5/good-form-step-5.component';
import {GoodFormStep6Component} from '../../good-form-step-6/good-form-step-6.component';
import {GoodFormService} from '../good-form.service';
import {SaveSidjGood} from '../../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {GoodService} from '../../../../../@core/data/services/good.service';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../../../@core/data/services/notification.service';
import {Subscription} from 'rxjs/Subscription';
import {TranslationService} from '../../../../../@core/data/services/translation.service';

@Component({
  selector: 'ngx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, AfterContentChecked {
  @Input()
  customTitle: boolean;

  id: number;
  componentSelected: string;
  isValid: boolean;
  good: SaveSidjGood;
  isFrench: boolean;
  languageSub: Subscription;

  constructor(private router: Router,
                private route: ActivatedRoute,
                private goodFormService: GoodFormService,
              public goodsService: GoodService,
              private notificationService: NotificationService,
              private toasterService: ToasterService,
              private translationService: TranslationService) {

    route.params.subscribe(p => {
      this.id = +p['id'] || 0;
    });

    this.goodFormService.getValidForm().subscribe(valid => {
      this.isValid = valid;
    });
  }

  ngOnInit() {
    this.goodsService.getCurrentSaveGood().subscribe( g => {
      this.good = g;
      // console.log('breadcrumb', this.good);
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });
    }

  ngAfterContentChecked() {
    switch (this.route.firstChild.component) {
      case  GoodFormStep1Component :
        this.componentSelected = 'stepOne';
        break;
      case GoodFormStep2Component :
        this.componentSelected = 'stepTwo';
        break;
      case GoodFormStep3Component :
        this.componentSelected = 'stepThree';
        break;
      case GoodFormStep4Component :
        this.componentSelected = 'stepFour';
        break;
      case GoodFormStep5Component :
        this.componentSelected = 'stepFive';
        break;
      case GoodFormStep6Component :
        this.componentSelected = 'stepSix';
        break;
    }
  }

  updateCurrentStep(numberOfStep: string) {
    if (this.good.id !== 0) {
      console.log('this.good dans this.good', this.good);
      this.goodsService.setCurrentSaveGoods(this.good);
      const $result = this.goodsService.update(this.good);
      $result.subscribe(x => {
        this.redirect(numberOfStep)
      }, error => {
        this._handleSubmitError(error)
      });
    }
  }

  redirect(numberOfStep: string) {
    this.router.navigate(['/home/goods/form-edit/' + this.id + numberOfStep])
  }

  private _handleSubmitError(err) {
    const title = this.isFrench ? 'Une erreur est survenu !' : '\n' + 'an error has occurred !'
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body))
  }

  goToStepOne() {
    this.id === 0 ? this.router.navigate(['home/goods/form/new'])
      : this.updateCurrentStep('')
  }

  goToStepTwo() {
    this.id === 0 ? this.router.navigate(['home/goods/form/step-two'])
      : this.updateCurrentStep('/step-two');
  }

  goToStepThree() {
    this.id === 0 ? this.router.navigate(['/home/goods/form/step-three'])
      : this.updateCurrentStep('/step-three')
  }

  goToStepFour() {
    this.id === 0 ? this.router.navigate(['/home/goods/form/step-four'])
      : this.updateCurrentStep('/step-four')
  }

  goToStepFive() {
    this.id === 0 ? this.router.navigate(['/home/goods/form/step-five'])
      : this.updateCurrentStep('/step-five')
  }

  goToStepSix() {
    this.id === 0 ? this.router.navigate(['/home/goods/form/step-six'])
      : this.router.navigate(['/home/goods/form-edit/' + this.id + '/step-six'])
  }
}
