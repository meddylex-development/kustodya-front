import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  
  constructor(
    private handler: HttpBackend, 
    private utility: UtilitiesService,
    private http: HttpClient,
  ) { 
    this.http = new HttpClient(handler);
  }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetCountries(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let urlGetCountries = '/api/K2Administracion/ConsultarPais';
    return this.http.get(this.utility.fnGetHost() + urlGetCountries,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDeptosCountry(guid_user, id_country): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let urlGetCountries = '/api/K2Administracion/ConsultarDepartamentos?IDPAIS=' + id_country;
    return this.http.get(this.utility.fnGetHost() + urlGetCountries,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetCitiesDepto(guid_user, id_country, id_depto): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let urlGetCountries = '/api/K2Administracion/ConsultarMunicipios?IDPAIS=' + id_country + '&IDDEPTO=' + id_depto;
    return this.http.get(this.utility.fnGetHost() + urlGetCountries,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetPoblationsCity(guid_user, id_country, id_depto, id_sub): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let urlGetPoblationsCity = '/api/K2Administracion/ConsultarPoblacion?IDPAIS=' + id_country + '&IDDEPTO=' + id_depto + '&IDMUNICIPIO=' + id_sub;
    return this.http.get(this.utility.fnGetHost() + urlGetPoblationsCity,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
