import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url_host: any = environment.apiUrl;
  url_report: any = environment.reportsUrl;
  code_report: any = environment.codigoApiReports;
  urlGetEmbedReport: string = '';
  urlRegisterUseReport: any = '';
  data_headers_request: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }


  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetEmbedReport(guid_user, groupid, reportid): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetEmbedReport = '/api/PowerBI/EmbedReport?groupid=' + groupid + '&reportid=' + reportid;
    return this.http.get(this.utility.fnGetHost() + this.urlGetEmbedReport,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpRegisterUseReport(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    // const object_params = object_user;
    this.urlRegisterUseReport = '/api/RegistrosUsosReporte?code=' + this.code_report;
    return this.http.post(this.url_report + this.urlRegisterUseReport, {},
    {
      // params: object_params,
      observe: 'response',
      // headers: headers,
      reportProgress: true,
    });
  }

}
