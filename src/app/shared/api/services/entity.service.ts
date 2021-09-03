import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetListEntitiesSuperAdmin: any = '';
  urlGetListEntitiesCommonUser: any = '';
  urlGetListEntitiesEntityAdmin: any = '';

  urlGetDataEntityById: any = '';

  urlGetListEntities: any = '';
  urlSetNewEntity: any = '';
  urlGetEntidadesRegimen: any = '';
  urlGetEntidadesNaturaleza: any = '';
  urlGetEntidadesTipoRelacion: any = '';
  urlGetEntitiesSocietyType: any = '';
  urlGetEntidadRelacion: any = '';
  
  urlSetPatchDataEntity: any = '';
  urlSetUploadLogoEntity: any = '';
  urlGetLogoEntity: any = '';
  urlPutUpdateInfoBasicEntity: any = '';
  urlDeleteEntityById: any = '';

  constructor(private http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListEntitiesSuperAdmin(guid_user, text_search, page?, quantity?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'busqueda': text_search,
      'pagina': (page) ? page : 1,
      'cantidad': (quantity) ? quantity : 10,
    };
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListEntitiesSuperAdmin = '/api/Entidad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListEntitiesSuperAdmin,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListEntitiesEntityAdmin(guid_user, text_search, page?, quantity?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'busqueda': text_search,
      'pagina': (page) ? page : 1,
      'cantidad': (quantity) ? quantity : 10,
    };
    // (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListEntitiesEntityAdmin = '/api/Entidad/listadoadministrador';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListEntitiesEntityAdmin,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListEntitiesUserCommon(guid_user, text_search, page?, quantity?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'busqueda': text_search,
      'pagina': (page) ? page : 1,
      'cantidad': (quantity) ? quantity : 10,
    };
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListEntitiesCommonUser = '/api/Entidad/listado';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListEntitiesCommonUser,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataEntityById(guid_user, entidad_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    // const object_params = {
    //   'id': entidad_id,
    // };
    this.urlGetDataEntityById = '/api/Entidades/' + entidad_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataEntityById,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListEntities(guid_user, text_search, page?, quantity?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'busqueda': text_search,
      'pagina': (page) ? page : 1,
      'cantidad': (quantity) ? quantity : 10,
    };
    (text_search != '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListEntities = '/api/Entidades';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListEntities,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  
  fnHttpSetNewEntity(guid_user, object_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetNewEntity = '/api/Entidades';
    return this.http.post(this.utility.fnGetHost() + this.urlSetNewEntity, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetEntidadesRegimen(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetEntidadesRegimen = '/api/Entidades/Regimen';
    return this.http.get(this.utility.fnGetHost() + this.urlGetEntidadesRegimen,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetEntidadesNaturaleza(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetEntidadesNaturaleza = '/api/Entidades/Naturaleza';
    return this.http.get(this.utility.fnGetHost() + this.urlGetEntidadesNaturaleza,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetEntidadesTipoRelacion(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetEntidadesTipoRelacion = '/api/Entidades/TipoRelacion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetEntidadesTipoRelacion,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetEntitiesSocietyType(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetEntitiesSocietyType = '/api/Entidades/TipoSociedad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetEntitiesSocietyType,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetPatchDataEntity(guid_user, entity_id, objDataCollectionSend): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json-patch+json');
    headers = headers.set('Authorization', `${guid_user}`);

    this.urlSetPatchDataEntity = '/api/Entidades/' + entity_id;
    return this.http.patch(this.utility.fnGetHost() + this.urlSetPatchDataEntity, objDataCollectionSend, {
      // params: objDataCollectionSend,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUploadLogoEntity(guid_user: any, entity_id: any, fileToUpload: File): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `${guid_user}`);

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.urlSetUploadLogoEntity = '/api/Entidad/' + entity_id + '/Logo';
    return this.http.post(this.utility.fnGetHost() + this.urlSetUploadLogoEntity, formData, {
        observe: 'events',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetLogoEntity(guid_user, entity_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetLogoEntity = '/api/Entidad/' + entity_id + '/Logo';
    return this.http.get(this.utility.fnGetHost() + this.urlGetLogoEntity,
    {
      // observe: 'response',
      headers: headers,
      reportProgress: true,
      responseType: 'blob',
    });
  }

  fnHttpPutUpdateInfoBasicEntity(entity_id, guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlPutUpdateInfoBasicEntity = '/api/Entidades/' + entity_id;
    return this.http.put(this.utility.fnGetHost() + this.urlPutUpdateInfoBasicEntity, data_object,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpDeleteEntityById(entity_id, guid_user) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteEntityById = '/api/Entidades/' + entity_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteEntityById,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
