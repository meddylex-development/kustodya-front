import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingProductTypeService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllRatingProductType: any = '';
  urlGetFiltersRatingProductType: any = '';
  urlGetDataListCompetitorsByProject: any = '';
  urlSetEditDataRatingProductTypes: any = '';
  urlSetRestoreRatingProductType: any = '';
  urlSetRestoreALLRatingProductType: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnHttpGetAllRatingProductType(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllRatingProductType = '/api/RatingProductType/GetRatingProductTypes?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetDataAllRatingProductType, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetFiltersRatingProductType(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetFiltersRatingProductType = '/api/RatingProductTypes/GetFiltersRatingProductTypes?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetFiltersRatingProductType,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDataListCompetitorsByProduct(guid_user, id_product): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataListCompetitorsByProject = '/api/RatingProductTypes/GetListCompetitorsForProduct?iIDProduct=' + id_product;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListCompetitorsByProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataRatingProductTypes(guid_user, obj_form_market): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataRatingProductTypes = '/api/RatingProductType/PutRatingProductTypes';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataRatingProductTypes, obj_form_market,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetRestoreRatingProductTypesById(guid_user, iIDProduct): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestoreRatingProductType = '/api/RatingProductType/PutRestoreRatingProductTypes?iIDProduct=' + iIDProduct;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestoreRatingProductType, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpSetRestoreALLRatingProductTypesById(guid_user, iIDVersion): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRestoreALLRatingProductType = '/api/RatingProductType/PutRestoreAllRatingProductTypes?iIDVersion=' + iIDVersion;
    return this.http.put(this.utility.fnGetHost() + this.urlSetRestoreALLRatingProductType, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
