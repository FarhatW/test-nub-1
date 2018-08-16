import {Role} from "../shared/role";
import {BaseEntity} from "../shared/baseEntity";
import {Contact} from "../shared/contact";

export class User extends BaseEntity {

  id: number;
  lastName: string;
  firstName: string;
  mail: string;
  roles: Role[];

  token: string;
  userType: string;
  contact: Contact;

}
