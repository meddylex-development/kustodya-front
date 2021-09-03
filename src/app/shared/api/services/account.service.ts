import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlSetActivateAccountUser: String = '';
  urlForgotPasswordRequest: String = '';
  urlSetUpdatePasswordUser: String = '';
  urlSetUpdatePasswordUserByToken: String = '';
  private http: HttpClient;
  constructor(private handler: HttpBackend, private utility: UtilitiesService) { 
    this.http = new HttpClient(handler);
  }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnForgotPasswordRequest(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // this.urlForgotPasswordRequest = '/api/Account/ForgotPasswordRequest';
    this.urlForgotPasswordRequest = '/api/PasswordRecovery/Post';
    return this.http.post(this.utility.fnGetHost() + this.urlForgotPasswordRequest, email,
      {
        observe: 'response',
        headers: headers
      });
  }

  fnHttpSetUpdatePasswordUser(newPasswordHash): Observable<any> {
    this.urlSetUpdatePasswordUser = '/api/Account/ChangePassword?newPasswordHash=' + newPasswordHash;
    return this.http.post(this.utility.fnGetHost() + this.urlSetUpdatePasswordUser,{},
      {
        observe: 'response',
      });
  }

  fnHttpSetUpdatePasswordUserByToken(newPasswordHash, guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetUpdatePasswordUserByToken = '/api/Account/ChangePassword?newPasswordHash=' + newPasswordHash;
    return this.http.post(this.utility.fnGetHost() + this.urlSetUpdatePasswordUserByToken,{},
      {
        observe: 'response',
        headers: headers,
      });
  }

  fnHttpSetActivateAccountUser(guid_user): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetActivateAccountUser = '/api/Account/ValidacionToken';
    return this.http.post(this.utility.fnGetHost() + this.urlSetActivateAccountUser, {},
      {
        observe: 'response',
        headers: headers,
      });
  }
}
