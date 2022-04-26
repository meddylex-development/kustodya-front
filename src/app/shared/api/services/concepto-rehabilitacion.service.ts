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
  urlGetDataConcept: string = '';
  urlSetUpdateConcept: string = '';
  urlSetAssignCase: string = '';
  urlSetSaveConceptDiagnostic: string = '';
  urlSetSaveConceptSequels: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListPatients(guid_user, current_page, search_input, state, type_user, id_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);

    let objectParams = {
      'pagina': (current_page) ? current_page : 1,
      'estado': (state) ? state : 1,
    };
    if (search_input) {
      objectParams['busqueda'] = search_input;
    }
    objectParams['tipo'] = type_user;
    objectParams['usuario'] = id_user;

    this.urlGetListPatients = '/api/K2ConceptoRehabilitacion/PendientesConceptoRehabilitacion';
    
    return this.http.get(this.utility.fnGetHost() + this.urlGetListPatients,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataConcept(guid_user, id_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDataConcept = '/api/K2ConceptoRehabilitacion/ConceptoRehabilitacion/' + id_user;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataConcept,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUpdateConcept(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetUpdateConcept = '/api/K2ConceptoRehabilitacion/ActualizarConcepto';
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdateConcept, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAssignCase(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetAssignCase = '/api/K2ConceptoRehabilitacion/AsignarTarea';
    return this.http.put(this.utility.fnGetHost() + this.urlSetAssignCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetReAssignCase(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetAssignCase = '/api/K2ConceptoRehabilitacion/ReasignarTarea';
    return this.http.put(this.utility.fnGetHost() + this.urlSetAssignCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveConceptDiagnostic(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetSaveConceptDiagnostic = '/api/K2ConceptoRehabilitacion/AgregarDiagnosticoConcepto';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveConceptDiagnostic, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveConceptSequels(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetSaveConceptSequels = '/api/K2ConceptoRehabilitacion/AgregarSecuelaConcepto';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveConceptSequels, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
