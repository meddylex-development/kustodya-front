import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketPriceService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllMarketPrice: any = '';
  urlGetFiltersMarketPrice: any = '';
  urlGetDataListCompetitorsByProject: any = '';
  urlSetEditDataMarketPrices: any = '';
  urlSetDeleteMarketPrices: any = '';
  urlSetDeleteAllMarketPrices: any = '';


  urlSetDataNewCategory: any = '';
  urlSetDeleteRatingValuePerceivedById: any = '';
  urlSetDeleteAllRatingsValuePerceived: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnHttpGetAllMarketPrice(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllMarketPrice = '/api/MarketPrices/GetMarketPrices?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetDataAllMarketPrice, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetFiltersMarketPrice(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetFiltersMarketPrice = '/api/MarketPrices/GetFiltersMarketPrices?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetFiltersMarketPrice,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDataListCompetitorsByProduct(guid_user, id_product): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataListCompetitorsByProject = '/api/MarketPrices/GetListCompetitorsForProduct?iIDProduct=' + id_product;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListCompetitorsByProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataMarketPrices(guid_user, obj_form_market): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataMarketPrices = '/api/MarketPrices/PutMarketPrices';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataMarketPrices, obj_form_market,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpSetDeleteMarketPriceById(guid_user, iIDMarketPrice): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteMarketPrices = '/api/MarketPrices/PutCleanMarketPrices?iIDMarketPrice=' + iIDMarketPrice;
    return this.http.put(this.utility.fnGetHost() + this.urlSetDeleteMarketPrices, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpSetDeleteAllMarketPriceById(guid_user, iIDVersion): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteAllMarketPrices = '/api/MarketPrices/PutCleanAllMarketPrices?iIDVersion=' + iIDVersion;
    return this.http.put(this.utility.fnGetHost() + this.urlSetDeleteAllMarketPrices, {},
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
