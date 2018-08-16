import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GenderService} from "../../../@core/data/services/gender.service";
import {CookieService} from "ngx-cookie-service";
import {HelperService} from "../../../@core/utils/Helper.service";
import {ExcelImportValueConverterService} from "../../goods/good-excel-import/shared/excel-import-value-converter.service";
import {CurrencyService} from "../../../@core/data/services/currency.service";
import {NotificationService} from "../../../@core/data/services/notification.service";
import * as XLSX from "xlsx";
import {ExcelImportValueCheckerService} from "../../goods/good-excel-import/shared/excel-import-value-checker.service";
import {CountryService} from "../../../@core/data/services/country.service";
import {Key} from "../../../@core/data/models/shared/key";
import {LocalStorageService} from "angular-2-local-storage";
import {Country} from "../../../@core/data/models/country";
import {BatteryService} from "../../../@core/data/services/battery.service";
import {AccuService} from "../../../@core/data/services/accus.service";
import {ToasterService} from "angular2-toaster";
import {epseHeaders} from "./shared/epse-file-import-header";
import {epseErrors} from "./shared/epse-file-import-errors";
import {EpseService} from "../../../@core/data/services/epse.service";
import {Supplier} from "../../../@core/data/models/users/suppliers/supplier";
import {EpsFileService} from "../../../@core/data/services/epsFile.service";
import {EnumTranslation} from "../../../@core/data/models/enums/enumTranslation";
import {Enum} from "../../../@core/data/models/enums/enum";
import {Battery} from "../../../@core/data/models/batteries/battery";
import {Accu} from "../../../@core/data/models/accus/accu";
import {GoodBattery} from "../../../@core/data/models/batteries/goodBattery";
import {GoodAccu} from "../../../@core/data/models/accus/goodAccu";
import {EpseGood} from "../../../@core/data/models/goods/epseGood/epseGood";
import {EpseFile} from "../../../@core/data/models/epse/epseFile";
import {EpseGoodExcel} from "../../../@core/data/models/goods/epseGood/epseGoodExcel";

@Component({
  selector: 'ngx-eps-file-import',
  templateUrl: './eps-file-import.component.html',
  styleUrls: ['./eps-file-import.component.scss']
})
export class EpsFileImportComponent implements OnInit {

  @ViewChild('fileImport') fileInput: any;

  supplier: any;

  batteries: Battery[];
  accus: Accu[];
  pageSize = 0;
  epseFile: EpseFile;

  query = {
    pageSize: this.pageSize,
  };

  validGoods: boolean = false;
  errorsArr: Key[] = [];

  rows: any[] = [];
  user: any;
  epseGoods: EpseGood[] = [];
  epseGoodsExcel: EpseGoodExcel[];
  countries: Country[];
  currencies: Enum[];
  genders: EnumTranslation[];

  constructor(
    private localStorageService: LocalStorageService,
    private excelImportValueCheckerService: ExcelImportValueCheckerService,
    private excelImportValueConverterService: ExcelImportValueConverterService,
    private helperService: HelperService,
    private cookieService: CookieService,
    private epsFileService: EpsFileService,
    private countryService: CountryService,
    private toasterService: ToasterService,
    private notificationService: NotificationService,
    private epseService: EpseService,
    private batteryService: BatteryService,
    private sexeService: GenderService,
    private accusService: AccuService,
    private currencyService: CurrencyService
  ) {

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

    this.epsFileService.currentSupplier.subscribe(x => {
      this.supplier = x;
      if(this.epseGoods) {
        this.epseGoods.map(s => s.supplier = this.supplier.original )
      }
      console.log('this.supplier', this.supplier);
    });



  }

  ngOnInit() {
  }


  onFileChange(event) {
    this.epseGoods = [];
    this.epseGoodsExcel = [];
    this.errorsArr = [];
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      const fileErrorTitle = 'Erreur fichier';
      const fileErrorBody = 'Impossible d\'utiliser plusieurs fichiers';
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
      this.rows = <any[]>(XLSX.utils.sheet_to_json(ws, {header: 1, defval: '', raw: false}))
        .filter(o => !Object.keys(o).every(k => !o[k]));
      // console.log('rows', this.products);
      const hdr: any[] = this.rows[0];
      const hdrArrLabels = epseHeaders;
      console.log('thisrows', this.rows);
      console.log('hdr', hdr);

      this.rows.splice(0, 5);
      console.log('thisrows', this.rows);


      if (this.rows.length <= 0) {
      this.handleProductsNotFound();
      }

      if (this.excelImportValueCheckerService.checkFileVal(hdr, hdrArrLabels)) {
        this.epseGoodsExcel = this.mapProducts(hdr, this.rows, hdrArrLabels);
        this.errorsArr = this.EpseGoodValidation(this.epseGoodsExcel);
        this.validGoods = this.errorsArr.length <= 0 && this.epseGoodsExcel.length > 0;
        if (this.validGoods && this.supplier && this.supplier.id) {
          this.epseFile = this.createEpseFile(target.files[0].name, this.supplier.id, this.epseGoodsExcel);
          console.log('this.epseFile', this.epseFile);
          this.toasterService.popAsync(
            this.notificationService.showSuccessToast('Produits valides'
              , 'Cliquez sur sauvegarder pour ajouter les produits.'));
        } else {
          this.toasterService.popAsync(
            this.notificationService.showWarningToast('Produits non valides',
              'Vérifiez les erreurs ci dessous'
            ))
        }
      } else {

        this.validGoods = false;
        this.toasterService.popAsync(
          this.notificationService.showErrorToast('Mauvais Fichier', 'Veuillez utiliser le modèle fourni.')
        );
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  hdrToLower(hdrArr: any[]) {
    hdrArr.forEach(item => {
      const itemtoLower = item.toLowerCase();
      hdrArr.indexOf(item);
      hdrArr.splice(hdrArr.indexOf(item), 1, itemtoLower);
    });

    return hdrArr;
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

  handleProductsNotFound() {
    const title = 'Erreur';
    const body =  'Aucun produit trouvé.';
    this.toasterService.popAsync(this.notificationService.showErrorToast(title, body));
    throw new Error('not found');
  }


  mapProducts(hdrArr: any[], prods: any[], hdrArrLabels: any) {

    hdrArr = this.excelImportValueCheckerService.hdrToLower(hdrArr);
    hdrArrLabels = this.itemToLower(hdrArrLabels);
    const EpseGoodExcelArr: EpseGoodExcel[] = [];
    prods.forEach(item => {
      const epseGoodExcel: EpseGoodExcel = new EpseGoodExcel();
      const indexItem = prods.indexOf(item);
      epseGoodExcel.reference = item[hdrArr.indexOf(hdrArrLabels.reference)];
      epseGoodExcel.name = item[hdrArr.indexOf(hdrArrLabels.name)];
      epseGoodExcel.gencod = item[hdrArr.indexOf(hdrArrLabels.gencod)];
      epseGoodExcel.customsReference = item[hdrArr.indexOf(hdrArrLabels.customsReference)];
      epseGoodExcel.countryCode = item[hdrArr.indexOf(hdrArrLabels.countryCode)];
      epseGoodExcel.description = item[hdrArr.indexOf(hdrArrLabels.description)];
      epseGoodExcel.currency = item[hdrArr.indexOf(hdrArrLabels.currency)];
      epseGoodExcel.dateOfValidity = item[hdrArr.indexOf(hdrArrLabels.dateOfValidity)];
      epseGoodExcel.isExclusivityJc = item[hdrArr.indexOf(hdrArrLabels.isExclusivityJc)];
      epseGoodExcel.isSpecialBoxJc = item[hdrArr.indexOf(hdrArrLabels.isSpecialBoxJc)];
      epseGoodExcel.availabilityProduct = item[hdrArr.indexOf(hdrArrLabels.availabilityProduct)];

      epseGoodExcel.outerColisage = item[hdrArr.indexOf(hdrArrLabels.outerColisage)];
      epseGoodExcel.innerColisage = item[hdrArr.indexOf(hdrArrLabels.innerColisage)];

      epseGoodExcel.productDimension = item[hdrArr.indexOf(hdrArrLabels.productDimension)];
      epseGoodExcel.boxDimension = item[hdrArr.indexOf(hdrArrLabels.boxDimension)];
      epseGoodExcel.packagingLanguage = item[hdrArr.indexOf(hdrArrLabels.packagingLanguage)];

      epseGoodExcel.manualLanguage = item[hdrArr.indexOf(hdrArrLabels.manualLanguage)];

      epseGoodExcel.productLanguage = item[hdrArr.indexOf(hdrArrLabels.productLanguage)];

      epseGoodExcel.age = item[hdrArr.indexOf(hdrArrLabels.ageNum)];
      epseGoodExcel.ageType = item[hdrArr.indexOf(hdrArrLabels.ageType)];
      epseGoodExcel.productNetWeight = item[hdrArr.indexOf(hdrArrLabels.productNetWeight)];
      epseGoodExcel.productGrossWeight = item[hdrArr.indexOf(hdrArrLabels.productGrossWeight)];

      epseGoodExcel.isAccuIncluded = item[hdrArr.indexOf(hdrArrLabels.isAccuIncluded)];
      epseGoodExcel.accuId = item[hdrArr.indexOf(hdrArrLabels.accuId)];
      epseGoodExcel.accuQty = item[hdrArr.indexOf(hdrArrLabels.accuQty)];
      epseGoodExcel.accuGrossWeight = item[hdrArr.indexOf(hdrArrLabels.accuGrossWeight)]

      epseGoodExcel.isBatteriesIncluded = item[hdrArr.indexOf(hdrArrLabels.isBatteryIncluded)];
      epseGoodExcel.batteryId = item[hdrArr.indexOf(hdrArrLabels.batteryId)];
      epseGoodExcel.batteryQty = item[hdrArr.indexOf(hdrArrLabels.batteryQty)];

      epseGoodExcel.isBatteries2Included = item[hdrArr.indexOf(hdrArrLabels.isBatteries2Included)];
      epseGoodExcel.batteryId2 = item[hdrArr.indexOf(hdrArrLabels.batteryId2)];
      epseGoodExcel.battery2Qty = item[hdrArr.indexOf(hdrArrLabels.battery2Qty)];

      epseGoodExcel.isBatteries3Included = item[hdrArr.indexOf(hdrArrLabels.isBatteries3Included)];
      epseGoodExcel.batteryId3 = item[hdrArr.indexOf(hdrArrLabels.batteryId3)];
      epseGoodExcel.battery3Qty = item[hdrArr.indexOf(hdrArrLabels.battery3Qty)];

      epseGoodExcel.deeeContribution = item[hdrArr.indexOf(hdrArrLabels.deeeContribution)];
      epseGoodExcel.isChargerIncluded = item[hdrArr.indexOf(hdrArrLabels.isChargerIncluded)];
      epseGoodExcel.chargerType = item[hdrArr.indexOf(hdrArrLabels.chargerType)];

      epseGoodExcel.continent = item[hdrArr.indexOf(hdrArrLabels.continent)];
      epseGoodExcel.vatRate = item[hdrArr.indexOf(hdrArrLabels.vatRate)];
      epseGoodExcel.isExclusivitySpecialist = item[hdrArr.indexOf(hdrArrLabels.isExclusivitySpecialist)];
      epseGoodExcel.gender = item[hdrArr.indexOf(hdrArrLabels.productSexe)];
      epseGoodExcel.shipmentTime = item[hdrArr.indexOf(hdrArrLabels.shipmentTime)];
      epseGoodExcel.comments = item[hdrArr.indexOf(hdrArrLabels.comments)];

      epseGoodExcel.supplier = item[hdrArr.indexOf(hdrArrLabels.name)];
      epseGoodExcel.brand = item[hdrArr.indexOf(hdrArrLabels.brand)];
      epseGoodExcel.rangeHeroLicense = item[hdrArr.indexOf(hdrArrLabels.range)];
      epseGoodExcel.grossPrice = item[hdrArr.indexOf(hdrArrLabels.grossPrice)];
      epseGoodExcel.netPrice = item[hdrArr.indexOf(hdrArrLabels.netPrice)];
      epseGoodExcel.diameter = item[hdrArr.indexOf(hdrArrLabels.diameter)];
      epseGoodExcel.epseFileId = item[hdrArr.indexOf(hdrArrLabels.epseFileId)];
      epseGoodExcel.colors = item[hdrArr.indexOf(hdrArrLabels.colors)]
      epseGoodExcel.models = item[hdrArr.indexOf(hdrArrLabels.models)]
      epseGoodExcel.isOtherModels = item[hdrArr.indexOf(hdrArrLabels.multipleModels)];
      epseGoodExcel.isOtherColors = item[hdrArr.indexOf(hdrArrLabels.multipleColors)];
      epseGoodExcel.epseFileId = this.supplier.id.toString();

      EpseGoodExcelArr.push(epseGoodExcel);
    });

    return EpseGoodExcelArr;
  }

  EpseGoodValidation(EpseGoodExcels: EpseGoodExcel[]) {

    const errorArray: Key[] = [];
    const errorsArr = epseErrors;
    EpseGoodExcels.forEach(item => {
      const errorStringArr: string[] = [];
      !this.excelImportValueCheckerService.checkValidityDatePrice(item.dateOfValidity, false)
        ? errorStringArr.push(errorsArr.dateOfValidity) : null;
      !this.excelImportValueCheckerService.checkNumbersOnly(item.customsReference, true)
        ? errorStringArr.push(errorsArr.customsReference) : null;
      !this.excelImportValueCheckerService.checkValidityDatePrice(item.availabilityProduct, false)
        ? errorStringArr.push(errorsArr.availabilityProduct) : null;
      !this.excelImportValueCheckerService.checkGencod(item.gencod)
        ? errorStringArr.push(errorsArr.gencod) : null;
      !this.excelImportValueCheckerService.checkProductName(item.name)
        ? errorStringArr.push(errorsArr.productName) : null;
      !this.excelImportValueCheckerService.checkGoodNumber(item.reference)
        ? errorStringArr.push(errorsArr.goodsNumber) : null;

      !this.excelImportValueCheckerService.checkShipmentTime(item.shipmentTime)
        ? errorStringArr.push(errorsArr.shipmentTime) : null;
      !this.excelImportValueCheckerService.checkCurrency(item.currency)
        ? errorStringArr.push(errorsArr.currency) : null;

      !this.excelImportValueCheckerService.checkDimensions(item.boxDimension)
        ? errorStringArr.push(errorsArr.boxDimension) : null;
      !this.excelImportValueCheckerService.checkDimensions(item.productDimension)
        ? errorStringArr.push(errorsArr.productDimension) : null;
      !this.excelImportValueCheckerService.checkWeightComaAndDot(item.productNetWeight)
        ? errorStringArr.push(errorsArr.productNetWeight) : null;
      !this.excelImportValueCheckerService.checkWeightComaAndDot(item.productGrossWeight)
        ? errorStringArr.push(errorsArr.productGrossWeight) : null;
      !this.excelImportValueCheckerService.checkVATRate(item.vatRate)
        ? errorStringArr.push(errorsArr.vatRate) : null;
      !this.excelImportValueCheckerService.checkCountryName(item.countryCode)
        ? errorStringArr.push(errorsArr.countryCode) : null;
      //
      !this.excelImportValueCheckerService.checkAccu4Epse(item.accuId)
        ? errorStringArr.push(errorsArr.accusId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.accuQty) &&
        this.excelImportValueCheckerService.checkAboveZero(item.accuQty)
          ? errorStringArr.push(errorsArr.accusQty) :
          !this.excelImportValueCheckerService.checkWeightComaAndDot(item.accuGrossWeight) &&
          this.excelImportValueCheckerService.checkAboveZero(item.accuGrossWeight)
            ? errorStringArr.push(errorsArr.accusGrossWeight) : null;

      !this.excelImportValueCheckerService.checkBattery4Epse(item.batteryId)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.batteryQty)
        && this.excelImportValueCheckerService.checkAboveZero(item.batteryQty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkBattery4Epse(item.batteryId2)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.battery2Qty)
        && this.excelImportValueCheckerService.checkAboveZero(item.battery2Qty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkBattery4Epse(item.batteryId3)
        ? errorStringArr.push(errorsArr.batteryId) :
        !this.excelImportValueCheckerService.checkNumbersAndComasOnly(item.battery3Qty)
        && this.excelImportValueCheckerService.checkAboveZero(item.battery3Qty)
          ? errorStringArr.push(errorsArr.batteryId) : null;

      !this.excelImportValueCheckerService.checkGender(item.gender)
        ? errorStringArr.push(errorsArr.productSexe) : null;


      if (errorStringArr.length > 0) {
        const EpseGoodKeys = new Key();
        EpseGoodKeys.goodId = item.reference ? item.reference : item.name;
        EpseGoodKeys.errors = errorStringArr;
        errorArray.push(EpseGoodKeys);
      }
    });

    return errorArray;
  }


  createEpseFile(epseFileName: string, epseFileSupplierId: number, epseExcelItems: EpseGoodExcel[]): EpseFile {
    return new EpseFile(
      0,
       epseFileName,
       epseFileSupplierId,
       this.mapEpseGoodExcelToEpseGood(epseExcelItems));
  }

  mapEpseGoodExcelToEpseGood(EpseGoodsExcel: EpseGoodExcel[]): EpseGood[] {

    EpseGoodsExcel.forEach(item => {
      const epseGood: EpseGood = new EpseGood();
      epseGood.reference = this.excelImportValueConverterService.toUpperConverter(item.reference);
      epseGood.name = this.excelImportValueConverterService.toUpperConverter(item.name);
      epseGood.gencod = item.gencod ? item.gencod : null;
      epseGood.customsReference = item.customsReference;
      epseGood.grossPrice = +this.excelImportValueConverterService.convertEpseGrossPrice(item.grossPrice);

      epseGood.countryCode = item.countryCode;
      epseGood.continent = item.continent;

      epseGood.description = item.description;
      epseGood.currency = item.currency;

      epseGood.dateOfValidity = item.dateOfValidity;
      epseGood.isExclusivityJc = this.excelImportValueConverterService.booleanValueConverter(item.isExclusivityJc);
      epseGood.isSpecialBoxJc = this.excelImportValueConverterService.booleanValueConverter(item.isSpecialBoxJc);
      epseGood.availabilityProduct = item.availabilityProduct;

      epseGood.outerColisage = item.outerColisage ? +item.outerColisage : null;
      epseGood.innerColisage = item.innerColisage ? +item.innerColisage : null;

      epseGood.productDimension = item.productDimension;
      epseGood.boxDimension = item.boxDimension;
      epseGood.packagingLanguage = item.packagingLanguage;
      epseGood.manualLanguage = item.manualLanguage;
      epseGood.productLanguage = item.productLanguage;
      epseGood.age = item.age ?
        this.excelImportValueConverterService.ageValueConverter(+item.age, item.ageType) : 0;
      epseGood.productNetWeight = +item.productNetWeight;
      epseGood.productGrossWeight = +item.productGrossWeight;

      epseGood.deeeContribution = item.deeeContribution;
      epseGood.isChargerIncluded = this.excelImportValueConverterService.booleanValueConverter(item.isChargerIncluded);
      epseGood.chargerType = item.chargerType;

      epseGood.continent = item.continent;
      epseGood.vatRate = this.excelImportValueConverterService.vatRateValueConverter(item.vatRate);
      epseGood.isExclusivitySpecialist =
        this.excelImportValueConverterService.booleanValueConverter(item.isExclusivitySpecialist);
      epseGood.gender = this.excelImportValueConverterService.genderValueConverter(item.gender);
      epseGood.shipmentTime = +item.shipmentTime;
      epseGood.comments = item.comments;

      epseGood.supplier = item.supplier;
      epseGood.brand = item.brand;
      epseGood.rangeHeroLicense = item.rangeHeroLicense;
      epseGood.netPrice = +item.netPrice;
      epseGood.diameter = +item.diameter;
      epseGood.epseFileId = +item.epseFileId;

      epseGood.goodAccus = [];
      if (item.accuId) {
        epseGood.goodAccus.push(this.mapEpseGoodAccus(
          item.accuId, item.isAccuIncluded, item.accuQty, item.accuGrossWeight));
      }

      epseGood.goodBatteries = [];
      if (item.batteryId) {
        epseGood.goodBatteries.push(
          this.mapEpseGoodBattery(item.batteryId, item.isBatteriesIncluded, item.batteryQty));
      }

      if (item.batteryId2) {
        epseGood.goodBatteries.push(
          this.mapEpseGoodBattery(item.batteryId2, item.isBatteries2Included, item.battery2Qty));
      }

      if (item.batteryId3) {
        epseGood.goodBatteries.push(
          this.mapEpseGoodBattery(item.batteryId3, item.isBatteries3Included, item.battery3Qty));
      }
      this.epseGoods.push(epseGood);
    });

    return this.epseGoods;
  }


  mapEpseGoodBattery(id: string, isIncluded: string, qty: string): GoodBattery {
    const goodBattery: GoodBattery = new GoodBattery();
    goodBattery.batteryId = +id;
    goodBattery.isBatteryIncluded = this.excelImportValueConverterService.booleanValueConverter(isIncluded);
    goodBattery.batteryQuantity = qty !== undefined ? +qty : null;

    return goodBattery;
  }

  mapEpseGoodAccus(id: string, isIncluded: string, qty: string, grossWeight: string): GoodAccu {
    const goodAccus: GoodAccu = new GoodAccu();
    goodAccus.accuId = +id;
    goodAccus.accuGrossWeight = grossWeight !== undefined ? +grossWeight : 1;
    goodAccus.isAccusIncluded = this.excelImportValueConverterService.booleanValueConverter(isIncluded);
    goodAccus.accuQuantity = qty !== undefined ? +qty : 1;

    return goodAccus;
  }

  importFile() {
    if (this.validGoods) {
      if (this.epseFile.items.length > 0) {
        console.log('epseFile', this.epseFile);
        this.epseService.importEpseFile(this.epseFile).subscribe(res => {
            this._handleSubmitSuccess(res);
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

  private _handleSubmitSuccess(addedProductCount) {
    if (addedProductCount) {
      const title = 'Succès !';
      const body = addedProductCount + (' produits ajoutés');
      this.toasterService.popAsync(this.notificationService.showSuccessToast(title, body, false));
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
