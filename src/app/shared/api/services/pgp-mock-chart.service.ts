import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PgpMockChartService {
  constructor(private http: HttpClient) { }

  // fnHttpGetDataMock() {
  //   this.http
  //     .get('../mock/mockdata_chart_scatter_REGRESION_LINEAL.json')
  //     .map(data => data.json())
  //     .subscribe(data => {
  //       this.items = data;
  //     });
  // }

  // fnHttpGetDataMock(): Observable<any> {
  //   const url_api = '../mock/mockdata_chart_scatter_REGRESION_LINEAL.json';
  //   return this.http.get(url_api);
  // }

  fnHttpGetDataMock(): Observable<any> {
    return this.http.get('./assets/pgp-mocks/mockdata_chart_scatter_REGRESION_LINEAL.json');
  }

  // getUsers(): Observable<any> {
  //   return observableOf(this.users);
  // }
}
