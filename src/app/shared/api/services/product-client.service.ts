import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductClientService {

  url_host: any = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fnHttpGetListProductClient(obj_data): Observable<any> {
    // const obj_data = {'take': 100, 'skip': 0, 'page': 1, 'pageSize': 100};
    const url_api = 'PerceivedValue/GetClientProductsInformationTest';
    return this.http.get(this.url_host + url_api + '?' + JSON.stringify(obj_data));
  }
}
