import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElasticityProductService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllElasticityProduct: any = '';
  urlSetEditDataElasticityProduct: any = '';
  urlSetRestoreElasticityProduct: any = '';
  urlSetRestoreALLElasticityProduct: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnHttpGetAllElasticityProduct(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllElasticityProduct = '/api/ElasticityProduct/GetElasticityProducts?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetDataAllElasticityProduct, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataElasticityProduct(guid_user, obj_form_market): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataElasticityProduct = '/api/ElasticityProduct/PutElasticityProduct';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataElasticityProduct, obj_form_market,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetRestoreElasticityProductById(guid_user, iIDProduct): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestoreElasticityProduct = '/api/ElasticityProduct/PutRestoreElasticityProduct?iIDProduct=' + iIDProduct;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestoreElasticityProduct, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpSetRestoreALLElasticityProductById(guid_user, iIDVersion): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestoreALLElasticityProduct = '/api/ElasticityProduct/PutRestoreAllElasticityProducts?iIDVersion=' + iIDVersion;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestoreALLElasticityProduct, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
