import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompetitorsService {
  url_host: any = environment.apiUrl;
  urlGetAllCompetitorsByVersion: String = '';
  urlGetDataListCompetitorsByVersion: String = '';
  urlSetCreateNewCompetitor: String = '';
  urlSetEditDataCompetito: String = '';
  urlDeleteCompetitors: String = '';
  urlDeleteAllCompetitors: String = '';
  urlfnGetExportCompetitorsByVersion: String = '';
  data_headers_request: any = '';
  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnGetAllCompetitorsByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetAllCompetitorsByVersion = '/api/Competitors/GetCompetitors?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetAllCompetitorsByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDataListCompetitorsByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataListCompetitorsByVersion = '/api/Competitors/GetListCompetitors?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListCompetitorsByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnSetCreateNewCompetitor(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetCreateNewCompetitor = '/api/Competitors/PostCompetitor';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewCompetitor, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataCompetitor(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataCompetito = '/api/Competitors/PutCompetitor';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataCompetito, data_object,
      {
        observe: 'response',
        headers: headers,
      });
  }

  fnDeleteCompetitors(guid_user, iIDCompetitor): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeleteCompetitors = '/api/Competitors/DeleteCompetitor?iIDCompetitor=' + iIDCompetitor;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteCompetitors,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnDeleteAllCompetitors(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeleteAllCompetitors = '/api/Competitors/DeleteAllCompetitorsByVersion?iIDVersion=' + id_version;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteAllCompetitors,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
