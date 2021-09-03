import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllItemsMenu: string = '';
  urlGetDataAllItemsTreeMenu: string = '';
  urlGetMenuVersions: string = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnHttpGetDataMenuConfig(): Observable<any> {
    return this.http.get('./assets/pgp-mocks/mockdata_menu_CONFIG.json');
  }

  fnHttpGetDataMenu(): Observable<any> {
    return this.http.get('./assets/pgp-mocks/mock_data_menu.json');
  }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllItemsMenu(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllItemsMenu = '/api/Menu/GetMenu';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllItemsMenu,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetAllItemsTreeMenu(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllItemsTreeMenu = '/api/Menu/GetTreeMenu';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllItemsTreeMenu,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  // menu by versions

  fnHttpGetMenuVersions(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetMenuVersions = '/api/Menu/GetMenuByVersion?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetMenuVersions,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
  
  fnHttpGetMenuDashboard(guid_user, id_entity): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetMenuVersions = '/api/Account/GetMenusPerfil?idEntidad=' + id_entity;
    return this.http.get(this.utility.fnGetHost() + this.urlGetMenuVersions,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
