import {User} from "../users/user";

export interface Serializer {
  fromJson(json: any): User;
  toJson(resource: User): any;
}
