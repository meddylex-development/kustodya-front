import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OriginQualificationService {

  data_headers_request: any = '';
  urlGetOriginQualificationList: string = '';
  urlGetOriginQualificationData: string = '';
  urlPutOriginQualificationData: string = '';
  urlSetDownloadWordDocumentFormat: string = '';
  urlPutTemporalQualificationData: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService, public router: Router) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetOriginQualificationList(current_payload, current_page, search_input, state, start_date, end_date): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + current_payload);

    let objectParams = {
      'pagina': (current_page) ? current_page : 1,
      'estadoCorreo': (state) ? state : 1,
    };
    if (search_input) {
      objectParams['busqueda'] = search_input;
    }
    if (start_date) {
      objectParams['fechaDesde'] = start_date;
    }
    if (end_date) {
      objectParams['fechaHasta'] = end_date;
    }

    this.urlGetOriginQualificationList = '/api/CalificacionOrigen/Correos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetOriginQualificationList,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetOriginQualificationData(current_payload, guid_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + current_payload);
    this.urlGetOriginQualificationData = '/api/CalificacionOrigen/' + guid_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetOriginQualificationData,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetAttachedFilesOriginQualificationData(current_payload, guid_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + current_payload);
    this.urlGetOriginQualificationData = '/api/CalificacionOrigen/AdjuntoId/' + guid_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetOriginQualificationData,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
      // responseType: 'blob',
    });
  }

  fnHttpPutOriginQualificationData(current_payload, data_object, id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + current_payload);
    this.urlPutOriginQualificationData = '/api/CalificacionOrigen/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutOriginQualificationData, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDownloadWordDocumentFormat(guid_user, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetDownloadWordDocumentFormat = '/api/CalificacionOrigen/Documento';
    return this.http.post(this.utility.fnGetHost() + this.urlSetDownloadWordDocumentFormat, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
      responseType: 'blob',
    });
  }

  fnHttpPutTemporalQualificationData(current_payload, data_object, id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + current_payload);
    this.urlPutTemporalQualificationData = '/api/CalificacionOrigen/DatosTemporales/' + id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutTemporalQualificationData, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
