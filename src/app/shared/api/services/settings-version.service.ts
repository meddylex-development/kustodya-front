import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsVersionService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllProjects: string = '';
  urlGetDataAllProjectsByCompany: string = '';
  urlSetDataNewProject: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllProjects(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllProjects = '/api/Projects/GetProjects?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllProjects,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
  
  fnHttpGetAllProjectsByCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllProjectsByCompany = '/api/Projects/GetListProjects?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllProjectsByCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveNewProject(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDataNewProject = '/api/Projects/PostProject';
    return this.http.post(this.utility.fnGetHost() + this.urlSetDataNewProject, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
