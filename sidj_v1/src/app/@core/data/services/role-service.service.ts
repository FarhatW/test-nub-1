import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HelperService} from "../../utils/Helper.service";
import {environment} from "../../../../environments/environment";
import {EnumTranslation} from "../models/enums/enumTranslation";
import {Role} from "../models/shared/role";

@Injectable()
export class RoleServiceService {

  constructor(private  http: HttpClient) {}
  url = environment.apiUrl;
  private readonly rolesEndPoint = this.url + 'roles/';

  getById(id) {
    return this.http.get<Role>(this.rolesEndPoint + '/' + id);
  }

  getAll() {
    return this.http.get<Role[]>(this.rolesEndPoint);
  }
}
