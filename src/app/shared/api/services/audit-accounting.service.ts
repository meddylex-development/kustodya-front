import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  data_headers_request: any = '';
  urlPostContabilidadEncabezado: any = '';
  urlGetCentrosBeneficio: any = '';
  urlPostContabilidadDetalle: any = '';
  urlDeleteContabilidadDetalle: any = '';
  urlDeleteContabilidadEncabezado: any = '';
  urlPutContabilidadDetalle: any = '';
  urlGetEncabezados: any = '';
  urlGetEncabezadoById: any = '';
  urlPutEncabezadoById: any = '';
  urlGetFirmaUsuarioId: any = '';
  urlGetDocumentType: any = '';
  urlPutContabilidad: any = '';
  urlGetAccountingNotesById: any = '';
  urlGetPDFAccountingAudit: any = '';
  urlGetListStatesAccountingAudit: any = '';

  constructor(private http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAccountingAuditList(guid_user, pagina, tamaño_pagina, text_search, state): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetEncabezados = '/api/DepuracionesContables';
    const object_params = {
      // 'busqueda': text_search,
      'pagina': pagina,
      'tamanoPagina': tamaño_pagina,
    };
    (state != '') ? object_params['estadodepuracion'] = state : false;
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    return this.http.get(this.utility.fnGetHost() + this.urlGetEncabezados,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetEncabezadoById(guid_user, encabezado_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetEncabezadoById = '/api/DepuracionContable/Encabezado/' + encabezado_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetEncabezadoById,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetFirmaUsuarioId(guid_user, usuario_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetFirmaUsuarioId = '/api/DepuracionContable/Firma/' + usuario_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetFirmaUsuarioId,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
      responseType: 'blob',
    });
  }

  fnHttpPutEncabezadoById(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutEncabezadoById = '/api/DepuracionContable/Encabezado/' + data_object.id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutEncabezadoById, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetCentrosBeneficio(guid_user, text_search): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetCentrosBeneficio = '/api/DepuracionContable/CentrosBeneficio?busqueda=' + text_search;
    return this.http.get(this.utility.fnGetHost() + this.urlGetCentrosBeneficio,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpPostContabilidadEncabezado(guid_user, id_contabilidad, data_object) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPostContabilidadEncabezado = '/api/Contabilidades/' + id_contabilidad + '/DepuracionesContables';
    return this.http.post(this.utility.fnGetHost() + this.urlPostContabilidadEncabezado, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpPutContabilidad(guid_user, id_contabilidad, id_depuracion_contable ,data_object) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutContabilidad = '/api/Contabilidades/' + id_contabilidad + '/DepuracionesContables/' + id_depuracion_contable;
    return this.http.put(this.utility.fnGetHost() + this.urlPutContabilidad, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  
  fnHttpSetUpdateTemplateNote(guid_user, id_depuracion, id_contabilidad, data_object) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutContabilidad = '/api/Contabilidades/' + id_contabilidad + '/DepuracionesContables/' + id_depuracion;
    return this.http.put(this.utility.fnGetHost() + this.urlPutContabilidad, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpPostContabilidadDetalle(guid_user, data_object, padre_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPostContabilidadDetalle = '/api/DepuracionesContables/' + padre_id + '/Movimientos';
    return this.http.post(this.utility.fnGetHost() + this.urlPostContabilidadDetalle, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpPutContabilidadDetalle(guid_user, data_object, padre_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutContabilidadDetalle = '/api/DepuracionesContables/' + padre_id + '/Movimientos/' + data_object.id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutContabilidadDetalle, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpDeleteContabilidadDetalle(guid_user, detalle_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteContabilidadDetalle = '/api/Movimientos/' + detalle_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteContabilidadDetalle,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpDeleteContabilidadEncabezado(guid_user, accounting_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteContabilidadEncabezado = '/api/DepuracionesContables/' + accounting_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteContabilidadEncabezado,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  fnHttpGetDocumentType(guid_user, busqueda, pagina) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
        // 'busqueda': busqueda,
        'pagina': pagina
    };
    this.urlGetDocumentType = '/api/ClasesDocumento';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDocumentType,
      {
        params: object_params,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDocumentTypeByAccounting(guid_user, busqueda, pagina, contabilidad_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
        // 'busqueda': busqueda,
        'pagina': pagina
    };
    this.urlGetDocumentType = '/api/Contabilidades/' + contabilidad_id + '/ClasesDocumento';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDocumentType,
      {
        params: object_params,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetAccountingNotesById(guid_user, guuid_accounting) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetAccountingNotesById = '/api/DepuracionesContables/' + guuid_accounting;
    return this.http.get(this.utility.fnGetHost() + this.urlGetAccountingNotesById,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetPDFAccountingAudit(guid_user, guuid_accounting): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetPDFAccountingAudit = '/api/DepuracionesContables/' + guuid_accounting + '/PDF'
    return this.http.get(this.utility.fnGetHost() + this.urlGetPDFAccountingAudit,
    {
      // observe: 'response',
      headers: headers,
      reportProgress: true,
      responseType: 'blob',
    });
  }

  fnHttpGetListStatesAccountingAudit(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetListStatesAccountingAudit = '/api/Contabilidades/EstadosDepuracion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListStatesAccountingAudit,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
