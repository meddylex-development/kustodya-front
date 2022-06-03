import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AyudaComponent } from '../ayuda/ayuda.component';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { FormControl, FormGroup, Validators } from '@angular/forms';
defineLocale('es', esLocale);
import * as moment from 'moment';
declare var $: any;

import * as XLSX from 'xlsx';

@Component({
  selector: 'ngx-reporte-incapacidades',
  templateUrl: './reporte-incapacidades.component.html',
  styleUrls: ['./reporte-incapacidades.component.scss']
})
export class ReporteIncapacidadesComponent implements OnInit {

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';
  dateRangeReport = [];
  startDate: any = '';
  endDate: any = '';
  public collectionDocumentTypes:any = [
    // { 'id': 1, 'nombre': 'Cedula de ciudadania' },
    // { 'id': 2, 'nombre': 'Cedula de extrangeria' },
    // { 'id': 3, 'nombre': 'NIT' },
    // { 'id': 4, 'nombre': 'Pasaporte' },
    // { 'id': 5, 'nombre': 'Tarjeta de idenditas' },
  ];

  public documentTypePatient: any = null;
  public documentNumberPatient: any = '63324967';
  // public documentTypePatient: any = null;
  // public documentNumberPatient: any = '';
  public token: any;
  public patientData: any = null;
  public search: boolean = false;
  public loading: boolean = false;
  public showTitleSearch: boolean = false;
  public documentTypeSelected: any = '';
  public html: any = '';
  public totalItems: any = 1;
  public patientIncapacities: any = '';
  public statusSpinner: boolean = false;
  public spinnerMessage: any = '';

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  userList = [
    {  
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net"
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca"
    }  
  ];

  constructor(
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private authService: NbAuthService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      // $('.btn-show-search-form').click(); // Emulate click display right sidebar to hide
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem("token");
    if (token && user_id) {
      this.token = token;
      let data = this.utilitiesService.fnGetDataShare();
      this.fnGetDataHistoryPatientDaysExced().then((resp) => {
        console.log('resp: ', resp);
      });
      if (data) {
        this.search = false;
        this.showTitleSearch = true;
        this.collectionDocumentTypes = data['collectionDocumentTypes'];
        this.documentNumberPatient = data['documentNumberPatient'];
        this.documentTypePatient = data['documentTypePatient'];
        this.patientData = data['patientData'];
        this.patientIncapacities = data['patientIncapacities'];
        this.documentTypeSelected = data['documentTypeSelected'];
        this.totalItems = data['patientIncapacities'].length;
        // this.fnShowContent('search-form');
        // this.fnShowContent('content-patient-info');
      } else {
        this.collectionDocumentTypes = null;
        this.patientData = null;
        this.documentTypeSelected = null;
        this.patientIncapacities = null;
        this.totalItems = 1;
        // this.fnClearFormSearchPatient();
        this.fnGetDocumentTypes(this.token);
      }
      console.log('data: ', data);
      console.log('this.token: ', this.token);
      this.html = `<span class="btn-block btn-danger well-sm">Never trust not sanitized HTML!!!</span>`;
    } else {
      // self.router.navigateByUrl('');
    }
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  fnShowContent(nameClass) {
    console.log('test');
    $('.' + nameClass).slideToggle();
  }

  fnSearchPatient($event) {
    console.log('$event: ', $event);
    this.utilitiesService.fnSetDataShare(null);
    this.totalItems = 0;
    if (this.documentNumberPatient != undefined &&
      this.documentNumberPatient != "" &&
      this.documentTypePatient != undefined &&
      this.documentTypePatient != "") {
        this.search = true;
        this.fnGetPatientByDocumentNumber(this.token, this.documentNumberPatient, this.documentTypePatient).then((resp) => {
          if(resp) {
            this.patientData = resp;
            console.log('this.patientData["iIdpaciente"]: ', this.patientData['iIdpaciente']);
            // this.patientData;
            // console.log('this.patientData;: ', this.patientData);
            this.fnGetDiagnosicosIncapacidadByPaciente(this.token, this.patientData['iIdpaciente']);

            this.utilitiesService.fnSetDataShare({ 
              patientData: this.patientData, 
              patientIncapacities: this.patientIncapacities, 
              collectionDocumentTypes: this.collectionDocumentTypes, 
              documentNumberPatient: this.documentNumberPatient, 
              documentTypePatient: this.documentTypePatient, 
              documentTypeSelected: this.documentTypeSelected,
            });
          } else {
            this.patientData = [];
          }
        }).catch((error) => {
          console.log('error: ', error);
          this.patientData = [];
        })

    }
  }

  fnGetPatientByDocumentNumber(token, documentNumberPatient, documentTypePatient) {
    console.log('documentNumberPatient: ', documentNumberPatient);
    console.log('documentTypePatient: ', documentTypePatient);
    console.log('token: ', token);
    return new Promise ((resolve,reject) => {
      // const self = this;
      this.patientData = null;
      this.incapacityService.fnHttpGetPacienteByNumeroDocumento(token, documentNumberPatient.trim(), documentTypePatient).subscribe(r => {
        console.log('r: ', r);
        if (r.status == 200) {
          if (r.body != null) {
            this.utilitiesService.showToast('bottom-right', 'success', 'Se han encontrado los datos del paciente', '');
            this.fnShowContent('search-form');
            $('.content-patient-info').slideToggle();;
            this.search = false;
            this.showTitleSearch = true;
            this.patientData = JSON.parse(JSON.stringify(r.body));
            console.log('this.patientData: ', this.patientData);
            resolve(this.patientData);
          } else {
            resolve(false);
            this.search = false;
            this.documentNumberPatient = '';
            this.documentTypePatient = null;
            this.utilitiesService.showToast('bottom-right', 'danger', 'No se encuentra el número de documento!"', 'nb-alert');
          }
        }
        if (r.status == 206) {
          resolve(false);
          this.search = false;
          this.documentNumberPatient = '';
          this.documentTypePatient = null;
          // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
          // this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        console.log('err: ', err);
        reject(false);
        this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    });
  }

  fnGetDataHistoryPatientDaysExced() {
    return new Promise ((resolve,reject) => {
      // const self = this;
      this.patientData = null;
      this.incapacityService.fnHttpGetDataHistoryPatientDaysExced().subscribe(r => {
        console.log('r: ', r);
        resolve(r)
      }, err => {
        console.log('err: ', err);
        reject(false);
        this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente(token, idPaciente) {
    this.search = true;
    this.patientIncapacities = [];
  //const idPaciente = 2;
    this.incapacityService.fnHttpGetDiagnosicosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        this.search = false;
        let patientIncapacities = JSON.parse(JSON.stringify(r.body));

        patientIncapacities.forEach((value, key) => {
          value.cie10.forEach((cievalue, ciekey) => {
            if (cievalue.iIdtipoCie === 1) {
              value['cie10_diagnotic'] = cievalue;
            }
          });
          this.patientIncapacities.push(value);
        });
        
        console.log('this.patientIncapacities: ', this.patientIncapacities);
        this.totalItems = this.patientIncapacities.length;
      } else if (r.status == 206) {
        this.search = false;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.search = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado el historial de incapacidades!');
    });
  }

  fnGetDocumentTypes(token) {
    // this.errors = [];
    // this.search = true;
    this.incapacityService.fnHttpGetTiposIdentificacion(token).subscribe((result) => {
      // this.submitted = false;
      if (result.status == 200) {
        this.collectionDocumentTypes = result.body;//.slice(1, 100);
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.collectionDocumentTypes.unshift(new_item);
        // this.documentTypePatient = this.collectionDocumentTypes[0];
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
      }
      // this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error', 'nb-alert');
      // this.submitted = false;
    });
  }

  fnSelectDocumentType($event) {
    console.log('$event: ', $event);
    this.documentTypeSelected = $event;
  }
  
  fnClearFormSearchPatient() {
    this.search = false;
    this.documentNumberPatient = '';
    this.documentTypePatient = null;
    this.patientData = null;
    this.utilitiesService.fnSetDataShare(null);
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
    });
  }

  fnRedirectViewPatientIncapacitiesHistory() {
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.patientData, 
      patientIncapacities: this.patientIncapacities, 
      collectionDocumentTypes: this.collectionDocumentTypes, 
      documentNumberPatient: this.documentNumberPatient, 
      documentTypePatient: this.documentTypePatient, 
      documentTypeSelected: this.documentTypeSelected,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/historico');
  }

  fnRedirectGeneratePatientIncapacity() {
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.patientData, 
      patientIncapacities: this.patientIncapacities, 
      collectionDocumentTypes: this.collectionDocumentTypes, 
      documentNumberPatient: this.documentNumberPatient, 
      documentTypePatient: this.documentTypePatient, 
      documentTypeSelected: this.documentTypeSelected,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/generar-certificado');
  }

  fnSendReport() {
    this.statusSpinner = true;
    this.spinnerMessage = "Enviando reporte ...";
    this.fnFilterListByDaterange(this.dateRangeReport);
  }

  fnFilterListByDaterange(dateRangeInput) {
    console.log('dateRangeInput: ', dateRangeInput);
    this.statusSpinner = true;
    const dateStartUnix = moment(this.dateRangeReport[0]).unix();
    const dateStartValueof = (this.dateRangeReport.length > 0) ? moment(this.dateRangeReport[0]).valueOf() : '';
    const dateEndUnix = moment(this.dateRangeReport[1]).unix();
    const dateEndValueof = (this.dateRangeReport.length > 0) ? moment(this.dateRangeReport[1]).valueOf() : '';

    this.startDate = dateStartValueof;
    console.log('this.startDate: ', this.startDate);
    this.endDate = dateEndValueof;
    console.log('this.endDate: ', this.endDate);

    let objectSend = {
      'startDate': dateStartValueof,
      'endDate': dateEndValueof,
      // email: `haguirre@famisanar.com.co, 
      // erodriguezb@famisanar.com.co, 
      // lceballos@famisanar.com.co, 
      // egarzon@famisanar.com.co, 
      // rburgos@famisanar.com.co, 
      // aforero@famisanar.com.co, 
      // ovega@famisanar.com.co, 
      // covalle@famisanar.com.co, 
      // mcano@famisanar.com.co, 
      // fpinto@famisanar.com.co, 
      // vbarrera@famisanar.com.co, 
      // jestrada@famisanar.com.co, 
      // meddylexs@gmail.com, 
      // joseeduardoquinones@gmail.com,
      // idonoso@famisanar.com.co, 
      // aramirezp@famisanar.com.co, 
      // dangulo@famisanar.com.co,
      // gpinilladev@gmail.com, 
      // juan.mendez@proyectatsp.com, 
      // joseeduardoquinones@gmail.com, 
      // jjalmonacid@gmail.com, 
      // elbotero@famisanar.com.co, 
      // mquinones@famisanar.com.co, 
      // scardenas@famisanar.com.co, 
      // csanchezb@famisanar.com.co, 
      // dcastros@famisanar.com.co`,
      email: 'jjalmonacid@gmail.com, covalle@famisanar.com.co, haguirre@famisanar.com.co, erodriguezb@famisanar.com.co, framirez@famisanar.com.co, dangulo@famisanar.com.co, fcaicedo@famisanar.com.co, lceballos@famisanar.com.co, vbarrera@famisanar.com.co, joseeduardoquinones@gmail.com, meddylexs@gmail.com, gpinilladev@gmail.com, slopezb@famisanar.com.co, dcastros@famisanar.com.co',
      // email: 'covalle@famisanar.com.co, haguirre@famisanar.com.co, erodriguezb@famisanar.com.co, framirez@famisanar.com.co, dangulo@famisanar.com.co, fcaicedo@famisanar.com.co, lceballos@famisanar.com.co, vbarrera@famisanar.com.co, joseeduardoquinones@gmail.com, meddylexs@gmail.com, gpinilladev@gmail.com, slopezb@famisanar.com.co, dcastros@famisanar.com.co',
      // email: 'jjalmonacid@gmail.com, gpinilladev@gmail.com, juan.mendez@proyectatsp.com, joseeduardoquinones@gmail.com',
      subject: 'Kustodya Web App - Reporte Incapacidades desde ' + moment(dateStartValueof).format('DD/MM/YYYY') + ' 00:00:00 a ' + moment(dateEndValueof).format('DD/MM/YYYY') + ' 23:59:59',
    };
    // this.fnGetOriginQualificationList(this.current_payload, this.currentPage, this.search_input, this.status_list, date_start_valueof, date_end_valueof);
    this.incapacityService.fnHttpPostSendMailReportIncapacities(objectSend).subscribe(r => {
      console.log('r: ', r);
      this.statusSpinner = false;
      this.utilitiesService.showToast('top-right', 'success', 'Archivo enviado', 'nb-check');
    });
  }

}
