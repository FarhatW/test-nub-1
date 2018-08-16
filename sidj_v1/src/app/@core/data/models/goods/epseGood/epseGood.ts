import {Good} from "../good";

export class EpseGood extends Good {
  epseFileId: number;
  supplier: string;
  brand: string;
  rangeHeroLicense: string;
  isOtherColors: boolean;
  isOtherModels: boolean;
  diameter: number;
  netPrice: number;
  grossPrice: number;
}
