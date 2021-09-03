import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  url_host: any = environment.apiUrl;
  urlSetDataCompanies: String = '';
  urlGetDataCompanies: String = '';
  urlGetDataCompaniesbyIDCompani: String = '';
  data_headers_request: any = '';
  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpSetCompanies(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDataCompanies = '/api/Companies/PostCompany';
    return this.http.post(this.utility.fnGetHost() + this.urlSetDataCompanies, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetUpdateCompanies(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDataCompanies = '/api/Companies/PutCompany';
    return this.http.put(this.utility.fnGetHost() + this.urlSetDataCompanies, data_object,
      {
        observe: 'response',
        headers: headers,
      });
  }

  fnHttpGetCompanies(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataCompanies = '/api/Companies/GetCompanies';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataCompanies,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpGetCompaniesbyIDCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataCompaniesbyIDCompani = '/api/Companies/GetCompany?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataCompaniesbyIDCompani,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
