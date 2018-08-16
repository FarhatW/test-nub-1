import {User} from "../user";
import {Supplier} from "../suppliers/supplier";
import {Role} from "../../shared/role";

export class Agent extends User {
  suppliers: Supplier[];

}
