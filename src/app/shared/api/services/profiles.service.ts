import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetListProfiles: any = '';
  urlGetInfoProfileById: any = '';
  urlPostProfile: any = '';
  urlPutProfile: any = '';
  urlDeleteProfile: any = '';

  constructor(private http: HttpClient, private utility: UtilitiesService,) { }
  
  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListProfiles(guid_user, nombre, pagina): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'nombre': nombre,
      'pagina': (pagina) ? pagina : 1,
    };
    this.urlGetListProfiles = '/api/Perfiles';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListProfiles,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetInfoProfileById(guid_user, profile_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetInfoProfileById = '/api/Perfiles/' + profile_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetInfoProfileById,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpPostProfile(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPostProfile = '/api/Perfiles';
    return this.http.post(this.utility.fnGetHost() + this.urlPostProfile, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpUpdateProfile(guid_user, data_object, profile_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutProfile = '/api/Perfiles/' + profile_id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutProfile, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpDeleteProfile(guid_user, profile_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteProfile = '/api/Perfiles/' + profile_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteProfile,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
