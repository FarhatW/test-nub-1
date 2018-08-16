import {Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GoodService} from '../../../@core/data/services/good.service';
import {TranslationService} from '../../../@core/data/services/translation.service';
import {CookieService} from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../../@core/utils/Helper.service';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {en_headers, fr_headers} from './shared/excel-import-header-translation';
import {Subscription} from 'rxjs/Subscription';
import {GoodExcel} from '../../../@core/data/models/goods/goodExcel';
import {Country} from '../../../@core/data/models/country';
import {ToasterService} from 'angular2-toaster';
import {NotificationService} from '../../../@core/data/services/notification.service';
import {GoodList} from '../../../@core/data/models/goods/goodList';
import {CountryService} from '../../../@core/data/services/country.service';
import {Key} from '../../../@core/data/models/shared/key';
import {BatteryService} from '../../../@core/data/services/battery.service';
import {AccuService} from '../../../@core/data/services/accus.service';
import {ExcelImportValueCheckerService} from './shared/excel-import-value-checker.service';
import {errorsEN, errorsFR} from './shared/excel-import-errors';
import {ExcelImportValueConverterService} from './shared/excel-import-value-converter.service';
import {CurrencyService} from "../../../@core/data/services/currency.service";
import {LanguageService} from "../../../@core/data/services/language.service";
import {GenderService} from "../../../@core/data/services/gender.service";
import {Battery} from "../../../@core/data/models/batteries/battery";
import {Accu} from "../../../@core/data/models/accus/accu";
import {GoodAccu} from "../../../@core/data/models/accus/goodAccu";
import {GoodBattery} from "../../../@core/data/models/batteries/goodBattery";
import {Good} from "../../../@core/data/models/goods/good";
import {Enum} from "../../../@core/data/models/enums/enum";
import {EnumTranslation} from "../../../@core/data/models/enums/enumTranslation";
import {SidjGood} from "../../../@core/data/models/goods/sidjGood/sidjGood";
import {UserService} from "../../../@core/data/services/user.service";
import {
  AutocompleteItem, CreateNewAutocompleteGroup, NgAutocompleteComponent,
  SelectedAutocompleteItem,
} from 'ng-auto-complete';
import {GoodFormService} from "../good-form/shared/good-form.service";
import {SidjGoodExcel} from "../../../@core/data/models/goods/sidjGood/sidjGoodExcel";
import {UserToken} from "../../../@core/data/models/users/userToken";

@Component({
  selector: 'ngx-goods-excel-import',
  templateUrl: './good-excel-import.component.html',
  styleUrls: ['./good-excel-import.component.scss']
})
export class GoodExcelImportComponent implements OnInit {

  @ViewChild('xlsTable', {read: Ng2SmartTableComponent}) xlsTable: Ng2SmartTableComponent
  @ViewChild('fileImport') fileInput: any;

  batteries: Battery[];
  accus: Accu[];
  pageSize = 0;
  isSelectSup: boolean = false;


  @ViewChild('autocompleteSupplier') public autocompleteSupplier: NgAutocompleteComponent;


  public suppliersGroup = [
    CreateNewAutocompleteGroup(
      'Search',
      'completer',
      [],
      {titleKey: 'title', childrenKey: null},
    ),
  ];

  query = {
    pageSize: this.pageSize,
  };

  validGoods: boolean = false;
  errorsArr: Key[] = [];
  suppliers: any[] = [];
  isSupplier: boolean;
  isFrench: boolean;
  products: any[] = [];
  user: UserToken;
  goods: SidjGood[] = [];
  goodsExcel: SidjGoodExcel[];
  countries: Country[];
  currencies: Enum[];
  languages: Enum[];
  genders: EnumTranslation[];

  autocompleterPlaceholderFr: 'Recherche';
  autocompleterPlaceholderEn: 'Search';


  languageSub: Subscription;

  constructor(public translate: TranslateService,
              private translationService: TranslationService,
              private localStorageService: LocalStorageService,
              private excelImportValueCheckerService: ExcelImportValueCheckerService,
              private excelImportValueConverterService: ExcelImportValueConverterService,
              private helperService: HelperService,
              private cookieService: CookieService,
              private countryService: CountryService,
              private toasterService: ToasterService,
              private notificationService: NotificationService,
              private languageService: LanguageService,
              private goodsService: GoodService,
              private batteryService: BatteryService,
              private userService: UserService,
              private sexeService: GenderService,
              private accusService: AccuService,
              public goodFormService: GoodFormService,
              private currencyService: CurrencyService
  ) {
    this.translationService.getLanguage().subscribe(x => {
      this.isFrench = x;
      this.translate.currentLang = this.isFrench ? 'fr' : 'eng';
    });

    this.user = this.userService.getCurrentUser();
    this.goodFormService.setCurrentAffectedSupplier(null);
  }

  ngOnInit() {

    this.countryService.getAll().subscribe(res => {
      this.countries = res.items;
      this.countryService.setCurrentCountries(res.items);
    });

    this.batteryService.getAll(this.query).subscribe(b => {
      this.batteries = b.items;
      this.batteryService.setCurrentBatteries(this.batteries);
    });

    this.accusService.getAll(this.query).subscribe(ac => {
      this.accus = ac.items;
      this.accusService.setCurrentAccu(this.accus);
    });

    this.currencyService.getAll().subscribe(c => {
      this.currencies = c;
      this.currencyService.setCurrentCurrencies(c);
    });

    this.sexeService.getAll().subscribe(s => {
      this.genders = s;
      this.sexeService.setCurrentGenders(s);
    });

    this.languageService.getAll().subscribe(l => {
      this.languages = l;
      this.languageService.setCurrentLanguages(l);
    });

    if (this.user.userType.toUpperCase() !== 'SUPPLIER') {
      this.isSupplier = false;
      this.userService.getAll(null).subscribe(sup => {
          sup.items.forEach(item => {
            this.suppliers.push(new AutocompleteItem(item.contact.company, item.id, ''));
          });
          this.autocompleteSupplier.SetValues('completer', this.suppliers);
        },
      );
    } else {
      this.isSupplier = true;
      this.isSelectSup = true
    }
  }

  onFileChange(event) {
    this.goods = [];
    this.goodsExcel = [];
    this.errorsArr = [];
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      const fileErrorTitle = this.isFrench ? 'Erreur fichier' : 'File Error';
      const fileErrorBody = this.isFrench ? 'Impossible d\'utiliser plusieurs fichiers' : 'Cannot add multiple files.'
      this.toasterService.popAsync(this.notificationService.showErrorToast(fileErrorTitle, fileErrorBody));
      throw new Error('multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.products = <any[]>(XLSX.utils.sheet_to_json(ws, {header: 1, defval: '', raw: false}))
        .filter(o => !Object.keys(o).every(k => !o[k]));
      const hdr: any[] = this.hdrToLower(this.products[0]);
      const frenchFile = this.checkFileLanguage(hdr);
      const hdrArrLabels = frenchFile ? fr_headers : en_headers;
      this.products.splice(0, 5);

      if (this.products.length <= 0) {
        this.handleProductsNotFound();
      }

      if (this.excelImportValueCheckerService.checkFileValidity(hdr, hdrArrLabels)) {
        this.goodsExcel = this.mapProducts(hdr, this.products, hdrArrLabels);
        console.log('this.goodsExcel', this.goodsExcel);
        this.errorsArr = this.goodsValidation(this.goodsExcel, frenchFile);
        this.validGoods = this.errorsArr.length <= 0 && this.goodsExcel.length > 0;
        if (this.validGoods) {
          this.handleValidGoods();
        } else {
          this.handleNotValidGoods()
        }
      } else {
        this.handleWrongFile();
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  handleWrongFile() {
    this.validGoods = false;
    this.toasterService.popAsync(
      this.notificationService.showErrorToast(this.isFrench ? 'Mauvais Fichier' :
        'Wrong File', this.isFrench ? 'Veuillez utiliser le modèle fourni.' : 'Please use our file model.')
    );
  }

  handleProductsNotFound() {
    const title = this.isFrench ? 'Erreur' : 'Error';
    const body = this.isFrench ? 'Aucun produit trouvé.' : 'No products found. '
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body));
    throw new Error('not found');
  }

  handleValidGoods() {
    this.goods = this.mapGoodsExceToGood(this.goodsExcel);
    this.toasterService.popAsync(
      this.notificationService.showSuccessToast(this.isFrench ? 'Produits valides' : 'Valid Products',
        this.isFrench ? 'Cliquez sur sauvegarder pour ajouter les produits.' :
          'You can now import your products by clicking the save products button'
      ));
  }

  handleNotValidGoods() {
    this.toasterService.popAsync(
      this.notificationService.showWarningToast(this.isFrench ? 'Produits non valides' : 'Invalid Products',
        this.isFrench ? 'Vérifiez les erreurs ci dessous' :
          'Please check your products using the error list below'
      ));
  }

  hdrToLower(hdrArr: any[]) {
    hdrArr.forEach(item => {
      const itemtoLower = item.toLowerCase().replace(/\r?\n|\r/g, '');
      hdrArr.indexOf(item);
      hdrArr.splice(hdrArr.indexOf(item), 1, itemtoLower);
    });

    return hdrArr;
  }

  checkFileLanguage(hdrArr: any[]): boolean {
    return hdrArr.indexOf('référence') !== -1;
  }

  selectedSupplier(event) {
    if (event.item) {
      this.isSelectSup = true;
      this.goodFormService.setCurrentAffectedSupplier(event.item);
    }
    else {
      this.isSelectSup = false;
      this.goodFormService.setCurrentAffectedSupplier(null);
    }
  }

  itemToLower(hdrArrLabels) {
    var key, keys = Object.keys(hdrArrLabels);
    var n = keys.length;
    while (n--) {
      key = keys[n];
      hdrArrLabels[key] = hdrArrLabels[key].toLowerCase().replace(/\r?\n|\r/g, '');
    }

    return hdrArrLabels;
  }


  mapProducts(hdrArr: any[], prods: any[], hdrObjLabels: any) {

    const goodArr: SidjGoodExcel[] = [];
    const hdrArrLabels = this.itemToLower(hdrObjLabels);


    prods.forEach(item => {
      const goodExcel: SidjGoodExcel = new SidjGoodExcel();
      const indexItem = prods.indexOf(item);

      goodExcel.reference = item[hdrArr.indexOf(hdrArrLabels.reference)];

      goodExcel.name = item[hdrArr.indexOf(hdrArrLabels.name)];

      goodExcel.gencod = item[hdrArr.indexOf(hdrArrLabels.gencod)];
      goodExcel.customsReference = item[hdrArr.indexOf(hdrArrLabels.customsReference)];
      goodExcel.countryCode = item[hdrArr.indexOf(hdrArrLabels.countryCode)];
      goodExcel.description = item[hdrArr.indexOf(hdrArrLabels.description)];

      goodExcel.currency = item[hdrArr.indexOf(hdrArrLabels.currency)];

      goodExcel.fobGrossPrice = item[hdrArr.indexOf(hdrArrLabels.fobGrossPrice)];
      goodExcel.fobNetPrice = item[hdrArr.indexOf(hdrArrLabels.fobNetPrice)];
      goodExcel.ddpGrossPrice = item[hdrArr.indexOf(hdrArrLabels.ddpGrossPrice)];
      goodExcel.ddpNetPrice = item[hdrArr.indexOf(hdrArrLabels.ddpNetPrice)];
      goodExcel.exWorksGrossPrice = item[hdrArr.indexOf(hdrArrLabels.exWorksGrossPrice)];
      goodExcel.exWorksNetPrice = item[hdrArr.indexOf(hdrArrLabels.exWorksNetPrice)];
      goodExcel.paymentTerms = item[hdrArr.indexOf(hdrArrLabels.paymentTerms)];
      goodExcel.dateOfValidity = item[hdrArr.indexOf(hdrArrLabels.dateOfValidity)];
      goodExcel.departurePlace = item[hdrArr.indexOf(hdrArrLabels.departurePlace)];
      goodExcel.isExclusivityJc = item[hdrArr.indexOf(hdrArrLabels.isExclusivityJc)];
      goodExcel.isSpecialBoxJc = item[hdrArr.indexOf(hdrArrLabels.isSpecialBoxJc)];
      goodExcel.availabilityProduct = item[hdrArr.indexOf(hdrArrLabels.availabilityProduct)];
      goodExcel.minimumQuantity = item[hdrArr.indexOf(hdrArrLabels.minimumQuantity)];

      goodExcel.outerColisage = item[hdrArr.indexOf(hdrArrLabels.outerColisage)];
      goodExcel.innerColisage = item[hdrArr.indexOf(hdrArrLabels.innerColisage)];
      goodExcel.itemsQuantity20 = item[hdrArr.indexOf(hdrArrLabels.itemsQuantity20)];
      goodExcel.itemsQuantity40 = item[hdrArr.indexOf(hdrArrLabels.itemsQuantity40)];
      // goodExcel.outCartonCbm = item[hdrArr.indexOf(hdrArrLabels.outCartonCbm)];
      goodExcel.colisageGrossWeight = item[hdrArr.indexOf(hdrArrLabels.colisageGrossWeight)];
      goodExcel.colisageNetWeight = item[hdrArr.indexOf(hdrArrLabels.colisageNetWeight)];
      goodExcel.outerCartonDimension = item[hdrArr.indexOf(hdrArrLabels.outerCartonDimension)];

      goodExcel.productDimension = item[hdrArr.indexOf(hdrArrLabels.productDimension)];
      goodExcel.boxDimension = item[hdrArr.indexOf(hdrArrLabels.boxDimension)];
      goodExcel.colors = item[hdrArr.indexOf(hdrArrLabels.colors)];
      goodExcel.models = item[hdrArr.indexOf(hdrArrLabels.models)];
      goodExcel.packagingLanguage = item[hdrArr.indexOf(hdrArrLabels.packagingLanguage)];

      goodExcel.manualLanguage = item[hdrArr.indexOf(hdrArrLabels.manualLanguage)];

      goodExcel.productLanguage = item[hdrArr.indexOf(hdrArrLabels.productLanguage)];

      goodExcel.age = item[hdrArr.indexOf(hdrArrLabels.ageNum)];
      goodExcel.ageType = item[hdrArr.indexOf(hdrArrLabels.ageType)];
      goodExcel.productNetWeight = item[hdrArr.indexOf(hdrArrLabels.productNetWeight)];
      goodExcel.productGrossWeight = item[hdrArr.indexOf(hdrArrLabels.productGrossWeight)];

      goodExcel.isAccuIncluded = item[hdrArr.indexOf(hdrArrLabels.isAccuIncluded)];
      goodExcel.accuId = item[hdrArr.indexOf(hdrArrLabels.accuId)];
      goodExcel.accuQty = item[hdrArr.indexOf(hdrArrLabels.accuQty)];
      goodExcel.accuGrossWeight = item[hdrArr.indexOf(hdrArrLabels.accuGrossWeight)]

      goodExcel.isBatteriesIncluded = item[hdrArr.indexOf(hdrArrLabels.isBatteryIncluded)];
      goodExcel.batteryId = item[hdrArr.indexOf(hdrArrLabels.batteryId)];
      goodExcel.batteryQty = item[hdrArr.indexOf(hdrArrLabels.batteryQty)];

      goodExcel.isBatteries2Included = item[hdrArr.indexOf(hdrArrLabels.isBatteries2Included)];
      goodExcel.batteryId2 = item[hdrArr.indexOf(hdrArrLabels.batteryId2)];
      goodExcel.battery2Qty = item[hdrArr.indexOf(hdrArrLabels.battery2Qty)];

      goodExcel.isBatteries3Included = item[hdrArr.indexOf(hdrArrLabels.isBatteries3Included)];
      goodExcel.batteryId3 = item[hdrArr.indexOf(hdrArrLabels.batteryId3)];
      goodExcel.battery3Qty = item[hdrArr.indexOf(hdrArrLabels.battery3Qty)];

      goodExcel.deeeContribution = item[hdrArr.indexOf(hdrArrLabels.deeeContribution)];
      goodExcel.functionTryMe = item[hdrArr.indexOf(hdrArrLabels.functionTryMe)];
      goodExcel.isChargerIncluded = item[hdrArr.indexOf(hdrArrLabels.isChargerIncluded)];
      goodExcel.chargerType = item[hdrArr.indexOf(hdrArrLabels.chargerType)];

      goodExcel.picture = item[hdrArr.indexOf(hdrArrLabels.showImage)];
      goodExcel.continent = item[hdrArr.indexOf(hdrArrLabels.continent)];
      goodExcel.vatRate = item[hdrArr.indexOf(hdrArrLabels.vatRate)];
      goodExcel.isExclusivitySpecialist = item[hdrArr.indexOf(hdrArrLabels.isExclusivitySpecialist)];
      goodExcel.gender = item[hdrArr.indexOf(hdrArrLabels.productSexe)];
      goodExcel.shipmentTime = item[hdrArr.indexOf(hdrArrLabels.shipmentTime)];
      goodExcel.comments = item[hdrArr.indexOf(hdrArrLabels.comments)];

      goodExcel.supplierId = this.isSupplier ? this.user.nameid :
        this.goodFormService.getCurrentAffectecSupplierValue() ?
          this.goodFormService.getCurrentAffectecSupplierValue().id : 0;

      goodArr.push(goodExcel);
    });
    return goodArr;
  }

  goodsValidation(goods: SidjGoodExcel[], frenchFile: boolean) {

    const errorArray: Key[] = [];
    const errorsArr = this.isFrench ? errorsFR : errorsEN;


    goods.forEach(item => {
      const errorStringArr: string[] = [];
      !this.excelImportValueCheckerService.checkValidityDatePrice(item.dateOfValidity, false)
        ? errorStringArr.push(errorsArr.dateOfValidity) : null;
      !this.excelImportValueCheckerService.checkNumbersOnly(item.customsReference, false)
        ? errorStringArr.push(errorsArr.customsReference) : null;
      !this.excelImportValueCheckerService.checkValidityDatePrice(item.availabilityProduct, false)
        ? errorStringArr.push(errorsArr.availabilityProduct) : null;
      !this.excelImportValueCheckerService.checkGencod(item.gencod)
        ? errorStringArr.push(errorsArr.gencod) : null;
      !this.excelImportValueCheckerService.checkProductName(item.name)
        ? errorStringArr.push(errorsArr.productName) : null;
      !this.excelImportValueCheckerService.checkGoodNumber(item.reference)
        ? errorStringArr.push(errorsArr.goodsNumber) : null;
      !this.excelImportValueCheckerService.checkNetPrices(item.fobNetPrice, item.exWorksNetPrice, item.ddpNetPrice) ?
        errorStringArr.push(errorsArr.netPrices) : null;
      !this.excelImportValueCheckerService.checkShipmentTime(item.shipmentTime)
        ? errorStringArr.push(errorsArr.shipmentTime) : null;
      !this.excelImportValueCheckerService.checkCurrency(item.currency)
        ? errorStringArr.push(errorsArr.currency) : null;
      !this.excelImportValueCheckerService.checkPlaceOfDeparture(item.departurePlace)
        ? errorStringArr.push(errorsArr.departurePlace) : null;
      // !this.excelImportValueCheckerService.checkOuterColisage(item.outerCartonDimension)
      //   ? errorStringArr.push(errorsArr.outerColisage) : null;
      !this.excelImportValueCheckerService.checkDimensions(item.boxDimension)
        ? errorStringArr.push(errorsArr.boxDimension) : null;
      !this.excelImportValueCheckerService.checkDimensions(item.productDimension)
        ? errorStringArr.push(errorsArr.productDimension) : null;
      !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.productNetWeight)
        ? errorStringArr.push(errorsArr.productNetWeight) : null;
      !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.productGrossWeight)
        ? errorStringArr.push(errorsArr.productGrossWeight) : null;
      !this.excelImportValueCheckerService.checkVATRate(item.vatRate)
        ? errorStringArr.push(errorsArr.vatRate) : null;
      !this.excelImportValueCheckerService.checkCountryCode(item.countryCode)
        ? errorStringArr.push(errorsArr.countryCode) : null;

      !this.excelImportValueCheckerService.checkLanguage(item.manualLanguage)
        ? errorStringArr.push(errorsArr.manualLanguage) : null;

      !this.excelImportValueCheckerService.checkLanguage(item.packagingLanguage)
        ? errorStringArr.push(errorsArr.packagingLanguage) : null;

      !this.excelImportValueCheckerService.checkLanguage(item.productLanguage)
        ? errorStringArr.push(errorsArr.productLanguage) : null;

      !this.excelImportValueCheckerService.checkAccusId(item.accuId)
        ? errorStringArr.push(errorsArr.accusId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.accuQty) &&
        this.excelImportValueCheckerService.checkAboveZero(item.accuQty)
          ? errorStringArr.push(errorsArr.accusQty) :
          !this.excelImportValueCheckerService.checkWeight(item.accuGrossWeight) &&
          this.excelImportValueCheckerService.checkAboveZero(item.accuGrossWeight)
            ? errorStringArr.push(errorsArr.accusGrossWeight) : null;

      !this.excelImportValueCheckerService.checkBatteryId(item.batteryId)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.batteryQty)
        && this.excelImportValueCheckerService.checkAboveZero(item.batteryQty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkBatteryId(item.batteryId2)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.battery2Qty)
        && this.excelImportValueCheckerService.checkAboveZero(item.battery2Qty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkBatteryId(item.batteryId3)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.battery3Qty)
        && this.excelImportValueCheckerService.checkAboveZero(item.battery3Qty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkGender(item.gender)
        ? errorStringArr.push(errorsArr.productSexe) : null

      !this.excelImportValueCheckerService.checkSupplierId(item.supplierId) ?
        errorStringArr.push(errorsArr.supplierId) : null;

      if (errorStringArr.length > 0) {
        const goodKeys = new Key();
        goodKeys.goodId = item.reference ? item.reference : item.name;
        goodKeys.errors = errorStringArr;
        errorArray.push(goodKeys);
      }
    });

    return errorArray;
  }

  mapGoodsExceToGood(goodsXL: SidjGoodExcel[]): SidjGood[] {
    goodsXL.forEach(item => {

      const newGood: SidjGood = new SidjGood();
      newGood.reference = this.excelImportValueConverterService.toUpperConverter(item.reference);
      newGood.name = this.excelImportValueConverterService.toUpperConverter(item.name);
      newGood.gencod = item.gencod ? item.gencod : null;
      newGood.customsReference = item.customsReference;

      newGood.countryCode = item.countryCode;
      newGood.continent = this.excelImportValueConverterService.continentValueConverter(item.countryCode);

      newGood.description = item.description;
      newGood.currency = item.currency;
      newGood.ddpGrossPrice = +item.ddpGrossPrice;
      newGood.ddpNetPrice = +item.ddpNetPrice;
      newGood.fobGrossPrice = +item.fobGrossPrice;
      newGood.fobNetPrice = +item.fobNetPrice;
      newGood.exWorksGrossPrice = +item.exWorksGrossPrice;
      newGood.exWorksNetPrice = +item.exWorksNetPrice;
      newGood.paymentTerms = item.paymentTerms;

      newGood.dateOfValidity = item.dateOfValidity;
      newGood.departurePlace = item.departurePlace;
      newGood.isExclusivityJc = this.excelImportValueConverterService.booleanValueConverter(item.isExclusivityJc);
      newGood.isSpecialBoxJc = this.excelImportValueConverterService.booleanValueConverter(item.isSpecialBoxJc);
      newGood.availabilityProduct = item.availabilityProduct;
      newGood.minimumQuantity = +item.minimumQuantity;

      newGood.outerColisage = item.outerColisage ? +item.outerColisage : null;
      newGood.innerColisage = item.innerColisage ? +item.innerColisage : null;
      newGood.itemsQuantity20 = item.itemsQuantity20 ? +item.itemsQuantity20 : null;
      newGood.itemsQuantity40 = item.itemsQuantity40 ? +item.itemsQuantity40 : null;
      newGood.outCartonCbm = this.excelImportValueConverterService.outCartonCBMValueConverter(item.outerCartonDimension)
      newGood.colisageGrossWeight = +item.colisageGrossWeight;
      newGood.colisageNetWeight = +item.colisageNetWeight;
      newGood.outerCartonDimension = item.outerCartonDimension;

      newGood.productDimension = item.productDimension;
      newGood.boxDimension = item.boxDimension;
      newGood.colors = item.colors;
      newGood.models = item.models;
      newGood.packagingLanguage = this.excelImportValueConverterService.languageConverter(item.packagingLanguage);
      newGood.manualLanguage = this.excelImportValueConverterService.languageConverter(item.manualLanguage);
      newGood.productLanguage = this.excelImportValueConverterService.languageConverter(item.productLanguage);
      newGood.age = item.age ?
        this.excelImportValueConverterService.ageValueConverter(+item.age, item.ageType) : 0;
      newGood.productNetWeight = +item.productNetWeight;
      newGood.productGrossWeight = +item.productGrossWeight;

      newGood.deeeContribution = item.deeeContribution;
      newGood.functionTryMe = this.excelImportValueConverterService.booleanValueConverter(item.functionTryMe);
      newGood.isChargerIncluded = this.excelImportValueConverterService.booleanValueConverter(item.isChargerIncluded);
      newGood.chargerType = item.chargerType;

      newGood.picture = item.picture;
      newGood.continent = item.continent;
      newGood.vatRate = this.excelImportValueConverterService.vatRateValueConverter(item.vatRate);
      newGood.isExclusivitySpecialist =
        this.excelImportValueConverterService.booleanValueConverter(item.isExclusivitySpecialist);
      newGood.gender = this.excelImportValueConverterService.genderValueConverter(item.gender);
      newGood.shipmentTime = +item.shipmentTime;
      newGood.comments = item.comments;

      newGood.supplierId = +item.supplierId;

      newGood.goodAccus = [];
      if (item.accuId) {
        newGood.goodAccus.push(this.mapGoodAccu(
          item.accuId, item.isAccuIncluded, item.accuQty, item.accuGrossWeight));
      }

      newGood.goodBatteries = [];
      if (item.batteryId) {
        newGood.goodBatteries.push(this.mapGoodBattery(item.batteryId, item.isBatteriesIncluded, item.batteryQty));
      }

      if (item.batteryId2) {
        newGood.goodBatteries.push(this.mapGoodBattery(item.batteryId2, item.isBatteries2Included, item.battery2Qty));
      }

      if (item.batteryId3) {
        newGood.goodBatteries.push(this.mapGoodBattery(item.batteryId3, item.isBatteries3Included, item.battery3Qty));
      }
      this.goods.push(newGood);
    });
    return this.goods;
  }

  mapGoodBattery(id: string, isIncluded: string, qty: string): GoodBattery {
    const goodBattery: GoodBattery = new GoodBattery();
    goodBattery.batteryId = +id;
    goodBattery.isBatteryIncluded = this.excelImportValueConverterService.booleanValueConverter(isIncluded);
    goodBattery.batteryQuantity = qty !== undefined ? +qty : null;

    return goodBattery;
  }

  mapGoodAccu(id: string, isIncluded: string, qty: string, grossWeight: string): GoodAccu {
    const goodAccu: GoodAccu = new GoodAccu();
    goodAccu.accuId = +id;
    goodAccu.accuGrossWeight = grossWeight !== undefined ? +grossWeight : 1;
    goodAccu.isAccusIncluded = this.excelImportValueConverterService.booleanValueConverter(isIncluded);
    goodAccu.accuQuantity = qty !== undefined ? +qty : 1;

    return goodAccu;
  }

  importGoods() {
    if (this.validGoods) {
      if (this.goods.length >= 0) {
        this.goodsService.multiCreateProduct(this.goods).subscribe(res => {
            this._handleSubmitSuccess(res.addedProductCount);
            this._handleDuplicatedProducts(res.duplicatedRefList);
            this._handleInvalidGencods(res.invalidGencodsList);
            this._handleExistingGencods(res.existingGencodsList);
          },
          err => {
            this._handleSubmitError(err);
          }, () => {

            this.validGoods = false;
            this.clearFileInput();
          }
        )
      }
    }
  }

  private _handleSubmitSuccess(addedProductCount: number) {
    if (addedProductCount) {
      const title = this.isFrench ? 'Succès !' : 'Success !'
      const body = addedProductCount + (this.isFrench ? ' produits ajoutés' : ' products were added');
      this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body, false));
    }
  }

  private _handleDuplicatedProducts(duplicatedRefList: string[]) {
    if (duplicatedRefList.length > 0) {
      const title = duplicatedRefList.length +
        (this.isFrench ? ' produit(s) existe(nt) déjà.' : ' product(s) already exist(s)');
      const body = (this.isFrench ? 'Les produits suivants sont déjà présents dans notre base : ' :
        'These products have been found in our database : ') + duplicatedRefList.join(', ');
      this.toasterService.popAsync(this.notificationService.showWarningToast(title, body, false));
    }
  }

  private _handleInvalidGencods(invalidGencodsList: string[]) {

    if (invalidGencodsList.length > 0) {
      const titleInvalid = invalidGencodsList.length + (this.isFrench ? ' gencod invalide(s)' : ' invalid gencod(s)');
      const bodyInvalid = (this.isFrench ? 'Produit(s) avec GENCOD invalide(s) :' : 'Invalid Gencods : ')
        + invalidGencodsList.join(', ');
      this.toasterService.popAsync(this.notificationService.showWarningToast(titleInvalid, bodyInvalid, false));
    }
  }

  private _handleExistingGencods(existingGencodList: string[]) {
    if (existingGencodList.length > 0) {
      const titleInvalid = existingGencodList.length + (this.isFrench ? ' Gencod éxistant(s)' : ' Existing gencod(s)');
      const bodyInvalid = (this.isFrench ? 'Produit(s) avec GENCOD déjà éxistant(s) :' : 'Item(s) found with an already existing gencod : ')
        + existingGencodList.join(', ');
      this.toasterService.popAsync(this.notificationService.showWarningToast(titleInvalid, bodyInvalid, false));
    }
  }

  private _handleSubmitError(err) {
    const title = 'une erreur est survenue';
    const body = err.statusText;
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body, false))
  }

  clearFileInput() {
    this.fileInput.nativeElement.value = '';
  }


}



