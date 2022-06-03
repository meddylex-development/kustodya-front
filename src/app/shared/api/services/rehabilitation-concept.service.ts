import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RehabilitationConceptService {

  data_headers_request: any = '';
  url_host: any = environment.apiUrl;
  urlGetDataPatientById: any = '';
  urlHttpCreateNewMedicalConcept: any = '';
  urlGetDataEtiologiesEnum: any = '';
  urlGetDataTypeSequelsEnum: any = '';
  urlGetDataMedicalPrognosisEnum: any = '';
  urlGetDataMedicalTreatmentsEnum: any = '';
  urlGetDataMedicalConceptEnum: any = '';
  urlGetDataDashboardByPeriod: string = '';
  urlGetListConceptsHistoryByPatientId: string = '';
  urlGetListHistoryIncapacitiesByPatientId: string = '';
  urlGetListPatients: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetDataPatientById(token, patient_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);
    this.urlGetDataPatientById = '/api/ConceptoRehabilitacion/' + patient_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataPatientById,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpCreateNewMedicalConcept(guid_user, object_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlHttpCreateNewMedicalConcept = '/api/ConceptoRehabilitacion';
    return this.http.post(this.utility.fnGetHost() + this.urlHttpCreateNewMedicalConcept, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataEtiologiesEnum(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataEtiologiesEnum = '/api/ConceptoRehabilitacion/Diagnostico/Etiologias';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataEtiologiesEnum,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataTypeSequelsEnum(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataTypeSequelsEnum = '/api/ConceptoRehabilitacion/Secuela/Tipos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataTypeSequelsEnum,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataMedicalPrognosisEnum(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataMedicalPrognosisEnum = '/api/ConceptoRehabilitacion/Secuela/Pronosticos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataMedicalPrognosisEnum,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataMedicalTreatmentsEnum(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataMedicalTreatmentsEnum = '/api/ConceptoRehabilitacion/FinalidadTratamientos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataMedicalTreatmentsEnum,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataMedicalConceptEnum(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataMedicalConceptEnum = '/api/ConceptoRehabilitacion/Conceptos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataMedicalConceptEnum,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataDashboardByPeriod(token, period): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);
    this.urlGetDataDashboardByPeriod = '/api/ConceptoRehabilitacion/Dashboard?periodo=' + period;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataDashboardByPeriod,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListConceptsHistoryByPatientId(patient_id, token, current_page, text_search, num_items_page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);
    const object_params = {
      'pagina': current_page,
      // 'busqueda': text_search,
      // 'tamanoPagina': tamaño_pagina
    };
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListConceptsHistoryByPatientId = '/api/ConceptoRehabilitacion/' + patient_id + '/Historial';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListConceptsHistoryByPatientId,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListHistoryIncapacitiesByPatientId(patient_id, token, current_page, text_search, num_items_page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + token);
    const object_params = {
      'pagina': current_page,
      // 'busqueda': text_search,
      // 'tamanoPagina': tamaño_pagina
    };
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListHistoryIncapacitiesByPatientId = '/api/ConceptoRehabilitacion/' + patient_id + '/Incapacidades';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListHistoryIncapacitiesByPatientId,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
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

    this.urlGetListPatients = '/api/Pacientes/PendientesConceptoRehabilitacion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListPatients,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
