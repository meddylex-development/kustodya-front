import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculationSummaryService {

  url_host: any = environment.apiUrl;
  urlGetAllPriceCalculationSummaryByVersion: String = '';
  urlGetFiltersPriceCalculationSummary: String = '';
  data_headers_request: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }


  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllPriceCalculationSummaryByVersion(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    // this.urlGetAllPriceCalculationSummaryByVersion = '/api/PriceLists/GetPriceLists?iIDVersion=' + id_version;
    this.urlGetAllPriceCalculationSummaryByVersion = '/api/PriceCalculationSummary/GetPriceCalculationSummary?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetAllPriceCalculationSummaryByVersion, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetFiltersPriceCalculationSummary(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetFiltersPriceCalculationSummary = '/api/PriceCalculationSummary/GetFiltersPriceCalculationSummary?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetFiltersPriceCalculationSummary,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
