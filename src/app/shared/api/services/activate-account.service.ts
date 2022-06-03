import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateAccountService {
  url_host: any = environment.apiUrl;
  urlSetActivateAccountUser: String = '';
  data_headers_request: any = '';
  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpSetActivateAccountUser(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetActivateAccountUser = '/api/Auth/ActivateAccount';
    return this.http.post(this.utility.fnGetHost() + this.urlSetActivateAccountUser, {},
      {
        observe: 'response',
        headers: headers,
      });
  }
}
