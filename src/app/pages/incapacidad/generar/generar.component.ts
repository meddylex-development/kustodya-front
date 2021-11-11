import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
declare var $: any;

@Component({
  selector: 'ngx-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {

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

  constructor(
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private authService: NbAuthService,
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
      self.token = token;
      self.fnGetDocumentTypes(self.token)
      console.log('self.token: ', self.token);
      self.html = `<span class="btn-block btn-danger well-sm">Never trust not sanitized HTML!!!</span>`;
    } else {
      // self.router.navigateByUrl('');
    }
  }

  fnShowContent(nameClass) {
    $('.' + nameClass).slideToggle();
  }

  fnSearchPatient($event) {
    console.log('$event: ', $event);

    if (this != undefined &&
      this.documentNumberPatient != undefined &&
      this.documentNumberPatient != "" &&
      this.documentTypePatient != undefined &&
      this.documentTypePatient != "") {
        this.search = true;
        this.fnGetPatientByDocumentNumber(this.token, this.documentNumberPatient, this.documentTypePatient);
    }
  }

  fnGetPatientByDocumentNumber(token, documentNumberPatient, documentTypePatient) {
    console.log('documentNumberPatient: ', documentNumberPatient);
    console.log('documentTypePatient: ', documentTypePatient);
    console.log('token: ', token);
    this.patientData = null;
    this.incapacityService.fnHttpGetPacienteByNumeroDocumento(token, documentNumberPatient.trim(), documentTypePatient).subscribe(r => {
      console.log('r: ', r);
      if (r.status == 200) {
        if (r.body != null) {
          this.utilitiesService.showToast('bottom-right', 'success', 'Se han encontrado los datos del paciente', '');
          this.fnShowContent('search-form');
          this.search = false;
          this.showTitleSearch = true;
          this.patientData = JSON.parse(JSON.stringify(r.body));
          this.fnShowContent('content-patient-info');
          console.log('this.patientData: ', this.patientData);

        }
        else {
          this.search = false;
          this.documentNumberPatient = '';
          this.documentTypePatient = null;
          this.utilitiesService.showToast('bottom-right', 'danger', 'No se encuentra el número de documento!"', 'nb-alert');
        }
      }
      if (r.status == 206) {
        this.search = false;
        this.documentNumberPatient = '';
        this.documentTypePatient = null;
        // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        // this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      console.log('err: ', err);
      this.search = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
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
        this.documentTypePatient = this.collectionDocumentTypes[0];
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
  }

}
