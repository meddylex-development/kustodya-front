import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllVersionsCompany: string = '';
  urlGetDataAllVersionsProject: string = '';
  urlGetDataVersionDefaultByProject: string = '';
  urlSetDataNewVersion: string = '';
  urlSetVersionDefault: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllVersionsCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllVersionsCompany = '/api/Versions/GetVersionsCompany?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllVersionsCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetAllVersionsProject(guid_user, id_project): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllVersionsProject = '/api/Versions/GetVersionsProject?iIDProject=' + id_project;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllVersionsProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetVersionDefaultByProject(guid_user, id_project): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataVersionDefaultByProject = '/api/Versions/GetVersionDefaultByProject?iIDProject=' + id_project;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataVersionDefaultByProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveNewVersion(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDataNewVersion = '/api/Versions/PostVersion';
    return this.http.post(this.utility.fnGetHost() + this.urlSetDataNewVersion, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetVersionDefault(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetVersionDefault = '/api/Versions/SetVersionDefault?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlSetVersionDefault,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
