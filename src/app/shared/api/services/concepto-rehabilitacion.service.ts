import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConceptoRehabilitacionService {

  data_headers_request: any = '';
  url_host: any = environment.apiUrl;
  urlGetListPatients: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListPatients(guid_user, current_page, search_input, state): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);

    let objectParams = {
      'pagina': (current_page) ? current_page : 1,
      'estado': (state) ? state : 1,
    };
    if (search_input) {
      objectParams['busqueda'] = search_input;
    }

    this.urlGetListPatients = '/api/K2ConceptoRehabilitacion/PendientesConceptoRehabilitacion';
    
    return this.http.get(this.utility.fnGetHost() + this.urlGetListPatients,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
