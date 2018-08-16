import {Good} from "../good";
import {Supplier} from "../../users/suppliers/supplier";

export class SidjGood extends Good {
  supplierId: number;
  fobGrossPrice: number;
  fobNetPrice: number;
  ddpGrossPrice: number;
  ddpNetPrice: number;
  exWorksGrossPrice: number;
  exWorksNetPrice: number;
  paymentTerms: string;
  departurePlace: string;
  minimumQuantity: number;
  itemsQuantity20: number;
  itemsQuantity40: number;
  outCartonCbm: number;
  colisageGrossWeight: number;
  colisageNetWeight: number;
  outerCartonDimension: string;
  functionTryMe: boolean;
  picture: string;
  imageFrom: string;
}
