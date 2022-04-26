import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetListProfiles: any = '';
  urlGetListIdentificationTypes: any = '';
  urlGetListGenders: any = '';
  urlGetDataUserById: any = '';
  urlGetDataEnumeraciones: any = '';
  urlGetDataUserAdminById: any = '';
  urlGetDataTypeEnum: any = '';
  urlSetSaveNewUser: any = '';
  urlSetUpdateDataUser: any = '';
  urlSetUploadSignatureUser: any = '';
  urlGetSignatureUser: any = '';
  urlSetDeleteUserSuperAdmin: any = '';
  urlSetDeleteUserAdminEntity: any = '';
  urlSetSaveNewPhoneUser: any = '';
  urlGetDataListCities: any = '';
  urlGetDataListTypeRoute: any = '';
  urlSetUpdatePasswordUser: string = '';
  urlSetAuditUser: string = '';
  urlGetUsersEntity: string = '';

  constructor(private http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListUsers(guid_user, name, page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'nombre': name,
      'pagina': page,
    };
    this.urlGetListProfiles = '/api/Usuarios';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListProfiles,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListIdentificationTypes(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetListIdentificationTypes = '/api/Usuarios/TipoIdentificacion';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListIdentificationTypes,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListGenders(guid_user, name, page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'nombre': name,
      'pagina': (page) ? page : 1,
    };
    this.urlGetListGenders = '/api/Usuarios/Sexos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListGenders,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListProfiles(guid_user, name, page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'nombre': name,
      'pagina': (page) ? page : 1,
    };
    this.urlGetListGenders = '/api/Usuarios/Sexos';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListGenders,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataUserById(guid_user, user_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    // const object_params = {
    //   'id': user_id,
    // };
    this.urlGetDataUserById = '/api/Usuarios/' + user_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataUserById,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataEnumeraciones(guid_user, enumeracion) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDataEnumeraciones = '/api/Usuarios/Enumeraciones?enumeracion=' + enumeracion;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataEnumeraciones,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetDataUsersByIdEntity(guid_user, id_entity, text_search, page?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'entidadId': id_entity,
      'pagina': (page) ? page : 1,
    };
    (text_search !== '') ? object_params['busqueda'] = text_search : false;
    this.urlGetDataUserAdminById = '/api/Usuarios/entidad/' + id_entity;
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataUserAdminById,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataUserAdmin(entity_id, guid_user, text_search, page): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'entidadId': id_entity,
      'pagina': (page) ? page : 1,
      'entidadId': entity_id,
    };
    (text_search !== '') ? object_params['busqueda'] = text_search : false;
    this.urlGetDataUserAdminById = '/api/Usuarios/Administradores';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataUserAdminById,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataTypeEnum(guid_user, type_enum): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'enumeracion': type_enum,
    };
    this.urlGetDataTypeEnum = '/api/Usuarios/Enumeraciones';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataTypeEnum,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetSaveNewUser(guid_user, object_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = object_user;
    this.urlSetSaveNewUser = '/api/Usuarios';
    return this.http.post(this.utility.fnGetHost() + this.urlSetSaveNewUser, object_params,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUpdateDataUser(guid_user, user_id, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetUpdateDataUser = '/api/Usuarios/' + user_id;
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdateDataUser, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditUser(guid_user, objectUser, user_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      // 'enumeracion': type_enum,
    };
    this.urlGetDataUserAdminById = '/api/Usuarios/Enumeraciones';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataUserAdminById,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetSignatureUser(guid_user, user_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetSignatureUser = '/api/Usuarios/' + user_id + '/Firma';
    return this.http.get(this.utility.fnGetHost() + this.urlGetSignatureUser,
    {
      // observe: 'response',
      headers: headers,
      reportProgress: true,
      responseType: 'blob',
    });
  }

  fnHttpGetDataListCities(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDataListCities = '/api/Usuarios/Ciudades';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListCities,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetDataListTypeRoute(guid_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetDataListTypeRoute = '/api/Direcciones/Via';
    return this.http.get(this.utility.fnGetHost() + this.urlGetDataListTypeRoute,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUploadSignatureUser(guid_user: any, user_id: any, fileToUpload: File): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `${guid_user}`);

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.urlSetUploadSignatureUser = '/api/Usuarios/' + user_id + '/Firma';
    return this.http.post(this.utility.fnGetHost() + this.urlSetUploadSignatureUser, formData, {
        observe: 'events',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetDeleteUserSuperAdmin(guid_user, user_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetDeleteUserSuperAdmin = '/api/Usuarios/' + user_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteUserSuperAdmin,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteUserAdminEntity(guid_user, entity_id, user_id): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetDeleteUserAdminEntity = '/api/Entidades/' + entity_id + '/Usuarios/' + user_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteUserAdminEntity,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetPatchDataUser(guid_user, id_user, objDataCollectionSend): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json-patch+json');
    headers = headers.set('Authorization', `${guid_user}`);

    this.urlSetSaveNewPhoneUser = '/api/Usuarios/' + id_user;
    return this.http.patch(this.utility.fnGetHost() + this.urlSetSaveNewPhoneUser, objDataCollectionSend, {
      // params: objDataCollectionSend,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUpdatePasswordUser(guid_user, object_user): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = object_user;
    this.urlSetUpdatePasswordUser = '/api/Usuarios/Activacion';
    return this.http.post(this.utility.fnGetHost() + this.urlSetUpdatePasswordUser, object_params,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetAuditUser(guid_user, object_params): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetAuditUser = '/api/Auditoria';
    return this.http.post(this.utility.fnGetHost() + this.urlSetAuditUser, object_params,
    {
      // params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  
  fnHttpGetUsersEntity(guid_user, entity_id, object_data): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = object_data;
    this.urlGetUsersEntity = '/api/K2Usuarios/ConsultarUsuarios/entidad/' + entity_id;
    return this.http.get(this.utility.fnGetHost() + this.urlGetUsersEntity,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

}
