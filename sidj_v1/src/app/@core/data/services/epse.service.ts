import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HelperService} from "../../utils/Helper.service";
import {SidjData} from "../models/shared/SidjData";
import {EpseFile} from "../models/epse/epseFile";

@Injectable()
export class EpseService {
  constructor(private  http: HttpClient, private  helperService: HelperService) {}
  url = environment.apiUrl;
  public readonly epseFileEndPoint = this.url + 'epsefiles/';

  getAllEpseFiles(filter) {
    return this.http.get<SidjData<EpseFile>>(this.epseFileEndPoint + '?' + this.helperService.toQueryString(filter));
  }

  getEpseFile(id: number) {}

  deleteEpseFile(id: number) {}

  deleteAllEpseFile() {}

  importEpseFile(file: EpseFile) {
    return this.http.post<EpseFile>(this.epseFileEndPoint, file);
  }
}
