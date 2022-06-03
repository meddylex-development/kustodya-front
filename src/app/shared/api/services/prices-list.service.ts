import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PricesListService {

  url_host: any = environment.apiUrl;
  urlGetAllPricesListByVersion: String = '';
  urlSetCreateNewPricesList: String = '';
  urlSetEditDataPricesList: String = '';
  urlDeletePricesList: String = '';
  urlDeleteAllPricesList: String = '';
  urlfnGetExportPricesListByVersion: String = '';
  data_headers_request: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }


  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnGetAllPricesListByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetAllPricesListByVersion = '/api/PriceLists/GetPriceLists?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllPricesListByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnSetCreateNewPricesList(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetCreateNewPricesList = '/api/PriceLists/PostPriceLists';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewPricesList, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataPricesList(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataPricesList = '/api/PriceLists/PutPriceLists';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataPricesList, data_object,
      {
        observe: 'response',
        headers: headers,
      });
  }

  fnDeletePricesList(guid_user, iIDPriceList): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeletePricesList = '/api/PriceLists/DeletePriceLists?iIDPriceList=' + iIDPriceList;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeletePricesList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnDeleteAllPricesList(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeleteAllPricesList = '/api/PriceLists/DeleteAllPriceLists?iIDVersion=' + id_version;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteAllPricesList,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
