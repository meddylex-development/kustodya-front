import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailManagementService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';

  urlGetDataUsersManagement: any = '';
  urlSetSaveNewUserManagement: any = '';
  urlSetEditDataUserManagement: any = '';
  urlSetDeleteDataUserManagement: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetDataUsersManagement(guid_user, id_data): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataUsersManagement = '/api/configuracion/Notificaciones/' + id_data;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataUsersManagement,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveNewUserManagement(guid_user, id_ips, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetSaveNewUserManagement = '/api/configuracion/Notificaciones/' + id_ips;
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveNewUserManagement, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataUserManagement(guid_user, id_ips, id_notificacion, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataUserManagement = '/api/configuracion/Notificaciones/' + id_ips + '/' + id_notificacion;
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataUserManagement, data_object,
      {
        // params: data_object,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteDataUserManagement(guid_user, id_usuario, id_notificacion): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteDataUserManagement = '/api/configuracion/Notificaciones/' + id_usuario + '/' + id_notificacion;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteDataUserManagement,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
