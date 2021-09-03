import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncapacityService {

  data_headers_request: any = '';
  urlGetTiposIdentificacion: any = '';
  urlGetPacienteByNumeroDocumento: any = '';
  urlGetDiagnosicosIncapacidadByPaciente: any = '';
  urlGetCie10: any = '';
  urlGetOrigenesIncapacidad: any = '';
  urlfnHttpPostDiagnosticosIncapacidad: any = '';
  urlfnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico: any = '';
  urlfnHttpGetPacienteByID: any = '';
  urlGetAllEPS: any = '';
  urlGetAllIPSByEps: any = '';
  urlGetListIncapacityAttentionTypes: any = '';
  urlGetCorrelationDiagnostic: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetTiposIdentificacion(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetTiposIdentificacion = '/api/Pacientes/GetTiposIdentificacion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetTiposIdentificacion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetPacienteByNumeroDocumento(guid_user, documentNumber, documentType): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetPacienteByNumeroDocumento = '/api/Pacientes/GetPacienteByNumeroDocumento?iIdTipoDocumento=' + documentType + '&tNumeroDocumento=' + documentNumber;
    return this.http.get(this.utility.fnGetHost() + this.urlGetPacienteByNumeroDocumento,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDiagnosicosIncapacidadByPaciente(guid_user, iIDPaciente): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDiagnosicosIncapacidadByPaciente = '/api/Pacientes/GetDiagnosicosIncapacidadByPaciente?iIDPaciente=' + iIDPaciente;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDiagnosicosIncapacidadByPaciente,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetCantidadDiagnoticosIncapacidadByPaciente(guid_user, iIDPaciente): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDiagnosicosIncapacidadByPaciente = '/api/Pacientes/GetCantidadDiagnoticosIncapacidadByPaciente?iIDPaciente=' + iIDPaciente;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDiagnosicosIncapacidadByPaciente,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetCie10(guid_user, type_cie10): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetCie10 = '/api/DiagnosticoIncapacidad/GetCie10?IIdtipoCie=' + type_cie10;
    return this.http.get(this.utility.fnGetHost() + this.urlGetCie10,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetOrigenesIncapacidad(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetOrigenesIncapacidad = '/api/DiagnosticoIncapacidad/GetOrigenesIncapacidad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetOrigenesIncapacidad,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpPostDiagnosticosIncapacidad(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlfnHttpPostDiagnosticosIncapacidad = '/api/DiagnosticoIncapacidad/PostDiagnosticosIncapacidad';
    return this.http.post(this.utility.fnGetHost() + this.urlfnHttpPostDiagnosticosIncapacidad, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(guid_user, uiCodigoDiagnostico): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlfnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico = '/api/DiagnosticoIncapacidad/GetDiagnosicosIncapacidadByCodigoDiagnostico?CodigoDiagnostico=' + uiCodigoDiagnostico;
    return this.http.get(this.utility.fnGetHost() + this.urlfnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetPacienteByID(guid_user, id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlfnHttpGetPacienteByID = '/api/Pacientes/GetPacienteByID?IIdpaciente=' + id;
    return this.http.get(this.utility.fnGetHost() + this.urlfnHttpGetPacienteByID,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetAllEPS(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetAllEPS = '/api/EPS/';
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllEPS,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetEPSbyUser(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetAllEPS = '/api/EPS/' + sessionStorage.getItem('user_id');
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllEPS,
        {
            observe: 'response',
            headers: headers,
            reportProgress: true,
        });
    }

  fnHttpGetAllIPSByEps(guid_user, id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetAllIPSByEps = '/api/EPS/' + id + '/IPS';
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllIPSByEps,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListIncapacityAttentionTypes(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetListIncapacityAttentionTypes = '/api/DiagnosticoIncapacidad/GetTiposAtencion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListIncapacityAttentionTypes, {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetCorrelationDiagnostic(guid_user, id_cie_10, id_patient): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetCorrelationDiagnostic = '/api/DiagnosticoIncapacidad/GetDiagnosticoCorrelacion?IIdcie10=' + id_cie_10 + '&IIdpaciente=' + id_patient;
    return this.http.get(this.utility.fnGetHost() + this.urlGetCorrelationDiagnostic, {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
