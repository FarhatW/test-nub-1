import {SaveUser} from "../saveUser";
import {Contact} from "../../shared/contact";

export interface SaveSupplier  extends SaveUser {
  tva: string,
  photo: string,
  agentId: number;
  isConfirmedAccount: boolean;

}

