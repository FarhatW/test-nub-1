import {AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import {GoodService} from '../../../../@core/data/services/good.service';
import {Router} from '@angular/router';
import {GenderService} from '../../../../@core/data/services/gender.service';
import {TranslationService} from '../../../../@core/data/services/translation.service';
import {AccuService} from '../../../../@core/data/services/accus.service';
import {BatteryService} from '../../../../@core/data/services/battery.service';
import {LanguageService} from '../../../../@core/data/services/language.service';
import {YearService} from '../../../../@core/data/services/year.service';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../../@core/data/services/notification.service';
import {AutocompleteItem,
  CreateNewAutocompleteGroup, NgAutocompleteComponent, SelectedAutocompleteItem} from 'ng-auto-complete';
import {UserService} from '../../../../@core/data/services/user.service';
import {Supplier} from '../../../../@core/data/models/users/suppliers/supplier';
import {EnumTranslation} from '../../../../@core/data/models/enums/enumTranslation';
import {Battery} from '../../../../@core/data/models/batteries/battery';
import {GoodBattery} from '../../../../@core/data/models/batteries/goodBattery';
import {GoodAccu} from '../../../../@core/data/models/accus/goodAccu';
import {SaveSidjGood} from '../../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {GoodFormService} from '../shared/good-form.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {RedirectService} from '../../../../@core/data/services/redirect.service';

@Component({
  selector: 'ngx-good-form-step-3',
  templateUrl: './good-form-step-3.component.html',
  styleUrls: ['./good-form-step-3.component.scss'],
})
export class GoodFormStep3Component implements OnInit, AfterContentChecked {

  @ViewChild('autocompleter') public autoCompleter: NgAutocompleteComponent;
  @ViewChild('autocompleterBatteries') public autoCompleterBatteries: NgAutocompleteComponent;
  @ViewChild('f') validMainForm: NgForm;

  public groupAccus = [
    CreateNewAutocompleteGroup(
      'Search',
      'completer',
      [],
      {titleKey: 'title', childrenKey: null},
    ),
  ];

  public groupBattery = [
    CreateNewAutocompleteGroup(
      'Search',
      'completer',
      [],
      {titleKey: 'title', childrenKey: null},
    ),
  ];

  supplier: Supplier;
  user: any;
  accus: any[];
  accusGroupItem: any[] = [];
  batteriesGroupItem: any[] = [];
  getCurrentId: number;

  public selected: any[] = [];
  dimensionPattern =
    '(\\d+(?:,\\d+)?)x(\\d+(?:,\\d+)?)(?:x(\\d+(?:,\\d+)?))?|(\\d+(?:,\\d+)?)X(\\d+(?:,\\d+)?)(?:X(\\d+(?:,\\d+)?))?';
  numberPattern = '^[0-9]+$';
  numberWithPointPattern = '^[+ -]?[0-9]{1,3}([.][0-9]{1,3})?$';
  alphabetiquePattern = '([^0-9.]?)+';
  good: SaveSidjGood;
  goodSexe: EnumTranslation[];
  batteries: Battery[];
  goodLanguage: EnumTranslation[];
  goodYear: EnumTranslation[];
  isFrench: boolean;
  isEdit: boolean;
  pageSize = 0;
  query = {
    pageSize: this.pageSize,
  };

  languageSub: Subscription;

  constructor(public goodsService: GoodService,
              private router: Router,
              private genderService: GenderService,
              private accusService: AccuService,
              private batteryService: BatteryService,
              private goodLanguageService: LanguageService,
              private yearService: YearService,
              private translationService: TranslationService,
              private notificationService: NotificationService,
              private goodFormService: GoodFormService,
              private toasterService: ToasterService,
              private userService: UserService,
              private redirectService: RedirectService) {
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

        this.userService.getUser(g.supplierId).subscribe(supplier => {
          this.supplier = supplier as Supplier;
        })
      }
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });

    this.genderService.getAll().subscribe(gs => {
      this.goodSexe = gs;
    });

    this.accusService.getAll(this.query).subscribe(accus => {
      this.accus = accus.items;
      this.accus.forEach(item => {
        this.accusGroupItem.push(new AutocompleteItem(item.ref, item.id, item.createdOn));
      });
      this.autoCompleter.SetValues('completer', this.accusGroupItem);
    });

    this.batteryService.getAll(this.query).subscribe(ba => {
        this.batteries = ba.items;
        this.batteries.forEach(item => {
          this.batteriesGroupItem.push(new AutocompleteItem(item.ref, item.id, ''));
        });
        this.autoCompleterBatteries.SetValues('completer', this.batteriesGroupItem);
      },
    );

    this.goodLanguageService.getAll().subscribe(language => {
      this.goodLanguage = language;
    });

    this.yearService.getAll().subscribe(year => {
      this.goodYear = year;
    });
  }

  Selected(item: SelectedAutocompleteItem) {
    const goodAccus = new GoodAccu();

    goodAccus.accuId = +item.item.id;
    goodAccus.isAccusIncluded = false;
    goodAccus.accuQuantity = 1;
    goodAccus.accuGrossWeight = 1;
    goodAccus.ref = item.item.title;
    this.good.goodAccus.push(goodAccus);
  }

  SelectedBattery(item: SelectedAutocompleteItem) {
    if (this.good.goodBatteries.length <= 2 &&  !this.good.goodBatteries.find(x => x.batteryId === +item.item.id)) {
      const goodBattery = new GoodBattery();
      goodBattery.batteryId = +item.item.id;
      goodBattery.isBatteryIncluded = false;
      goodBattery.batteryQuantity = 1;
      goodBattery.ref = item.item.title;
      this.good.goodBatteries.push(goodBattery);

    }
  }

  removeFromBatteryArray(item) {
    if (item.ref.toLowerCase() === 'unknown | inconnu') {
      this.good.unknownBattery = '';
    }
    const index = this.good.goodBatteries.indexOf(item);
    this.good.goodBatteries.splice(index, 1);
  }

  submit() {
    // this.goodsService.setCurrentSaveGoods(this.good);
    // !this.isEdit ? this.router.navigate(['home/goods/form/step-four'])
    //   : this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-four'])
  }

  updateStep3(isNextStep: boolean) {
    this.goodsService.setCurrentSaveGoods(this.good);
    if (this.isEdit) {
      const $result = this.goodsService.update(this.good);
      $result.subscribe(x => {
        if (isNextStep) {
          this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-four'])
        } else {
          this._handleSubmitSuccess();
        }
      }, error => {
        this._handleSubmitError(error)
      });
    } else {
      this.router.navigate(['home/goods/form/step-four'])
    }
  }

  private _handleSubmitSuccess() {
    this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-three'])
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
    !this.isEdit ? this.router.navigate(['home/goods/form/step-two'])
      : this.router.navigate(['home/goods/form-edit/' + this.good.id + '/step-two'])
  }

  onCountryChanged(code) {
    return code === 'FR'
  }

  deleteAccus() {
    this.good.goodAccus = [];
    this.good.unknownAccu = '';
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }
}
