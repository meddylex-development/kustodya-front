import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetAllDataConfigByVersion: string = '';
  urlGetProductTypesVersion: string = '';
  urlGetCurrencies: string = '';
  urlGetListProductTypesVersion: string = '';
  urlSetEditDataConfigVersion: string = '';

  // urlGetDataAllProjectsByCompany: string = '';
  // urlSetDataNewProject: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllDataConfigByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetAllDataConfigByVersion = '/api/Config/GetConfigByVersion?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllDataConfigByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetProductTypesVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetProductTypesVersion = '/api/Config/GetProductTypesVersion?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetProductTypesVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetCurrencies(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetCurrencies = '/api/Config/GetCurrencies?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetCurrencies,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListProductTypesVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetListProductTypesVersion = '/api/Config/GetListProductTypesVersion?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetListProductTypesVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataConfigVersion(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataConfigVersion = '/api/Config/PutConfig';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataConfigVersion, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
