import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllGroupsByProject: any = '';
  urlSetCreateNewGroup: any = '';
  urlSetSendInviteUserToGroup: any = '';
  urlGetListProjectGroupsByProject: any = '';
  urlSetEditDataConfigGroup: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllGroupsByProject(guid_user, id_project): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllGroupsByProject = '/api/Projects/GetProjectGroupsByProject?iIDProject=' + id_project;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllGroupsByProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
  
  fnHttpGetListProjectGroupsByProject(guid_user, id_project): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetListProjectGroupsByProject = '/api/Projects/GetListProjectGroupsByProject?iIDProject=' + id_project;
    return this.http.get(this.utility.fnGetHost() + this.urlGetListProjectGroupsByProject,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetCreateNewGroup(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetCreateNewGroup = '/api/Projects/PostProjectGroup';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewGroup, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSendInviteUserToGroup(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetSendInviteUserToGroup = '/api/Projects/PostProjectGroupUser';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSendInviteUserToGroup, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataConfigGroup(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataConfigGroup = '/api/Projects/PutProjectGroup';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataConfigGroup, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
