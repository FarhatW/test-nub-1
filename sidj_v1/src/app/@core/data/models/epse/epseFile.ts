import {EpseGood} from "../goods/epseGood/epseGood";

export class EpseFile {
  constructor(public id: number,
              public name: string,
              public supplierId: number,
              public items: EpseGood[]
  ) {
  }
}
