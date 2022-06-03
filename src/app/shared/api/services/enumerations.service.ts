import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EnumerationsService {

  data_headers_request: any = '';
  urlGetOriginQualificationListStates: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService, public router: Router) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetOriginQualificationListStates(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetOriginQualificationListStates = '/api/CalificacionOrigen/Estados';
    return this.http.get(this.utility.fnGetHost() + this.urlGetOriginQualificationListStates,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
