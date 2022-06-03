import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetDataAllCategoriesByVersion: any = '';
  urlSetDataNewCategory: any = '';
  urlSetEditDataCategory: any = '';
  urlSetDeleteCategoryById: any = '';
  urlSetDeleteAllCategories: any = '';
  urlGetDataListCategoriesByVersion: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetAllCategoriesByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataAllCategoriesByVersion = '/api/Categories/GetCategories?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataAllCategoriesByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetSaveNewCategory(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDataNewCategory = '/api/Categories/PostCategories';
    return this.http.post(this.utility.fnGetHost() + this.urlSetDataNewCategory, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataCategory(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataCategory = '/api/Categories/PutCategories';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataCategory, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteCategoryById(guid_user, id_category): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteCategoryById = '/api/Categories/DeleteCategories?iIDCategory=' + id_category;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteCategoryById,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteAllCategories(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetDeleteAllCategories = '/api/Categories/DeleteAllCategories?iIDVersion=' + id_version;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteAllCategories,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDataListCategoriesByVersion(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetDataListCategoriesByVersion = '/api/Categories/GetListCategories?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListCategoriesByVersion,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

}
