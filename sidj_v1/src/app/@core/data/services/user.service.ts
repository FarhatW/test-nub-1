import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Supplier} from '../models/users/suppliers/supplier';
import {SidjData} from '../models/shared/SidjData';
import {environment} from '../../../../environments/environment';
import {ResetPasswordResource} from "../models/password/ResetPasswordResource";
import {SaveSupplier} from "../models/users/suppliers/saveSupplier";
import {User} from "../models/users/user";
import {SaveAgent} from "../models/users/agents/saveAgent";
import {Agent} from "../models/users/agents/agent";
import {BaseEntity} from "../models/shared/baseEntity";
import {Accu} from "../models/accus/accu";
import {UserToken} from "../models/users/userToken";
import {BehaviorSubject, Observable} from "@angular/cli/node_modules/rxjs";
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from "../../utils/Helper.service";
import {AuthenticationService} from './authenticationService';
import {SavePerson} from "../models/users/person/savePerson";
import {Person} from "../models/users/person/person";


@Injectable()
export class UserService {

  private readonly usersEndpoint = environment.apiUrl + 'users';
  private readonly suppliersEndPoint = this.usersEndpoint + '/suppliers';
  private readonly agentsEndPoint = this.usersEndpoint + '/agents';


  userToken: UserToken;
  supplier: Supplier;
  test: string;

  constructor(private http: HttpClient,
              private localeStorage: LocalStorageService,
              private authenticationService: AuthenticationService,
              private helperService: HelperService) {
  }

  private currentUser = new BehaviorSubject<UserToken>(this.userToken);
  private selectedSupplier = new BehaviorSubject<Supplier>(this.supplier);

  setCurrentSupplier(supplier: Supplier) {
    this.selectedSupplier.next(supplier);
  }
  getCurrentSupplier(): Supplier {
    return this.selectedSupplier.getValue();
  }
  setCurrentUser(userToken: UserToken) {
    this.currentUser.next(userToken);
  }
  getCurrentUser(): UserToken {
    return this.currentUser.getValue();
  }

  getCurrentUserTokenObs(): Observable<UserToken> {
    return this.currentUser.asObservable();
  }

 getSetUser(): Observable<UserToken> {
    if (!this.getCurrentUser()) {
      const user = this.helperService.getDecodedAccessToken(this.localeStorage.get('Token'));
      user ? this.setCurrentUser(user) : this.authenticationService.logout();
    }
    return this.getCurrentUserTokenObs();
}

  // SUPPLIERS

  createSupplier(supplier: SaveSupplier) {
    return this.http.post<Supplier>(this.suppliersEndPoint, supplier);
  }

  updateSupplier(supplier: SaveSupplier) {
    return this.http.put<Supplier>(this.suppliersEndPoint + '/' + supplier.id, supplier);
  }
  // PERSON
  createPerson(person: SavePerson) {
    return this.http.post<Person>(this.suppliersEndPoint, person);
  }
  updatePerson(person: SavePerson) {
    return this.http.put<Person>(this.suppliersEndPoint + '/' + person.id, person);
  }

  // AGENTS

  createAgent(saveAgent: SaveAgent) {
    return this.http.post<Agent>(this.agentsEndPoint, saveAgent);
  }

  updateAgent(saveAgent: SaveAgent) {
    console.log('saveagent', saveAgent);
    return this.http.put<Agent>(this.agentsEndPoint + '/' + saveAgent.id, saveAgent);
  }

  // USERS

  getUser(id) {
    return this.http.get<User>(this.usersEndpoint + '/' + id)
  }

  checkHighestRank(intArr: number[]): number {
    let highest = 10;
    let i = 0;

    for (i; i >= highest; i++) {
      if (intArr[i] < highest) {
        highest = intArr[i]
      }
    }
    return highest;
  }

  delete(id) {
    return this.http.delete<User>(this.usersEndpoint + '/' + id);
  }

  getAll(filter) {
    return this.http.get<SidjData<BaseEntity>>(this.usersEndpoint + '?' + this.toQueryString(filter))
      .map((data: SidjData<any>) => {
        data.items.forEach(item => {
          const index = data.items.indexOf(item);

          switch (item.userType.toLowerCase()) {
            case 'supplier': {
              data.items.splice(index, 1, item as Supplier);
              break;
            }
            case 'agent': {
              data.items.splice(index, 1, item as Agent);
              break;
            }
            default: {
              item as User;
              break;
            }
          }
        });

        return data;
      });
  }

  resetPassword(data: ResetPasswordResource) {
    return this.http.post<Supplier>(this.usersEndpoint + '/resetPassword', data);
  }

  toQueryString(obj) {
    const parts = [''];
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }
}
