import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParameterizationService {

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlGetPUCs: any = '';
  urlGetListContabilidades: any = '';
  urlGetAccountingDetail: any = '';
  urlGetContabilidadEnumeraciones: any = '';
  urlDeleteContabilidad: any = '';
  urlSetNewContabilidad: any = '';
  urlGetListDocumentTypes: any = '';
  urlSetDeleteDocumentType: any = '';
  urlGetPlantilla: any = '';
  urlGetListaPlantillas: any = '';
  urlGetTipoPlantillaContable: any = '';
  urlSetNewPlantilla: any = '';
  urlSetUpdatePlantilla: any = '';
  urlDeletePlantilla: any = '';
  urlGetListaAdminFirmas: any = '';
  urlSetUpdateSignatureAdmin: any = '';
  urlSetNewAdjustementType: any = '';
  urlUpdateAdjustementType: any = '';
  urlDeleteAdjustmentType: any = '';
  urlSetUploadFile: any = '';
  urlSetCreateNewDocumentType: any = '';
  urlGetTerceros: any = '';
  urlGetCostCenter: any = '';

  constructor(private http: HttpClient, private utility: UtilitiesService) { }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttpGetListContabilidades(guid_user, pagina, busqueda): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let objectParams = {
      'busqueda': busqueda,
      'pagina': pagina
    }
    this.urlGetListContabilidades = '/api/Contabilidades';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListContabilidades,
    {
      params: objectParams,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  
  fnHttpGetAccountingDetail(guid_user, account_code): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetAccountingDetail = '/api/Contabilidades/' + account_code;
    return this.http.get(this.utility.fnGetHost() + this.urlGetAccountingDetail,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetNewContabilidad(guid_user, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetNewContabilidad = '/api/Contabilidades';
    return this.http.put(this.utility.fnGetHost() + this.urlSetNewContabilidad, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
 
  fnHttpDeleteContabilidad(guid_user, contabilidad_codigo) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteContabilidad = '/api/Contabilidades/' + contabilidad_codigo;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteContabilidad,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListDocumentTypes(guid_user, text_search, page?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const object_params = {
      'pagina': (page) ? page : 1,
    };
    (text_search !== '') ? object_params['busqueda'] = text_search : false;
    this.urlGetListDocumentTypes = '/api/ClasesDocumento';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListDocumentTypes,
    {
      params: object_params,
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetContabilidadEnumeraciones(guid_user) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetContabilidadEnumeraciones = '/api/Contabilidades/TipoContabilidad';
    return this.http.get(this.utility.fnGetHost() + this.urlGetContabilidadEnumeraciones,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetPUCs(guid_user, pagina, tamanoPagina, busqueda, contabilidad, tipoContabilidad, exportar) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetPUCs = '/api/PUCs';
    let objectParams = {
      'busqueda': busqueda,
      'pagina': pagina,
      'tamanoPagina': tamanoPagina,
      'tipoContabilidad': tipoContabilidad,
      'exportar': exportar,
      'contabilidad': contabilidad,
    }
    return this.http.get(this.utility.fnGetHost() + this.urlGetPUCs,
      {
        params: objectParams,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  
  fnHttpGetTerceros(guid_user, pagina, tamanoPagina, busqueda) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetTerceros = '/api/Terceros';
    let objectParams = {
      'busqueda': busqueda,
      'pagina': pagina,
      'tamanoPagina': tamanoPagina,
      // 'tipoPersona': tipoPersona,
      // 'exportar': exportar,
    }
    return this.http.get(this.utility.fnGetHost() + this.urlGetTerceros,
      {
        params: objectParams,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }


  fnHttpGetPlantilla(guid_user, end_point_url) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetPlantilla = end_point_url;
    return this.http.get(this.utility.fnGetHost() + this.urlGetPlantilla,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
        responseType: 'blob',
      });
  }

  fnHttSetUploadFile(guid_user: any, fileToUpload: File, end_point_url: any): Observable<any> {
 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `${guid_user}`);

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.urlSetUploadFile = end_point_url;
    return this.http.put(this.utility.fnGetHost() + this.urlSetUploadFile, formData, {
      observe: 'events',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpGetListTemplate(guid_user, busqueda, pagina, tamanoPagina, tipoPlantilla) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const objectParams = {
      'pagina': (pagina) ? pagina : 1,
      'tamanoPagina': (tamanoPagina) ? tamanoPagina : 10,
    };
    (busqueda !== '') ? objectParams['busqueda'] = busqueda : false;
    (tipoPlantilla !== '') ? objectParams['tipoPlantilla'] = tipoPlantilla : false;
    this.urlGetListaPlantillas = '/api/Plantillas';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListaPlantillas,
      {
        params: objectParams,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  
  fnHttpGetTipoPlantillaContable(guid_user) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetTipoPlantillaContable = '/api/Contabilidades/TipoPlantillaContable';
    // this.urlGetTipoPlantillaContable = '/api/Enumeraciones/ObtenerTipoPlantillaContable/api/Contabilidades/TipoPlantillaContable';
    return this.http.get(this.utility.fnGetHost() + this.urlGetTipoPlantillaContable,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetNewPlantilla(guid_user, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetNewPlantilla = '/api/Plantillas';
    return this.http.post(this.utility.fnGetHost() + this.urlSetNewPlantilla, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetUpdatePlantilla(guid_user, object_send, plantillaId): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetUpdatePlantilla = '/api/Plantillas/plantillaId?plantillaId=' + plantillaId;
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdatePlantilla, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
 
  fnHttpDeletePlantilla(guid_user, plantilla_id) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeletePlantilla = '/api/Plantillas/' + plantilla_id;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeletePlantilla,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetCreateNewDocumentType(accounting_code, object_send, guid_user): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetCreateNewDocumentType = '/api/Contabilidades/' + accounting_code + '/ClasesDocumento';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewDocumentType, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetEditDocumentType(accounting_code, description_doc, object_send, guid_user): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetCreateNewDocumentType = '/api/Contabilidades/' + accounting_code + '/ClasesDocumento/' + description_doc;
    return this.http.put(this.utility.fnGetHost() + this.urlSetCreateNewDocumentType, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  fnHttpSetDeleteDocumentType(accounting_code, description_doc, guid_user): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetDeleteDocumentType = '/api/Contabilidades/' + accounting_code + '/ClasesDocumento/' + description_doc;
    return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteDocumentType,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  // fnHttpSetDeleteDocumentType(guid_user, type_doc_description) {
  //   const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
  //   this.urlSetDeleteDocumentType = '/api/ClasesDocumento?descripcion=' + type_doc_description;
  //   return this.http.delete(this.utility.fnGetHost() + this.urlSetDeleteDocumentType,
  //     {
  //       observe: 'response',
  //       headers: headers,
  //       reportProgress: true,
  //     });
  // }

  fnHttpGetListSignatureAdmin(guid_user) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlGetListaAdminFirmas = '/api/Entidades/Firmas';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListaAdminFirmas,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetUpdateSignatureAdmin(guid_user, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetUpdateSignatureAdmin = '/api/Entidades/Firmas';
    return this.http.put(this.utility.fnGetHost() + this.urlSetUpdateSignatureAdmin, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  
  fnHttpGetListAdjustmentType(guid_user, busqueda, pagina) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let objectParams = {
      'busqueda': busqueda,
      'pagina': pagina
    }
    this.urlGetListaAdminFirmas = '/api/TiposAjuste';
    return this.http.get(this.utility.fnGetHost() + this.urlGetListaAdminFirmas,
      {
        params: objectParams,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
    
  fnHttpGetListCostCenter(guid_user, busqueda, pagina, tamanoPagina, exportar) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    let objectParams = {
      'busqueda': busqueda,
      'pagina': pagina,
      'tamanoPagina': tamanoPagina,
      'exportar': exportar,
    }
    this.urlGetCostCenter = '/api/CentrosCosto';
    return this.http.get(this.utility.fnGetHost() + this.urlGetCostCenter,
      {
        params: objectParams,
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetNewAdjustementType(guid_user, codigo_contabilidad, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlSetNewAdjustementType = '/api/Contabilidades/' + codigo_contabilidad + '/TiposAjuste';
    return this.http.post(this.utility.fnGetHost() + this.urlSetNewAdjustementType, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
 
  fnHttpSetUpdateAdjustementType(guid_user, codigo_contabilidad, descripcion, object_send): Observable<any>  {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlUpdateAdjustementType = '/api/Contabilidades/' + codigo_contabilidad + '/TiposAjuste/' + descripcion;
    return this.http.put(this.utility.fnGetHost() + this.urlUpdateAdjustementType, object_send,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

   
  fnHttpDeleteAdjustmentType(guid_user, codigo_contabilidad, descripcion) {
    const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    this.urlDeleteAdjustmentType = '/api/Contabilidades/' + codigo_contabilidad + '/TiposAjuste/' + descripcion;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteAdjustmentType,
    {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
}
