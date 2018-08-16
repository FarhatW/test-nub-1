import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Supplier} from "../models/users/suppliers/supplier";
import {environment} from "../../../../environments/environment";
import {Photo} from "../models/users/Photo";
import {SaveSidjGood} from "../models/goods/sidjGood/saveSidjGood";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PhotoService {

  private readonly usersEndpoint = environment.apiUrl + 'users';
  photo: Photo;
  private currentPhoto = new BehaviorSubject<Photo>(this.photo);

  constructor(private http: HttpClient) {
    }

  setCurrentProfilePhoto(photo: Photo) {
    this.currentPhoto.next(photo);
  }

  getCurrentProfilePhoto(): Observable<Photo> {
    return this.currentPhoto.asObservable();
  }

  upload(userId, photo) {
    const formData = new  FormData();
    formData.append('file', photo)
    return this.http.post<Photo>(this.usersEndpoint + '/' + userId + '/photos', formData);
  }

  getPhoto(userId){
    console.log('userId', userId)
    return this.http.get<Photo>(this.usersEndpoint + '/' + userId + '/photos');
  }
}
