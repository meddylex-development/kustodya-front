import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConceptoRehabilitacionService {

  protected data_headers_request: any = '';
  protected url_host: any = environment.apiUrl;
  protected urlGetListPatients: string = '';
  protected urlGetDataConcept: string = '';
  protected urlSetUpdateConcept: string = '';
  protected urlSetAssignCase: string = '';
  protected urlSetSaveConceptDiagnostic: string = '';
  protected urlSetSaveConceptSequels: string = '';
  protected urlSetCancelCase: string = '';
  protected urlSetCreateNewCase: string = '';
  protected urlGetLisTask: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListPatients(token, current_page, search_input, state, type_user, id_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);

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

  fnHttpGetListTask(token, current_page, search_input, state, type_user, id_user, items_per_page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);

    let objectParams = {
      'paginaActual': (current_page) ? current_page : 1,
      'estado': (state) ? state : 1,
      'itemsPorPagina': (items_per_page) ? items_per_page : 10,
    };
    if (search_input) {
      objectParams['busqueda'] = search_input;
    }
    objectParams['tipo'] = type_user;
    objectParams['usuario'] = id_user;

    this.urlGetLisTask = '/api/K2ConceptoRehabilitacion/ConsultarTareas';
    
    return this.http.get(this.utility.fnGetHost() + this.urlGetLisTask,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataConcept(token, id_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);
    this.urlGetDataConcept = '/api/K2ConceptoRehabilitacion/ConceptoRehabilitacion/' + id_user;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataConcept,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUpdateConcept(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetUpdateConcept = '/api/K2ConceptoRehabilitacion/ActualizarConcepto';
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdateConcept, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetAssignCase(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAssignCase = '/api/K2ConceptoRehabilitacion/AsignarTarea';
    return this.http.put(this.utility.fnGetHost() + this.urlSetAssignCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetReAssignCase(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetAssignCase = '/api/K2ConceptoRehabilitacion/ReasignarTarea';
    return this.http.put(this.utility.fnGetHost() + this.urlSetAssignCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetCancelCase(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetCancelCase = '/api/K2ConceptoRehabilitacion/AnularTarea';
    return this.http.put(this.utility.fnGetHost() + this.urlSetCancelCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveConceptDiagnostic(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetSaveConceptDiagnostic = '/api/K2ConceptoRehabilitacion/AgregarDiagnosticoConcepto';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveConceptDiagnostic, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveConceptSequels(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetSaveConceptSequels = '/api/K2ConceptoRehabilitacion/AgregarSecuelaConcepto';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveConceptSequels, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetCreateNewCase(token, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(token);
    this.urlSetCreateNewCase = '/api/K2ConceptoRehabilitacion/CrearTarea';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewCase, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

    
  fnHttpGetListDoctorsCases(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    // const object_params = object_data;
    let urlGetListDoctorsCases = '/api/K2ConceptoRehabilitacion/ConsultarTareasMedicos';
    return this.http.get(this.utility.fnGetHost() + urlGetListDoctorsCases,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
