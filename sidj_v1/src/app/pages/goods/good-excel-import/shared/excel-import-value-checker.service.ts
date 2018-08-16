import {Injectable} from '@angular/core';
import {CountryService} from '../../../../@core/data/services/country.service';
import {AccuService} from '../../../../@core/data/services/accus.service';
import {BatteryService} from '../../../../@core/data/services/battery.service';
import {CurrencyService} from '../../../../@core/data/services/currency.service';
import {VatRateService} from '../../../../@core/data/services/vatRate.service';
import {LanguageService} from '../../../../@core/data/services/language.service';
import {SidjGoodExcel} from "../../../../@core/data/models/goods/sidjGood/sidjGoodExcel";

@Injectable()
export class ExcelImportValueCheckerService {

  formatNumberOnly = /^[0-9]*$/;
  formatNumberAndCommaOnly = /^[+ -]?[0-9]{1,3}([.][0-9]{1,3})?$/;
  formatLettersAndSpaces = /^[a-zA-Z\s]*$/;
  formatDimensions = /(\d+(?:,\d+)?)x(\d+(?:,\d+)?)(?:x(\d+(?:,\d+)?))?/;
  formatDimensionsX = /(\d+(?:,\d+)?)X(\d+(?:,\d+)?)(?:X(\d+(?:,\d+)?))?/;
  formatDimensionsSpaceX = /(\d+(?:,\d+)?) X (\d+(?:,\d+)?)(?: X (\d+(?:,\d+)?))?/;
  formatDimensionsSpacex = /(\d+(?:,\d+)?) x (\d+(?:,\d+)?)(?: x (\d+(?:,\d+)?))?/;
  formatu0300 = /[\u0300-\u036f]/g;

  formatWeightDot = /^[0-9]{1,11}(?:\.[0-9]{1,3})?$/;
  formatWeightComa = /^[0-9]{1,11}(?:\,[0-9]{1,3})?$/;
  formatWeightComaTenDecimals = /^[0-9]{1,11}(?:\,[0-9]{1,10})?$/;
  formatWeightDotTenDecimals = /^[0-9]{1,11}(?:\.[0-9]{1,10})?$/;

  formatNumbersWithoutSpecialCharactersButDot = /[^a-zA-Z0-9. ]/g;
  formatNumbersWithoutSpecialCharactersButComas = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/;
  formatNumbersWithoutSpecialCharacters = /[^a-zA-Z0-9 ]/g;
  formatGoodNumber = /^[A-Z0-9-]+$/;
  formatDateUS = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{2})$/;

  constructor(
    private countryService: CountryService,
    private accusService: AccuService,
    private batteryService: BatteryService,
    private currencyService: CurrencyService,
    private vatService: VatRateService,
    private languageService: LanguageService,
  ) {
  }


  checkWeightComaAndDot(num: string): boolean {
    return num ? this.formatWeightComa.test(num) || this.formatWeightDot.test(num) : !num;
  }

  hdrToLower(hdrArr: any[]) {
    hdrArr.forEach(item => {
      const itemtoLower = item.toLowerCase().replace(/\r?\n|\r/g, '');
      hdrArr.indexOf(item);
      hdrArr.splice(hdrArr.indexOf(item), 1, itemtoLower);
    });

    return hdrArr;
  }

  checkSupplierId(supplierId: string) {
    return +supplierId !== 0;
  }



  checkFileVal(hdrArr: any[], headers: any): boolean {
    let isValid = true;

    const headersToArr = this.hdrToLower(Object.values(headers));

    this.hdrToLower(hdrArr).forEach(item => {
      if (isValid) {
        const itemExists = headersToArr.indexOf(item);
        if (itemExists === -1) {
          console.log('item', item);
          isValid = false;
        }
      }
    });
    return isValid;
  }


  checkFileValidity(hdrArr: any[], headers: any): boolean {
    let isValid = true;

    const hdrArrToLow = this.hdrToLower(hdrArr);

    this.hdrToLower(Object.values(headers)).forEach(item => {
      if (isValid) {
        const itemExists = hdrArrToLow.indexOf(item);
        if (itemExists === -1) {
          console.log('item', item);
          isValid = false;
        }
      }
    });
    return isValid;
  }

  checkBoxVolume(volume: string): boolean {
    return this.formatWeightComaTenDecimals.test(volume)
      || this.formatWeightDotTenDecimals.test(volume);
  }

  checkGencod(gencod: string): boolean {
    return gencod ? gencod.length >= 12 && gencod.length <= 13 && this.formatNumberOnly.test(gencod) : true;
  }

  checkProductName(productName: string): boolean {

    return !!productName;
  }

  checkGoodNumber(goodNumber: string): boolean {
    return !!goodNumber && this.formatGoodNumber.test(goodNumber.toUpperCase());
  }

  checkNetPrices(fobNet: string, exWorksNet: string, ddpsGrossNet: string): boolean {

    let isValid: boolean = false;
    const arr: any[] = [];
    arr.push(fobNet, exWorksNet, ddpsGrossNet);

    arr.forEach(item => {
      if (item && this.formatNumberAndCommaOnly.test(item)) {
        isValid = true;
      }
    });
    return isValid;
  }


  checkVATRate(vatRate: string): boolean {

    const vatNum = +vatRate.replace('%', '').replace(',', '.');

    return !!vatRate && vatNum === 5.5 ||
      vatNum === 20 ||
      vatNum === 19.6;
  }

  checkShipmentTime(shipmentTime: string): boolean {

    return shipmentTime ? this.formatNumberOnly.test(shipmentTime) : !shipmentTime;
  }

  checkValidityDatePrice(dateValidity: string, required: boolean): boolean {

    // console.log('dateValidity', dateValidity);

    if (dateValidity || dateValidity !== '') {
      const date = new Date(dateValidity);
      const currentDate = new Date();
      return new Date(currentDate) <= date;
    }
    return !required;
  }

  checkPlaceOfDeparture(place: string): boolean {
    return this.formatLettersAndSpaces.test(place);
  }

  checkOuterColisage(outerColisage: string): boolean {

    // console.log('outerCol', outerColisage);

    return outerColisage ? this.formatDimensions.test(outerColisage) || this.formatDimensionsX.test(outerColisage)
      : !!outerColisage;
  }

  checkDimensions(dimension: string): boolean {
    // console.log('dimension', dimension);
    return dimension ? this.formatDimensions.test(dimension) || this.formatDimensionsX.test(dimension)
      || this.formatDimensionsSpaceX.test(dimension)
      || this.formatDimensionsSpacex.test(dimension)
      : !dimension;
  }

  checkNumbersAndComasOnly(num: string): boolean {
    // console.log('num', num);
    return num ? this.formatNumberAndCommaOnly.test(num) ||
      this.formatNumbersWithoutSpecialCharactersButDot.test(num) : !num;
  }

  checkNumbersOnly(num: string, required: boolean): boolean {
    return required && num ? this.formatNumberOnly.test(num) : (num ? this.formatNumberOnly.test(num) : !required)
  }

  checkAboveZero(num: string): boolean {
    return num && +num > 0;
  }

  checkWeight(weight: string): boolean {
    return !!+weight;
  }

  checkCountryName(countryName: string): boolean {

    return !!countryName && !!this.countryService.getCurrentCountries().find(
      x => this.normalizeLatinize(x.countryNameFr) === this.normalizeLatinize(countryName));
  }

  checkCountryCode(countryCode: string): boolean {
    return !!countryCode && !!this.countryService.getCurrentCountries().find(
      x => x.countryCode.toLowerCase() === countryCode.toLowerCase());
  }

  checkAccusId(accusId: string): boolean {
    // console.log('this.accusService.getCurrentAccu(', this.accusService.getCurrentAccu());
    return !!this.accusService.getCurrentAccu().find(
      x => x.id === +accusId) || !accusId;
  }

  checkBatteryId(batteryId: string): boolean {
    return !!this.batteryService.getCurrentBatteries().find(
      x => x.id === +batteryId) || !batteryId;
  }

  checkBattery4Epse(battery: string): boolean {
    return !!this.batteryService.getCurrentBatteries().find(
      x => x.ref === battery) || !battery;
  }

  checkAccu4Epse(accus: string): boolean {

    return !!this.accusService.getCurrentAccu().find(
      x => x.ref.toLowerCase() === accus.toLowerCase()) || !accus;
  }

  checkCurrency(currency: string): boolean {
    console.log('currency', currency);
    return !!currency && !!this.currencyService.getCurrentCurrencies().find(
      x => x.name.toLowerCase() === currency.toLowerCase()) || currency.toLowerCase() === 'euro';
  }

  checkDate(date: string, isFrench: boolean): boolean {
    return !!date && this.formatDateUS.test(date);
  }

  checkLanguage(language: string): boolean {

    return language || language === undefined ? !!this.languageService.getCurrentLanguages().find(
      x => x.name.toLowerCase() === language.toLowerCase() || x.frenchName.toLowerCase()
        === language.toLowerCase()) : true;
  }

  checkProductLanguage(language: string): boolean {
    return !language ? true : !!this.languageService.getCurrentLanguages()
      .filter(x =>
        x.frenchName.toLowerCase() !== 'Français-Italien'.toLowerCase()
        && x.frenchName.toLowerCase() !== 'Français-Anglais'.toLowerCase()
        && x.frenchName.toLowerCase() !== 'Multi-Langue'.toLowerCase()
        && x.name.toLowerCase() !== 'French-Italian'.toLowerCase()
        && x.name.toLowerCase() !== 'French-English'.toLowerCase()
        && x.name.toLowerCase() !== 'Multi-Language'.toLowerCase(),
      ).find(
        x => x.name.toLowerCase() === language.toLowerCase() || x.frenchName.toLowerCase() === language.toLowerCase());
  }

  checkOutCartonCBM(values): boolean {
    const cbm = values.split('x');
    return !!values
      && this.formatNumbersWithoutSpecialCharactersButDot.test(cbm[0].replace(',', '.'))
      && this.formatNumbersWithoutSpecialCharactersButDot.test(cbm[1].replace(',', '.'))
      && this.formatNumbersWithoutSpecialCharactersButDot.test(cbm[1].replace(',', '.'))
  }

  checkGender(value): boolean {
    const genderArr = [
      'f', 'm', 'x', 'g',
    ];

    return value ? !!genderArr.find(x => x === value.toLowerCase()) : !value;
  }

  normalizeLatinize(value: string): string {
    return value.normalize('NFD').replace(this.formatu0300, '').toLowerCase();
  }

}
