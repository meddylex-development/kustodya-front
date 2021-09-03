import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NbDialogService } from '@nebular/theme';

import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TranscriptionPrintComponent } from '../transcription-print/transcription-print.component';

@Component({
  selector: 'ngx-transcription-ckeck',
  templateUrl: './transcription-ckeck.component.html',
  styleUrls: ['./transcription-ckeck.component.scss']
})
export class TranscriptionCkeckComponent implements OnInit {

  required: Boolean = true;
  minlength: Number = 8;
  maxlength: Number = 50;
  aria_invalid: Boolean = true;

  submitted: boolean = false;
  totalItems: number;

  uiCodigoDiagnostico: any = null;
  paciente: any = {};
  incapacidades: any = [];
  diagnostigoGenerado: any = null;
  search: boolean = false;
  option = 1;

  listCantidadDiagnoticosIncapacidad: any = [];

  list_documentType: any = [{ id: 1, nombre: 'TI' }, { id: 2, nombre: 'CC' }];

  error_form: any = {
    'documentType': { 'data': false, 'length': false },
    'documentNumber': { 'data': false, 'length': false },
  };

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  token: any;

  constructor(private dialogService: NbDialogService,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private dashboardComponent: DashboardComponent,
    public router: Router) {
    this.user.documentNumber = '63324967';
  }

  ngOnInit() {
    this.token = this.dashboardComponent.token;
    this.fnGetTiposIdentificacion();
  }

  fnGetTiposIdentificacion() {
    this.errors = [];
    this.submitted = true;
    this.incapacityService.fnHttpGetTiposIdentificacion(this.token).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        this.list_documentType = result.body;//.slice(1, 100);
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.list_documentType.unshift(new_item);
        this.user.documenttype = this.list_documentType[0];
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
    });
  }

  fnSearchUser() {
    if (this.user != undefined &&
      this.user.documentNumber != undefined &&
      this.user.documentNumber != "" &&
      this.user.documenttype != undefined &&
      this.user.documenttype != "") {
      this.fnGetPacienteByNumeroDocumento();
    }
  }

  fnGetPacienteByNumeroDocumentoMock() {
    this.paciente = {
      "iIdpaciente": 2,
      "eps": {
        "iIdeps": 2,
        "tNombre": "FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA",
        "tCodigoExterno": "EAS027",
        "tNumeroIdentificacion": "800112806",
        "tDigitoVerificacion": "2"
      },
      "tipoDocumento": {
        "iIdTipoDocumento": 9,
        "tTipoDocumento": "Cedula de Ciudadania"
      },
      "tNumeroDocumento": "63324967",
      "tPrimerNombre": "MARTHA",
      "tSegundoNombre": "LUNA",
      "tPrimerApellido": "PIMIENTO",
      "tSegundoApellido": "",
      "tDireccion": "CL 94 11 A 65 APTO 703 BRR CHICO",
      "tTelefono": "6218692",
      "tEmail": "marthalunapimiento@gmail.com",
      "tTipoAfiliacion": "Contributivo"
    };
  }

  fnGetPacienteByNumeroDocumento() {

    this.submitted = true;
    this.paciente = [];

    this.incapacityService.fnHttpGetPacienteByNumeroDocumento(this.token, this.user.documentNumber.trim(), this.user.documenttype.iIdTipoIdentificacion).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
        if (r.body != null) {
          this.search = false;
          this.paciente = JSON.parse(JSON.stringify(r.body));
          this.fnGetDiagnosicosIncapacidadByPaciente();
        }
        else {
          this.user.documentNumber = '';
          this.utilitiesService.showToast('bottom-right', 'danger', 'No se encuentra el número de documento!"', 'nb-alert');
        }
      }
      if (r.status == 206) {
        this.submitted = false;
        this.search = true;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      this.search = true;
      if (err.status == "401") {
        this.router.navigateByUrl('');
      }
      else {
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      }
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente() {
    this.submitted = true;
    this.incapacidades = [];
    var idPaciente = this.paciente.iIdpaciente;
    this.incapacityService.fnHttpGetDiagnosicosIncapacidadByPaciente(this.token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        this.option = 2;
        this.submitted = false;
        // this.incapacidades = JSON.parse(JSON.stringify(r.body));
        let incapacidades = JSON.parse(JSON.stringify(r.body));

        incapacidades.forEach((value, key) => {
          value.cie10.forEach((cievalue, ciekey) => {
            if (cievalue.iIdtipoCie === 1) {
              value['cie10_diagnotic'] = cievalue;
            }
          });
          this.incapacidades.push(value);
        });
        this.totalItems = this.incapacidades.length;
      }
      else if (r.status == 206) {
        this.submitted = false;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado el historial de incapacidades!');
    });
  }

  fnShowIncapacity(uiCodigoDiagnostico) {
    this.uiCodigoDiagnostico = uiCodigoDiagnostico;
    this.fnGetDiagnosicosIncapacidadByCodigoDiagnostico();
  }

  fnGetDiagnosicosIncapacidadByCodigoDiagnostico() {
    this.submitted = true;
    this.incapacityService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(this.token, this.uiCodigoDiagnostico).subscribe(r => {
      if (r.status == 200) {
        this.diagnostigoGenerado = JSON.parse(JSON.stringify(r.body));
        this.diagnostigoGenerado.codigoQR = this.utilitiesService.fnGetSite() + '/#/auth/login/' + this.diagnostigoGenerado.uiCodigoDiagnostico;
        this.diagnostigoGenerado.paciente = this.paciente;
        this.fnPreviewTranscription();
        this.submitted = false;
      }
      if (r.status == 206) {
        this.submitted = false;
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado el diagnostico!');
    });
  }

  fnValidField(field, data_field, field_data_length?) {
    // if (!data_field) {
    //   this.error_validate_form = true;
    // } else {
    //   this.error_validate_form = false;
    // }

    switch (field) {
      case 'documentNumber':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          // if (data_field.length > field_data_length ) {
          //   this.error_form[field]['data'] = false;
          //   this.error_form[field]['length'] = true;
          // } else {
          this.error_form[field]['data'] = false;
          this.error_form[field]['length'] = false;
          // }
        }
        break;
      case 'documentType':
        if (!data_field || data_field.iIdTipoIdentificacion == -1 || data_field.iIdTipoIdentificacion == '') {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          this.error_form[field]['data'] = false;
          this.error_form[field]['length'] = false;
        }
        break;
    }

  }

  /******** Star Preview Rehabilitation Concept *********/

  fnPreviewTranscription() {
    let self = this;
    this.dialogService.open(TranscriptionPrintComponent,
      {
        context: { diagnostigoGenerado: this.diagnostigoGenerado }
      }).onClose.subscribe((res) => {
      });
  }
  /******** End Preview Rehabilitation Concept *********/
}
