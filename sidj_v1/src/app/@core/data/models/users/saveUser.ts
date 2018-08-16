import {Role} from "../shared/role";
import {BaseEntity} from "../shared/baseEntity";
import {Contact} from "../shared/contact";

export class SaveUser extends BaseEntity {
  id: number;
  mail: string;
  lastName: string;
  firstName: string;
  password: string;
  roles: string[];
  contact: Contact

}
