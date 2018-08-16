import {SaveGood} from "../saveGood";

export class SaveEpseGood extends SaveGood {
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
