import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Observer } from 'rxjs';

import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ngCopy } from 'angular-6-clipboard';

// import { UtilitiesService } from '../services/utilities.service';
// import { HelpComponent } from '../../components/modals/help/help.component'

// import { UserService } from '../../../shared/api/services/user.service';
// import { RethusService } from '../../../shared/api/services/rethus.service';

import * as moment from 'moment';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { map } from 'rxjs/operators';

declare var $: any;
@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  headers: any = null;
  DataHeader = null;

  url_host: any = environment.apiUrl;
  url_host_medicos: any = environment.apiMedicos;
  urlApiMapDivPolColombia: any = environment.urlApiMapDivPolColombia;
  data_headers_request: any = '';
  urlSetUploadFile: any = '';
  urlGetDataUrlCustom: any = '';

  dataChange: Observable<any>;
  dataChangeObserver: any;
  data: any;
  public dataShare: any = null;
  public dataShareOrigin: any = null;

  private index: number = 0;
  public token: string = '';
  result: Object;
  

  constructor(
    private router: Router,
    public http: HttpClient,
    private authService: NbAuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    // private userService: UserService, 
    // private rethusService: RethusService, 
  ) {
    // const token = sessionStorage.getItem("token");
    this.headers = new HttpHeaders().set('Authorization', sessionStorage.getItem("token"));
    this.dataChange = new Observable((observer: Observer<any>) => {
      this.dataChangeObserver = observer;
    });
  }

  getEPS() {
    return JSON.parse(sessionStorage.getItem('eps'));
  }

  setEPS(eps) {
    sessionStorage.setItem('eps', JSON.stringify(eps));
  }

  getIPS() {
    return JSON.parse(sessionStorage.getItem('ips'));
  }

  setIPS(ips) {
    sessionStorage.setItem('ips', JSON.stringify(ips));
  }

  setData(data: any) {
    this.data = data;
    sessionStorage.setItem('eps', JSON.stringify(this.data['eps']));
    sessionStorage.setItem('ips', JSON.stringify(this.data['ips']));
    // this.dataChangeObserver.next(this.data);
  }

  fnGenerateKey(l: number) {
    let r = '';
    while (r.length < l) { r += Math.random().toString(16).substring(2); }
    return r.substring(0, l);
  }
  fnReturnKey() {
    if (sessionStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
  fnDestroySession() {
    sessionStorage.removeItem("token");
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    sessionStorage.removeItem('listCompanies');
    sessionStorage.removeItem('itemManageUsers');
    sessionStorage.removeItem('dataCompany');
    sessionStorage.removeItem('hasCompany');
    localStorage.clear();
    sessionStorage.clear();
  }
  fnDestroySessionGoLogin() {
    sessionStorage.removeItem("token");
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    sessionStorage.removeItem('listCompanies');
    sessionStorage.removeItem('itemManageUsers');
    sessionStorage.removeItem('dataCompany');
    sessionStorage.removeItem('hasCompany');
    localStorage.clear();
    sessionStorage.clear();
  }
  fnDestroySessionData(objectObserve) {
    localStorage.clear();
    sessionStorage.clear();
    objectObserve(true);
  }
  fnShowLoading() {
    $('#divLoad').toggle();
  }
  fnGetHost() {
    return environment.apiUrl;
  }
  fnGetHostSite4() {
    return environment.apiUrlSite4;
  }
  fnGetHostMiddlewareMails() {
    return environment.apiUrlMiddlewareMails;
  }
  fnGetSite() {
    return environment.siteUrl;
  }
  fnGetUser() {
    return sessionStorage.getItem('user');
  }
  fnSetToken(token) {
    console.log('token: ', token);
    sessionStorage.setItem("token", token);
  }
  fnSetSessionStorage(nameVar, dataVal) {
    sessionStorage.setItem(nameVar, dataVal);
  }
  fnSetLocalStorage(nameVar, dataVal) {
    localStorage.setItem(nameVar, dataVal);
  }
  fnGetSessionStorage(nameVar) {
    return sessionStorage.getItem(nameVar);
  }
  fnGetLocalStorage(nameVar) {
    return localStorage.getItem(nameVar);
  }
  fnSetStartDate(startDate) {
    localStorage.setItem('startDate', startDate);
  }
  fnSetEndDate(endDate) {
    localStorage.setItem('endDate', endDate);
  }
  fnGetToken = function () {
    const t = sessionStorage.getItem("token");
    if (t) {
      return t;
    } else {
      this.fnDestroySession();
    }
  };
  fnsetUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  fnValidSection(currentSection, currentView, itemSelectedDateBar) {

    return new Promise((responsePromise) => {

      let response = null;

      if (currentSection === currentView) {
        switch (itemSelectedDateBar) {
          case 'Today':
            response = 'Today';
            break;
          case '7Days':
            response = '7Days';
            break;
          case '30Days':
            response = '30Days';
            break;
          case 'Custom':
            response = '30Days';
            break;
        }
      } else {
        response = false;
      }

      responsePromise(response);
    });

  }

  fnSetRamdonColor() {

    const colors = [
      '#c2e8d3',
      '#bca0b9',
      '#ddadad',
      '#e9e2b3',
      '#A9BABF',
      '#B4D7D8',
      '#B5D4CD',
      '#B6CFBF',
      '#CEEBC4',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }


  fnFontSizeDynamyc(n: string, m: string, max: number) {
    const boxes = $((n));
    boxes.each(function (i) {
      const box = $(boxes[i]), items = box.find((m));
      for (let b = 0; b < items.length; b++) {
        const text = $(items[b]);
        let fontSize = 14, changes = 0, success = true;
        text.css('font-size', fontSize + 'px');
        while (text.width() <= box.width()) {
          text.css('font-size', fontSize + 'px');
          fontSize++;
          changes++;
          if (changes > 500 || fontSize > max) {
            success = false;
            break;
          }
        }
      }
    });

  }
  fnCustomLoading() {
    return $('<div class="CustomLoading"><div class="imgloading"></div></div>');
  }
  fnMoveElemArr(arr, oi, ni) {
    while (oi < 0) { oi += arr.length; }
    while (ni < 0) { ni += arr.length; }
    if (ni >= arr.length) {
      let k = ni - arr.length;
      while ((k--) + 1) { arr.push(undefined); }
    }
    arr.splice(ni, 0, arr.splice(oi, 1)[0]);
    return arr;
  }
  fnOnlyNumber = function (e) {
    const t = e.keyCode ? e.keyCode : e.which;
    if ((t > 47 && t < 58)) {
      return true;
    } else {
      if (t === 8 || t === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  fnCachErr(error: any) {
    switch (error.status) {
      case 401:
        $('#content-load').hide();
        $('#ad-id_modal_session_expired').modal({ backdrop: 'static', keyboard: false }, 'show');
        sessionStorage.clear();
        localStorage.clear();
        break;
      default:
        break;
    }
  }

  fnOpenLoading(callback, scroll_no_auto?) {
    const showLoad = $('#content-load').show();
    if (!scroll_no_auto) {
      $('html,body').scrollTop(0);
      $('html').css('overflow', 'auto');
      const scrollTop = $('html,body').scrollTop(0);
      const overflowHide = $('html').css('overflow', 'hidden');
      if (showLoad && scrollTop && overflowHide) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(true);
    }

  }

  fnOpenLoadingHold(scroll_no_auto?) {
    const showLoad = $('#content-load').show();
    if (!scroll_no_auto) {
      $('html,body').scrollTop(0);
      $('html').css('overflow', 'auto');
      const scrollTop = $('html,body').scrollTop(0);
      const overflowHide = $('html').css('overflow', 'hidden');
      if (showLoad && scrollTop && overflowHide) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  fnCloseLoading(scroll_no_auto?) {
    $('#content-load').hide();
    if (!scroll_no_auto) {
      $('html,body').scrollTop(0);
      $('html').css('overflow', 'auto');
    }
  }

  fnActiveTabBorder(id, page) {
    this.fnRemoveTabActiveBorder();
    this.fnSetSessionStorage('pageSelected', page);
    $('#' + id).addClass('active');
  }

  fnSetPageNavigate(id, page, title) {
    $('#' + id).text(title);
    this.fnSetSessionStorage('pageSelected', page);
    this.fnSetSessionStorage('pageTitle', title);
  }

  fnRemoveTabActiveBorder() {
    $('#item-dashboard').removeClass('active');
    $('#item-jobs').removeClass('active');
    $('#item-sources').removeClass('active');
    $('#item-careerpage').removeClass('active');
  }

  fnGetDataCompany(callback) {
    const dataCompany = JSON.parse(this.fnGetSessionStorage('dataCompany'));
    const itemManageUsers = JSON.parse(this.fnGetSessionStorage('itemManageUsers'));
    if (dataCompany) {
      callback({ 'dataCompany': dataCompany, 'itemManageUsers': itemManageUsers });
    } else {
      callback(false);
    }
  }

  fnSearchTextInArrayObjects(collection_objects, text_criteria, field?) {
    const results = [];
    const toSearch = text_criteria;
    collection_objects.forEach(function (obj, key) {
      Object.keys(obj).forEach(function (ooo, kkk) {
        if (field && field == ooo) {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        } else {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        }
      });
    });
    return results;
  }

  arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
  }

  filterIt(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
  }

  fnSearch(collection, data, field) {
    const arr = JSON.parse(JSON.stringify(collection));
    if (arr) {
      const search = data.toLowerCase();
      return arr.filter((obj) => {
        const datafield = { filter: obj[field].toLowerCase() };
        return Object.values(datafield).some((val) => {
          return val.includes(search);
        });
      });
    }
  }

  fnSearchDate(collection, date_one, date_two, field) {
    const results = [];
    collection.forEach(function (obj, key) {
      const date_collection = moment(obj[field]).valueOf();
      if (date_collection >= date_one && date_collection <= date_two) {
        results.push(obj);
      }
    });
    return results;
  }

  fnGetCurrentTokenSession(returnObserver) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        const current_payload = token.getValue();
        if (current_payload) {
          returnObserver(current_payload);
        } else {
          returnObserver(false);
        }
      }
    });
  }

  fnGetDataFilter(data_collection, string_search, observer, field?) {
    const results = [];
    data_collection.filter(function (obj) {
      Object.keys(obj).forEach(function (ooo, kkk) {
        if (typeof obj[ooo] === 'string' || obj[ooo] instanceof String) {
          if (field && field === ooo) {
            if (obj[ooo].toLowerCase().indexOf(string_search) > -1) {
              results.push(obj);
            }
          } else {
            if (obj[ooo].toLowerCase().indexOf(string_search) > -1) {
              results.push(obj);
            }
          }
        }
        return;
      });
    });
    observer(results);
  }

  fnSetErrors(code_error_api) {
    const errors_collection = [];
    switch (code_error_api) {
      case 'MSG01':
        errors_collection.push('User already exist in the database!');
        break;
      case 'MSG02':
        errors_collection.push('Passwords do not match.!');
        break;
      case 'MSG03':
        errors_collection.push('User does not accept terms and conditions!');
        break;
      case 'MSG04':
        errors_collection.push('User does not exists!');
        break;
      case 'MSG05':
        errors_collection.push('Account is locked!');
        break;
      case 'MSG06':
        errors_collection.push('Username or password is incorrect!');
        break;
      case 'MSG07':
        errors_collection.push('Account is not active!');
        break;
      case 'MSG08':
        errors_collection.push('Username or password is incorrect!');
        break;
      case 'MSG09':
        errors_collection.push('Project already exists!');
        break;
      case 'MSG10':
        errors_collection.push('Project not exists!');
        break;
      case 'MSG11':
        errors_collection.push('User is not  associated to the project!');
        break;
      case 'MSG12':
        errors_collection.push('Version already exists!');
        break;
      case 'MSG13':
        errors_collection.push('Competitor already exists!');
        break;
      case 'MSG14':
        errors_collection.push('Category already exist !');
        break;
      case 'MSG15':
        errors_collection.push('Price List already exist!');
        break;
      case 'MSG16':
        errors_collection.push('Competitor Perceived Value Qualifications already exists!');
        break;
      case 'MSG17':
        errors_collection.push('Category Name repeat from import file!');
        break;
      case 'MSG18':
        errors_collection.push('Competitor repeat from import file!');
        break;
      case 'MSG19':
        errors_collection.push('Price list repeat from import file!');
        break;
      case 'MSG20':
        errors_collection.push('Categories do not match!');
        break;
      case 'MSG21':
        errors_collection.push('Product code, product name and price list combination already esists for the project!');
        break;
      case 'MSG22':
        errors_collection.push('Market prices repeat from import file!');
        break;
    }
    return errors_collection;
  }

  showToast(position, status, message, icon?) {
    this.index += 1;
    this.toastrService.show(status, message,
      { position, status, icon });
  }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }

  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttSetUploadFile(guid_user: any, fileToUpload: File, id_version: any, end_point_url: any, parameter?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    this.urlSetUploadFile = (parameter) ? end_point_url + '?' + parameter + '=' + id_version : end_point_url;
    return this.http.post(this.fnGetHost() + this.urlSetUploadFile, formData, {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }

  formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
    }
  }

  formatPercentage(value, num_decimals) {
    const value_percentage = parseFloat(value) * 100;
    const new_value_percentage = value_percentage.toFixed(num_decimals) + '%';
    return new_value_percentage;
  }



  fnHttpTestValidEmailMock(email): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const urlSetDataNewCategory = '/api/Account/ValidateEmail?email=' + email;
    // return this.http.get('https://prozesslaw.azurewebsites.net/' + urlSetDataNewCategory,
    return this.http.get(this.fnGetHost() + urlSetDataNewCategory,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttpValidEmailMock(email): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const urlSetDataValidEmailService = '/api/Account/ValidateEmail2';
    const obj_send = {
      'emailString': email,
    };
    // return this.http.post('https://prozesslaw.azurewebsites.net/' + urlSetDataValidEmailService, {},
    return this.http.post(this.fnGetHost() + urlSetDataValidEmailService, obj_send,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttpGetEntitiesByUser(guid_user: any, user_id: number): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization('Bearer ' + guid_user);
    const urlSetDataValidEmailService = '/api/Account/GetEmpresasUsuario';
    return this.http.get(this.fnGetHost() + urlSetDataValidEmailService,
      {
        observe: 'response',
        // headers: headers,
        reportProgress: true,
      });
  }

  fnHttSetUploadFileDoctors(guid_user: any, fileToUpload: File, end_point_url: any, parameter?): Observable<any> {
    // const headers = this.fnSetDefineTokenAuthorization(guid_user);
    // const formData: FormData = new FormData();
    // formData.append('file', fileToUpload);
    // formData.append('DocumentoId', '123');
    // formData.append('TipoArchivoId', '567');
    // this.urlSetUploadFile = (parameter) ? end_point_url + '?' + parameter + '=' + id_version : end_point_url;
    // let headers = new HttpHeaders({
    //   'Content-Type': 'text/csv',
    //  });
    this.headers = new HttpHeaders().set('Content-Type', 'text/csv');
    this.urlSetUploadFile = end_point_url;
    return this.http.post(this.url_host_medicos + this.urlSetUploadFile, fileToUpload, {
        observe: 'events',
        headers: this.headers,
        reportProgress: true,
      });
  }

  fnSpliceString(string_name, char_splice) {
    const data_splice = string_name.split(char_splice);
    return data_splice;
  }

  getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
  }

  fnDecodePayload (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  fnHttpGetDataUrlCustom(url_enpoint, guid_user?): Observable<any> {
    if (guid_user) {
      let data_headers = new HttpHeaders().set('Authorization', 'Bearer ' + guid_user);
      data_headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(url_enpoint,
        {
          observe: 'response',
          headers: data_headers,
          reportProgress: true,
        });
    } else {
      let data_headers = new HttpHeaders().set('Authorization', '');
      data_headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(url_enpoint,
        {
          observe: 'response',
          headers: data_headers,
          reportProgress: true,
        });
    }
    // this.urlGetDataUrlCustom = url_enpoint;
  }

  // fnShowModalHelp(moduleName?, columnName?, title?, description?) {
  //   let dataSend = {};
  //   dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
  //   this.dialogService.open(HelpComponent, { context: dataSend }).onClose.subscribe((res) => {
  //     console.log('res: ', res);
  //   });
  // }

  fnAuthValidUser() {
    return new Promise((resolve, reject) => {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getValue();
          let userData = token.getPayload();
          resolve({ state: true, token: this.token, user: userData });
        } else {
          reject({state: false, token: null, user: null});
        }
      });
    })
  }

  fnSignOutUser() {
    return new Promise((resolve, reject) => {
      if (true) {
        localStorage.clear();
        sessionStorage.clear();
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  fnNavigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  fnSetDataShare(data, originMod?) {
    if (originMod) {
      this.dataShareOrigin = data;
    } else {
      this.dataShare = data;
    }
  }

  fnGetDataShare(originMod?) {
    if (originMod) {
      return this.dataShareOrigin;
    } else {
      return this.dataShare;
    }
  }

  fnGetCountryNames() {
    const urlGetCountryNames = '../../../../assets/map/countries.json';
    return this.http.get(urlGetCountryNames,
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnGetCountryDataAPI() {
    const urlGetCountryNames = 'https://restcountries.com/v3.1/all';
    return this.http.get(urlGetCountryNames,
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnHttpGetDiviPolaColombiaDaneDataAPI() {
    return new Promise((resolve, reject) => {
      var xobj = new XMLHttpRequest();
      let urlAPI =  "https://www.datos.gov.co/resource/xdk5-pm3f.json";
      xobj.overrideMimeType("application/json");
      xobj.open("GET", urlAPI, true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status === 200) {
          resolve(JSON.parse(xobj.responseText));
        }
      };
      xobj.send(null);
    })
  }

  fnHttpGetDataJSONAPI(url_api?) {
    return new Promise((resolve, reject) => {
      var xobj = new XMLHttpRequest();
      let urlAPI = url_api;
      xobj.overrideMimeType("application/json");
      xobj.open("GET", urlAPI, true); // Reemplaza colombia-json.json con el nombre que le hayas puesto
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status === 200) {
          resolve(JSON.parse(xobj.responseText));
        }
      };
      xobj.send(null);
    })
  }

  fnReturnUrlApiMapDivPolColombia() {
    return this.urlApiMapDivPolColombia;
  }

  fnGetDataJson(file_name: string) {
    const urlFileJson = '../../../../assets/data/' + file_name ;
    return this.http.get(urlFileJson,
    {
      observe: 'response',
      reportProgress: true,
    });
  }

  fnCopyDataToClipboard(data_to_copy: string) {
    return new Promise((resolve, reject) => {
      if (!data_to_copy) {
        reject(false);
      } else {
        // navigator.clipboard.writeText(data_to_copy);
        ngCopy(data_to_copy);
        resolve(true);
      }
    })
  }

  /*
  fnGetDataUserRethus(token, user_id) {
    return new Promise((resolve, reject) => {
      this.fnGetDataUserById(token, user_id).then((response) => {
        console.log('response: ', response);
        if (response) {
          let numeroIdentificacion = response['numeroIdentificacion'];
          this.fnGetDoctorRethusByDNI(this.token, 1, numeroIdentificacion).then((responseRethus) => {
            // console.log('responseRethus: ', responseRethus);
            if (responseRethus) {
    
              this.fnGetDoctorRethusByDNI(this.token, 'CC', numeroIdentificacion).then((responseRethusDetail) => {
                // console.log('responseRethusDetail: ', responseRethusDetail);
                if (responseRethusDetail) {
                  let dataUserSpecialist = responseRethusDetail['body'];
                  let flagShowAlertUser = false;
                  console.log('dataUserSpecialist: ', dataUserSpecialist);
                  let tipoPorgrama = dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
                  if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
                    console.log('Usted no esta autorizado');
                    flagShowAlertUser = true;
                  } else {
                    console.log('Si tiene permisos para generar incapacidades');
                    flagShowAlertUser = false;
                  }
                  resolve({ 'dataUserSpecialist': dataUserSpecialist, 'flagShowAlertUser': flagShowAlertUser });
                } 
              });
            } else {
              reject(false);
            }
          });
        } else {
          reject(false);
        }
      });
    });
  } 
  */

  // fnGetDoctorRethusByDNI(token, document_type, document_number) {
  //   // Instancia de conexion servicio
  //   return new Promise((resolve, reject) => {
  //     this.rethusService.fnHttpGetListDoctorsRethusByDNI(token, document_type, document_number, '', '').subscribe(response => {
  //         resolve(response);
  //     }, err => {
  //         reject(err);
  //     });
  //   });
  // }

  // fnGetDataUserById(token, user_id) {
  //   // Instancia de conexion servicio
  //   // this.loading_state = true;
  //   return new Promise((resolve, reject) => {
  //     this.userService.fnHttpGetDataUserById(token, user_id).subscribe(response => {
  //       if (response.status == 200) {
  //         let data_user_full = JSON.parse(JSON.stringify(response['body']));
  //         let data_list = JSON.parse(JSON.stringify(response['body']['correos']));
  //         // let data_list_original = JSON.parse(JSON.stringify(response['body']['correos']));
  //         // this.loading_state = false;
  //         resolve(data_user_full);
  //       } else {
  //         let data_list = [];
  //         resolve(false);
  //         // this.loading_state = false;
  //       }
  //     }, err => {
  //       resolve(new Error(err));
  //         // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
  //     });
  //   });
  // }

}
