import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AyudaComponent } from '../ayuda/ayuda.component';
declare var $: any;

@Component({
  selector: 'ngx-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

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
    const token = sessionStorage.getItem('payload');
    if (token && user_id) {
      this.token = token;
      let data = this.utilitiesService.fnGetDataShare();
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
        this.fnShowContent('search-form');
        this.fnShowContent('content-patient-info');
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
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/historico');
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
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/generar-certificado');
  }

}
