import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {HelperService} from '../../../@core/utils/Helper.service';
import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {LocalStorageService} from 'angular-2-local-storage';
import {ActivatedRoute, Router} from '@angular/router';
import {GoodService} from '../../../@core/data/services/good.service';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {environment} from '../../../../environments/environment.prod';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../@core/data/services/notification.service';
import {SaveSidjGood} from '../../../@core/data/models/goods/sidjGood/saveSidjGood';
import {UserToken} from '../../../@core/data/models/users/userToken';
import {UserService} from '../../../@core/data/services/user.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'ngx-addmodifygoods',
  templateUrl: './good-form.component.html',
  styleUrls: ['./good-form.component.scss'],
})
export class GoodFormComponent implements OnInit {

  user: UserToken;
  id: number;

  saveGood: SaveSidjGood = {
    id: 0,
    reference: null,
    name: '',
    gencod: null,
    customsReference: '',
    description: '',

    currency: '',
    fobGrossPrice: 0.00,
    fobNetPrice: 0.00,
    ddpGrossPrice: 0.00,
    ddpNetPrice: 0.00,
    exWorksGrossPrice: 0.00,
    exWorksNetPrice: 0.00,
    paymentTerms: '',
    dateOfValidity: null,
    departurePlace: '',
    isExclusivityJc: false,
    isSpecialBoxJc: false,
    availabilityProduct: '',
    minimumQuantity: null,

    outerColisage: null,
    innerColisage: null,
    itemsQuantity20: null,
    itemsQuantity40: null,
    outCartonCbm: null,
    colisageGrossWeight: null,
    colisageNetWeight: null,
    outerCartonDimension: '',

    productDimension: '',
    boxDimension: '',
    colors: '',
    models: '',
    packagingLanguage: '',
    manualLanguage: '',
    productLanguage: '',
    age: null,
    ageType: '',
    productNetWeight: null,
    productGrossWeight: null,
    deeeContribution: '',
    functionTryMe: false,
    isChargerIncluded: false,
    chargerType: '',
    engineType: '',

    picture: '',
    imageFrom: '',

    continent: '',
    vatRate: null,
    isExclusivitySpecialist: false,
    gender: '',
    shipmentTime: null,

    comments: '',
    supplierId: 0,
    countryCode: '',
    goodAccus: [],
    goodBatteries: [],
    unknownAccu: '',
    unknownBattery: '',

    createdBy: '',
    createdOn: '',
    updatedBy: '',
    updatedOn: '',
    isEnabled: true,
  };

  isFrench: boolean;
  prod: boolean = environment.production;
  languageSub: Subscription;


  constructor(private route: ActivatedRoute,
              private router: Router,
              public translate: TranslateService,
              public goodsService: GoodService,
              private localStorageService: LocalStorageService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private userService: UserService,
              private helperService: HelperService,
              private cookieService: CookieService,
              private translationService: TranslationService) {
    route.params.subscribe(p => {
      this.id = +p['id'] || 0;
    });

    this.userService.getCurrentUserTokenObs().subscribe(x => {
      this.user = x;
      console.log('x', x);
      console.log('this.user', this.user);
    });

    this.languageSub = this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
    });

    this.goodsService.setCurrentGoodId(this.id);

    if (this.id) {
      this.goodsService.getGoods(this.id)
        .subscribe(data => {
            this.goodsService.setCurrentSaveGoods(this.mapGood(data))
          },
          err => {
            this.toasterService.popAsync(
              this.notificationService.showErrorToast(err.statusText,
                this.isFrench ? err.error.messageData.fr : err.error.messageData.fr))
          });
    } else {
      if (this.user.userType.toUpperCase() === 'SUPPLIER') {
        this.saveGood.supplierId = +this.user.nameid;
      }
      this.goodsService.setCurrentSaveGoods(this.saveGood);
    }
  }

  mapGood(data): SaveSidjGood {
    const good: SaveSidjGood = new SaveSidjGood();
    good.id = data.id;
    good.reference = data.reference;
    good.name = data.name;
    good.gencod = data.gencod === '0000000000000' ? null : data.gencod;
    good.customsReference = data.customsReference;
    good.description = data.description;
    good.currency = data.currency;
    good.fobGrossPrice = data.fobGrossPrice;
    good.fobNetPrice = data.fobNetPrice;
    good.ddpGrossPrice = data.ddpGrossPrice;
    good.ddpNetPrice = data.ddpNetPrice;
    good.exWorksGrossPrice = data.exWorksGrossPrice;
    good.exWorksNetPrice = data.exWorksNetPrice;
    good.paymentTerms = data.paymentTerms;
    good.dateOfValidity = data.dateOfValidity.toString().substring(0, 10);
    good.departurePlace = data.departurePlace;
    good.isExclusivityJc = data.isExclusivityJc;
    good.isSpecialBoxJc = data.isSpecialBoxJc;
    good.availabilityProduct = data.availabilityProduct.toString().substring(0, 10);
    good.minimumQuantity = data.minimumQuantity;
    good.outerColisage = data.outerColisage;
    good.innerColisage = data.innerColisage;
    good.itemsQuantity20 = data.itemsQuantity20;
    good.itemsQuantity40 = data.itemsQuantity40;
    good.outCartonCbm = data.outCartonCbm;
    good.colisageGrossWeight = data.colisageGrossWeight;
    good.colisageNetWeight = data.colisageNetWeight;
    good.outerCartonDimension = data.outerCartonDimension;
    good.productDimension = data.productDimension;
    good.boxDimension = data.boxDimension;
    good.colors = data.colors;
    good.models = data.models;
    good.packagingLanguage = data.packagingLanguage;
    good.manualLanguage = data.manualLanguage;
    good.productLanguage = data.productLanguage;
    good.ageType = data.ageType;
    good.age = data.age;
    good.ageType = data.ageType;
    good.productNetWeight = data.productNetWeight;
    good.productGrossWeight = data.productGrossWeight;
    good.deeeContribution = data.deeeContribution;
    good.functionTryMe = data.functionTryMe;
    good.isChargerIncluded = data.isChargerIncluded;
    good.chargerType = data.chargerType;
    good.engineType = data.engineType;
    good.picture = data.picture;
    good.imageFrom = data.imageFrom;
    good.continent = data.continent;
    good.vatRate = data.vatRate;
    good.isExclusivitySpecialist = data.isExclusivitySpecialist;
    good.gender = data.gender;
    good.shipmentTime = data.shipmentTime;
    good.comments = data.comments;
    good.supplierId = data.supplierId;
    good.countryCode = data.countryCode;
    good.goodAccus = data.goodAccus;
    good.goodBatteries = data.goodBatteries;
    good.unknownAccu = data.unknownAccu;
    good.unknownBattery = data.unknownBattery;

    return good;
  }

  ngOnInit() {
  }

  // goToPicture() {
  //   this.router.navigate(['/saveGood/form-edit/' + this.saveGood.id + '/good-form-step-6'])
  // }
}
