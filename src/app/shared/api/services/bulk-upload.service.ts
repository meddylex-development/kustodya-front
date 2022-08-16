import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BulkUploadService {

  url_host_medicos: any = environment.apiMedicos;
  code_api_medicos: any = environment.codigoApiMedicos;
  data_headers_request: any = '';
  urlPutCargueMasivo: String = '';
  urlGetListFilesUploadedRethus: String = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListFilesUploadedRethus(guid_user, current_page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetListFilesUploadedRethus = '/api/Rethus/ConsultarCargue?pagina=' + current_page;
    // return this.http.get(this.url_host_medicos + '/api/CargueMasivo?code=' + this.code_api_medicos + '&pagina=' + current_page,
    return this.http.get(this.utility.fnGetHost() + this.urlGetListFilesUploadedRethus,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
  
  fnHttpGetListFilesUploadedRethusByUrl(guid_user, url_api): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    return this.http.get(url_api,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetUploadFileDoctorsPOST(guid_user: any, fileToUpload: File): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `${guid_user}`);

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.url_host_medicos + '/api/CargueMasivo?code=' + this.code_api_medicos, formData, {
        observe: 'events',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetUploadFileDoctors(guid_user: any, fileToUpload: File): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `${guid_user}`);

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);


    // const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutCargueMasivo = '/api/Rethus/CargueMasivo';
    return this.http.put(this.utility.fnGetHost() + this.urlPutCargueMasivo, formData,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
