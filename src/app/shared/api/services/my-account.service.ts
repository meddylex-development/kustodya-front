import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  url_host: any = environment.apiUrl;
  urlSetUpdateMyAccountDataUser: String = '';
  urlGetDataPersonalInfoUser: String = '';
  urlSetUpdatePasswordUser: String = '';
  data_headers_request: any = '';

  dataChangeMyAccount: Observable<any>;
  dataChangeObserverMyAccount: any;
  dataMyAccount: any;

  constructor(
    public http: HttpClient,
    private utility: UtilitiesService,
  ) {
    this.dataChangeMyAccount = new Observable((observer: Observer<any>) => {
      this.dataChangeObserverMyAccount = observer;
    });
  }

  showMyAccount(data: any) {
    this.dataMyAccount = data;
    this.dataChangeObserverMyAccount.next(this.dataMyAccount);
  }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetPersonalIformation(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataPersonalInfoUser = '/api/User/MyAccount';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataPersonalInfoUser ,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetUpdateMyAccountDataUser(data_object): Observable<any> {
    this.urlSetUpdateMyAccountDataUser = '/api/User/UpdateMyAccount';
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdateMyAccountDataUser, data_object,
      {
        observe: 'response',
        headers: this.data_headers_request,
      });
  }

  fnHttpSetUpdatePasswordUser(data_object): Observable<any> {
    this.urlSetUpdatePasswordUser = '/api/User/UpdatePasswordMyAccount';
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdatePasswordUser, data_object,
      {
        observe: 'response',
        headers: this.data_headers_request,
      });
  }

}
