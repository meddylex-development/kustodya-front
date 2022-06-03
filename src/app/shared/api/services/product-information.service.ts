import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '../services/utilities.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductInformationService {

  url_host: any = environment.apiUrl;
  urlGetAllProductsInformationByVersion: String = '';
  urlGetFiltersProducts: String = '';
  urlGetListProducts: String = '';
  urlGetConfigProducts: String = '';
  urlSetCreateNewProduct: String = '';
  urlSetEditDataProduct: String = '';
  urlDeleteProduct: String = '';

  urlDeleteAllProductInformation: String = '';
  urlfnGetExportPricesListByVersion: String = '';
  data_headers_request: any = '';

  constructor(public http: HttpClient, private utility: UtilitiesService) { }


  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }


  fnHttpGetAllProductsInformationByVersion(guid_user, id_version, object_data_send): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    // this.urlGetAllProductsInformationByVersion = '/api/PriceLists/GetPriceLists?iIDVersion=' + id_version;
    this.urlGetAllProductsInformationByVersion = '/api/Products/GetProducts?iIDVersion=' + id_version;
    return this.http.post(this.utility.fnGetHost() + this.urlGetAllProductsInformationByVersion, object_data_send,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetFiltersProducts(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetFiltersProducts = '/api/Products/GetFiltersProducts?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetFiltersProducts,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetListProducts(guid_user, id_version, text_search?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetListProducts = '/api/Products/GetListProducts?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetListProducts,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetConfigProducts(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlGetConfigProducts = '/api/Products/GetConfigProducts?iIDVersion=' + id_version;
    return this.http.get(this.utility.fnGetHost() + this.urlGetConfigProducts,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetCreateNewProduct(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetCreateNewProduct = '/api/Products/PostProduct';
    return this.http.post(this.utility.fnGetHost() + this.urlSetCreateNewProduct, data_object,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnHttpSetEditDataProduct(guid_user, data_object): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlSetEditDataProduct = '/api/Products/PutProduct';
    return this.http.put(this.utility.fnGetHost() + this.urlSetEditDataProduct, data_object,
      {
        observe: 'response',
        headers: headers,
      });
  }

  fnHttpDeleteProduct(guid_user, id_product): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeleteProduct = '/api/Products/DeleteProduct?iIDProduct=' + id_product;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteProduct,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }

  fnDeleteAllProductInformation(guid_user, id_version): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    this.urlDeleteAllProductInformation = '/api/Products/DeleteAllProducts?iIDVersion=' + id_version;
    return this.http.delete(this.utility.fnGetHost() + this.urlDeleteAllProductInformation,
      {
        observe: 'response',
        headers: headers,
        reportProgress: true,
      });
  }
}
