import {Good} from "./good";
import {SidjGood} from "./sidjGood/sidjGood";

export class GoodList {
  products: SidjGood[];
  addedProductCount: number;
  notAddedProductCount: number;
  duplicatedRefList: string[];
  invalidGencodsList: string[];
  existingGencodsList: string [];
}
