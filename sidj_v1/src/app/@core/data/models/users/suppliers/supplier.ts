import {User} from "../user";
import {Contact} from "../../shared/contact";
import {Role} from "../../shared/role";
import {Agent} from "../agents/agent";

export class Supplier extends User {

  tva: string;
  photo: string;
  agentId: number;
  isConfirmedAccount: boolean;

}
