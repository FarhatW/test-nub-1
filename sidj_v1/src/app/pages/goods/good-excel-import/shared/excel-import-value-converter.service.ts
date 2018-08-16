import {Injectable} from '@angular/core';
import {CountryService} from '../../../../@core/data/services/country.service';
import {LanguageService} from '../../../../@core/data/services/language.service';
import {GenderService} from '../../../../@core/data/services/gender.service';

@Injectable()
export class ExcelImportValueConverterService {

  formatu0300 = /[\u0300-\u036f]/g;


  constructor(private countryService: CountryService,
              private sexeService: GenderService,
              private languageService: LanguageService) {
  }


  booleanValueConverter(val: string): boolean {
    if (val) {
      return val.toLowerCase() === 'o' || val.toLowerCase() === 'y';
    }
    return false;
  }

  ageValueConverter(age: number, type: string): number {
    return type === 'ans' || type === 'years' ? age * 12 : age;
  }

  vatRateValueConverter(vatRate: string): number {
    return +vatRate.substring(0, vatRate.length - 1);
  }

  continentValueConverter(countryName: string): string {
    const country = this.countryService.getCurrentCountries() && !!this.countryService.getCurrentCountries().find(
      x => x.countryCode.toLowerCase() === countryName.toLowerCase()).continentCode;

    return country ? this.countryService.getCurrentCountries().find(
      x => x.countryCode.toLowerCase() === countryName.toLowerCase()).continentCode : 'Europe';
  }

  outCartonCBMValueConverter(values): number {
    if (values) {
      const val = values.toLowerCase();
      const cbm = val.split('x');
      return (+cbm[0].replace(',', '.') * +cbm[1].replace(',', '.')
        * +cbm[2].replace(',', '.'))
        / 1000000;
    }
    return 0;
  }


  toUpperConverter(value: string): string {
    return value ? value.toUpperCase() : '';
  }

  convertEpseGrossPrice(value: string): string {
    console.log('dsds', value.replace(/[^a-zA-Z0-9. ]/g, ''));
    return value.replace(/[^a-zA-Z0-9. ]/g, '');
  }

  languageConverter(value): string {
    console.log('value', value);
    return value ? this.languageService.getCurrentLanguages()
      .find(x => x.name.toLowerCase() === value.toLowerCase() ||
        x.frenchName.toLowerCase() === value.toLowerCase()).name : null;
  }

  genderValueConverter(value): string {

    switch (value) {
      case 'f': {
        return this.sexeService.getCurrentGenders().find(x => x.id === 1).name;
      }
      case 'm' || 'g' : {
        return this.sexeService.getCurrentGenders().find(x => x.id === 2).name;
      }
      case 'x': {
        return this.sexeService.getCurrentGenders().find(x => x.id === 3).name;
      }
    }
  }

  normalizeLatinize(value: string): string {
    return value.normalize('NFD').replace(this.formatu0300, '').toLowerCase();
  }
}
