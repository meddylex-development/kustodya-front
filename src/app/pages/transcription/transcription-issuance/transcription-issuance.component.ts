import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranscriptionService } from '../../../shared/api/services/transcription.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { DashboardComponent } from '../../dashboard/dashboard.component';
declare var $: any;

@Component({
  selector: 'ngx-transcription-issuance',
  templateUrl: './transcription-issuance.component.html',
  styleUrls: ['./transcription-issuance.component.scss']
})
export class TranscriptionIssuanceComponent implements OnInit, OnDestroy {

  required: Boolean = true;
  minlength: Number = 8;
  maxlength: Number = 50;
  aria_invalid: Boolean = true;

  submitted: boolean = false;
  totalItems: number;

  fechaActual = new Date();

  @Input() paciente: any = null;
  @Input() search: boolean = true;
  @Input() uiCodigoDiagnostico: any = null;
  readOnly: boolean = false;
  // tab: number = 1;
  diagnostic: any = null;
  incapacidades: any = [];
  list_Cie10: any = [];
  collection_cie_10: any = [];

  listCantidadDiagnoticosIncapacidad: any = [];

  list_origenIncapacidad: any = [];

  list_documentType: any = [{ id: 1, nombre: 'TI' }, { id: 2, nombre: 'CC' }];

  error_form: any = {
    'documentType': { 'data': false, 'length': false },
    'documentNumber': { 'data': false, 'length': false },
  };

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  token: any;
  data: any;

  ips: any = null;
  data_ips_id: any = null;
  data_ips_name: any = null;
  data_ips_code: any = null;
  data_dni: any = null;
  data_logo: any = null;

  tab_active: any = 1;

  constructor(
    private utilitiesService: UtilitiesService,
    private transcriptionService: TranscriptionService,
    private dashboardComponent: DashboardComponent,
    public router: Router) {
    this.user['documentNumber'] = '63324967';
    // this.data

    this.ips = this.utilitiesService.getIPS();
    this.data_ips_id = this.ips.iIdips;
    this.data_ips_name = this.ips.tNombre;
    this.data_ips_code = this.ips.tCodigoExterno;
    this.data_dni = this.ips.tNumeroIdentificacion;
    this.data_logo = this.ips.tPathLogo;

    this.utilitiesService.dataChange.subscribe((data) => {
      this.data_ips_id = data['ips']['iIdips'];
      this.data_ips_name = data['ips']['tNombre'];
      this.data_ips_code = data['ips']['tCodigoExterno'];
      this.data_dni = data['ips']['tNumeroIdentificacion'];
      this.data_logo = data['ips']['tPathLogo'];
      // this.tab_active = 1;
      // this.data = data['ips']['tNombre'];
      // this.data = data['ips']['tNombre'];

      // tPathLogo: "/images/imgs/ips_img_02.png"


    });
  }

  ngOnDestroy() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;

    $(document).ready(function () {
      // $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
      // $('.menu-sidebar').removeClass('d-block').addClass('d-none');
      $('#select-EPS').removeClass('d-none').addClass('d-block'); // Hide right sidebar to this component
      $('#select-IPS').removeClass('d-none').addClass('d-block'); // Hide right sidebar to this component
      // $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */
  }

  ngOnInit() {

    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;

    $(document).ready(function () {
      // $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
      // $('.menu-sidebar').removeClass('d-block').addClass('d-none');
      $('#select-EPS').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
      $('#select-IPS').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
      // $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */

    self.token = self.dashboardComponent.token;
    self.fnGetTiposIdentificacion();
    if (self.paciente != null) {
      self.readOnly = true;
      self.fnGetDiagnosicosIncapacidadByPaciente();
      self.fnGetDiagnosicosIncapacidadByCodigoDiagnostico();
      // self.tab_active = 3;
    } else if (self.uiCodigoDiagnostico != null) {
      self.readOnly = true;
      self.fnGetDiagnosicosIncapacidadByCodigoDiagnostico();
      // self.tab_active = 1;
    } else {
      self.readOnly = false;
      self.tab_active = 1;
    }
    self.fnGetCie10(1);
    // self.fnGetCie10(1);
    self.fnGetCie10(2);
    self.fnGetCie10(3);
    self.fnGetOrigenesIncapacidad();
  }

  fnGetTiposIdentificacion() {
    this.errors = [];
    this.submitted = true;
    this.transcriptionService.fnHttpGetTiposIdentificacion(this.token).subscribe((result) => {
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

  fnGetPacienteByID() {
    this.submitted = true;
    this.transcriptionService.fnHttpGetPacienteByID(this.token, this.diagnostic.iIdpaciente).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
        this.search = false;
        this.paciente = JSON.parse(JSON.stringify(r.body));
        this.fnGetDiagnosicosIncapacidadByPaciente(true);
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

  fnGetPacienteByNumeroDocumento() {

    this.submitted = true;
    this.paciente = [];

    this.transcriptionService.fnHttpGetPacienteByNumeroDocumento(this.token, this.user.documentNumber.trim(), this.user.documenttype.iIdTipoIdentificacion).subscribe(r => {
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
      this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente(tab3?: boolean) {
    this.submitted = true;
    this.incapacidades = [];
    var idPaciente = this.paciente.iIdpaciente;
    this.transcriptionService.fnHttpGetDiagnosicosIncapacidadByPaciente(this.token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
        // this.incapacidades = JSON.parse(JSON.stringify(r.body));
        // // this.totalItems = this.incapacidades.length || 0;

        let incapacidades = JSON.parse(JSON.stringify(r.body));

        incapacidades.forEach((value, key) => {
          value.cie10.forEach((cievalue, ciekey) => {
            if (cievalue.iIdtipoCie === 1) {
              value['cie10_diagnotic'] = cievalue;
            }
          });
          this.incapacidades.push(value);
        });

        this.totalItems = (this.incapacidades) ? this.incapacidades.length : 0;
        if (tab3) {
          this.tab_active = 3;
        }
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

  fnGetDiagnosicosIncapacidadByCodigoDiagnosticoMock() {
    this.diagnostic = {
      "iIddiagnosticoIncapacidad": 60,
      "uiCodigoDiagnostico": "17c2d190-fb7d-4c8e-ac86-38982a97e9ad",
      "iIdpaciente": 2,
      "cie10": {
        "iIdcie10": 203,
        "tCie10": "A429",
        "tDescripcion": "Actinomicosis, sin otra especificación",
        "iDiasMaxConsulta": 10,
        "tFullDescripcion": "A429 - Actinomicosis, sin otra especificación"
      },
      "origenIncapacidad": {
        "iIdOrigenIncapacidad": 3551,
        "tOrigenIncapacidad": "Enfermedad laboral"
      },
      "tDescripcionSintomatologica": "sdgfg",
      "iDiasIncapacidad": 10,
      "dtFechaCreacion": "2019-09-04T11:05:50.983",
      "dtFechaFin": "2019-09-14T11:05:50.983"
    };
    if (this.paciente == null) {
      this.fnGetPacienteByID();
    }
    else {
      this.tab_active = 3;
    }
  }

  fnGetDiagnosicosIncapacidadByCodigoDiagnostico() {
    this.submitted = true;
    this.transcriptionService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(this.token, this.uiCodigoDiagnostico).subscribe(r => {
      if (r.status == 200) {
        this.diagnostic = JSON.parse(JSON.stringify(r.body));
        this.diagnostic.codigoQR = this.utilitiesService.fnGetSite() + '/#/auth/login/' + this.diagnostic.uiCodigoDiagnostico;
        this.submitted = false;
        if (this.paciente == null) {
          this.fnGetPacienteByID();
        }
        else {
          this.tab_active = 3;
        }
      }
      if (r.status == 206) {
        this.submitted = false;
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado el diagnostico!');
      //this.fnGetDiagnosicosIncapacidadByCodigoDiagnosticoMock();
    });
  }

  fnGetCie10(type_cie10) {
    this.errors = [];
    this.submitted = true;
    this.transcriptionService.fnHttpGetCie10(this.token, type_cie10).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        this.list_Cie10 = result.body;
        let new_item: any = { iIdcie10: -1, tFullDescripcion: '' };
        this.list_Cie10.unshift(new_item);
        this.collection_cie_10[type_cie10 - 1] = result.body;
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
    });
  }

  fnGetOrigenesIncapacidad() {
    this.errors = [];
    this.submitted = true;
    this.transcriptionService.fnHttpGetOrigenesIncapacidad(this.token).subscribe((result) => {
      this.submitted = false;
      if (result.status == 200) {
        this.list_origenIncapacidad = result.body;//.slice(1, 100);
        let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        this.list_origenIncapacidad.unshift(new_item);
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los origenes de incapacidad', 'nb-alert');
      }
      this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      this.submitted = false;
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

}
