import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RethusService {

  data_headers_request: any = '';
  url_host_medicos: any = environment.apiMedicos;
  code_api_medico: any = environment.codigoApiMedico;
  codigoApiMedicos: any = environment.codigoApiMedicos;
  url_api: any = environment.apiUrl;

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListDoctorsRethusByDNI(guid_user, document_type, document_number, first_name, last_name): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    //console.log(document_type);
    //console.log(document_number);
    const object_params = {};
    (document_number != '' || document_number != null) ? object_params['documento'] = document_number : false;
    (document_type != '' || document_type != null) ? object_params['tipo'] = document_type : false;
    (first_name != '' || first_name != null) ? object_params['PrimerNombre'] = first_name : false;
    (last_name != '' || last_name != null) ? object_params['PrimerApellido'] = last_name : false;

    const url_medico = this.url_api + '/api/Rethus/Medico';
    return this.http.get(url_medico,
      {
        params: object_params,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListIdentificationTypes(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const object_params = {};
    const url_medico = this.url_api + '/api/Rethus/IdentificationTypes';
    return this.http.get(url_medico,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  // fnHttpGetFileDownloadRethusHistory(id_file, flag_export, guid_user): Observable<any> {
  //   const headers = this.fnSetDefineTokenAuthorization(guid_user);
  //   const object_params = {};
  //   const url_medico = this.url_host_medicos + '/api/CargueMedicos?CargueMasivoId=' + id_file + '&exportar='+ flag_export +'&code=' + this.codigoApiMedicos;
  //   return this.http.get(url_medico,
  //     {
  //       observe: 'response',
  //       headers: headers,
  //       reportProgress: true,
  //       responseType: 'blob',
  //     });
  // }

  fnHttpGetFileDownloadRethusHistory(id_file, flag_export, guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const object_params = {};
    const url_medico = this.utility.fnGetHost() + '/api/Rethus/ExportarCargue/' + id_file;
    console.log('url_medico: ', url_medico);
    return this.http.get(url_medico,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
        responseType: 'blob',
      });
  }

}
