import {GoodBattery} from '../batteries/goodBattery';
import {GoodAccu} from '../accus/goodAccu';
import {BaseEntity} from '../shared/baseEntity';

export class SaveGood extends BaseEntity {

  id: number;
  reference: string;
  name: string;
  gencod: string;
  customsReference: string;
  description: string;
  currency: string;

  dateOfValidity: string;
  isExclusivityJc: boolean;
  isSpecialBoxJc: boolean;
  availabilityProduct: string;
  outerColisage: number;
  innerColisage: number;

  productDimension: string;
  boxDimension: string;
  colors: string;
  models: string;
  packagingLanguage: string;
  manualLanguage: string;
  productLanguage: string;
  age: number;
  ageType: string;
  productNetWeight: number;
  productGrossWeight: number;
  deeeContribution: string;
  isChargerIncluded: boolean;
  chargerType: string;
  engineType: string;

  continent: string;
  vatRate: number;
  isExclusivitySpecialist: boolean;
  gender: string;
  shipmentTime: number;
  comments: string;
  countryCode: string;
  goodAccus: GoodAccu[];
  goodBatteries: GoodBattery[];
  unknownAccu: string;
  unknownBattery: string;
}
