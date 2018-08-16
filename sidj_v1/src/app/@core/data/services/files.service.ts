import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IDTONode} from '../models/files/DTONode';
import {environment} from '../../../../environments/environment';

@Injectable()
  export class FilesService {
    // headers: Headers = new Headers()
    private options = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json', responseType: 'text' as 'text' }),
    };
    url = environment.apiUrl;
    public readonly goodPicture = environment.apiPicture;
    private readonly filesEndPoint = this.url + 'files/';
    public readonly uploadsEndPoint = this.filesEndPoint + 'upload';
    public readonly uploadWithGoodsNumber = this.filesEndPoint + 'uploadWithGoodsNumber';
    private readonly foldersEndPoint = this.url + 'folders/';

    constructor(private http: HttpClient) {
      this.options.headers.append('Access-Control-Allow-Origin', '*');
  }

  getFiles(): Observable<IDTONode> {
    return this.http.get<IDTONode>(this.filesEndPoint + 'GetFiles/')
  }

  getFolders(): Observable<IDTONode> {
    return this.http.get<IDTONode>(this.foldersEndPoint + 'GetSystemFolders/');
  }

  createFolder(paramFolder: string): Observable<void> {
    return this.http.post<void>(this.foldersEndPoint, paramFolder,  this.options);
  }

  deleteFilesAndFolders(paramNode: IDTONode): Observable<void> {
    return this.http.post<void>(this.filesEndPoint, JSON.stringify(paramNode), this.options);
  }

  getImageJPG(showImage: string, userId: number): Observable<Blob> {
  const url = this.goodPicture + userId + '/' + showImage;
  return this.http.get<Blob>( url, {headers: {'Content-type': 'application/json', responseType: 'blob' as 'json' }});
  }
}
