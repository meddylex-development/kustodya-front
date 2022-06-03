import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceRelationshipsService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllPriceRelationships: any = '';
  urlSetEditDataPriceRelationships: any = '';
  urlSetRestorePriceRelationships: any = '';
  urlSetRestoreALLPriceRelationships: any = '';
  

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnHttpGetAllPriceRelationships(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllPriceRelationships = '/api/PriceRelationships/GetPriceRelationships?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetDataAllPriceRelationships, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
 

  fnHttpSetEditDataPriceRelationships(guid_user, obj_form_prices_relationships): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataPriceRelationships = '/api/PriceRelationships/PutPriceRelationships';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataPriceRelationships, obj_form_prices_relationships,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });  }

  fnHttpSetRestorePriceRelationshipsById(guid_user, iIDProduct): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestorePriceRelationships = '/api/PriceRelationships/PutRestorePriceRelationships?iIDProduct=' + iIDProduct;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestorePriceRelationships, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpSetRestoreALLPriceRelationshipsById(guid_user, iIDVersion): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestoreALLPriceRelationships = '/api/PriceRelationships/PutRestoreAllPriceRelationships?iIDVersion=' + iIDVersion;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestoreALLPriceRelationships, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
