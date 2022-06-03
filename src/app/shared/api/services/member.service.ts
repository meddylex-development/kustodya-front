import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllMembersByCompany: string = '';
  urlGetDataAllGuestMembersByCompany: string = '';
  urlSetRevokeInvitationMemberByCompany: string = '';
  urlSetRevokeInvitationMemberGuestByCompany: string = '';
  urlSetReSendInvitationUser: string = '';
  urlSetIniviteNewMember: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllMembersByCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllMembersByCompany = '/api/User/GetUsersByCompany?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllMembersByCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetAllGuestMembersByCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllGuestMembersByCompany = '/api/User/GetUsersGuestCompany?iIDCompany=' + id_company;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllGuestMembersByCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetInviteNewMember(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetIniviteNewMember = '/api/User/PostUsersByCompany';
    return this.http.post(this.utility.fnGetHost() + this.urlSetIniviteNewMember, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetRevokeInvitationMemberByCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRevokeInvitationMemberByCompany = '/api/User/DeleteUsersByCompany?iIDUserCompany=' + id_company;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetRevokeInvitationMemberByCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
  
  fnHttpSetRevokeInvitationMemberGuestByCompany(guid_user, id_company): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetRevokeInvitationMemberGuestByCompany = '/api/User/DeleteUsersGuestCompany?iIDGuestCompany=' + id_company;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetRevokeInvitationMemberGuestByCompany,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetReSendInvitationUser(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetReSendInvitationUser = '/api/User/PostResendGuest';
    return this.http.post(this.utility.fnGetHost() + this.urlSetReSendInvitationUser, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
