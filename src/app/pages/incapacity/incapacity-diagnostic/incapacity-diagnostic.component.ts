import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IncapacityIssuanceComponent } from '../incapacity-issuance/incapacity-issuance.component';
import { GeneratedDiagnosticComponent } from '../generated-diagnostic/generated-diagnostic.component';
// import { Validators } from 'powerbi-models';
declare var $: any;

@Component({
  selector: 'ngx-incapacity-diagnostic',
  templateUrl: './incapacity-diagnostic.component.html',
  styleUrls: ['./incapacity-diagnostic.component.scss']
})

export class IncapacityDiagnosticComponent implements OnInit {

  errors: string[] = [];
  submitted: boolean = false;
  token: any;
  menu: any;

  @Input() list_Cie10: any = [];
  @Input() collection_cie_10: any = [];
  @Input() list_origenIncapacidad: any = [];
  @Input() paciente: any = null;
  current_cie10: number;
  error_cie10 = false;
  error_origenIncapacidad = false;
  errors_DiasIncapacidad = false;

  required = true;
  @Input() diagnostic: any = null;
  @Input() readOnly: boolean = false;
  diagnostigoGenerado: any = {};
  Idcie10: number = -1;
  IdOrigenIncapacidad: number = -1;
  iDiasIncapacidad: any = '';
  tDescripcionSintomatologica: any = '';
  codigoQR: string;

  id_cie_10_symptom: any = 'Seleccione síntoma';
  id_cie_10_signs: any = 'Seleccione signo';
  id_cie_10_diagnosis: any = 'Seleccione diagnóstico';

  diagnostic_time: any = '';
  diagnostic_mode: any = '';
  diagnostic_place: any = '';

  collection_diagnosis_complete: any = [];
  collection_cie10: any = {};

  error_validate_form: any = true;
  collection_cie10_original: any = [];
  attention_type: any = null;
  soat_insurance: any = false;

  error_form: any = {
    'diagnostic_time': { 'data': false, 'length': false },
    'diagnostic_mode': { 'data': false, 'length': false },
    'diagnostic_place': { 'data': false, 'length': false },
    'id_cie_10_symptom': { 'data': false, 'length': false },
  };

  text_time_pattern: String = '^((\\+91-?)|0)?[0-9]{10}$';
  ibc_value: any = '3000000';
  list_incapacity_attention_types: any = [];
  incapacity_value: any = 0;

  list_emission_types: any = [
    {
      "tIdTipoEmision": "1",
      "tTipoEmision": "Primario",
    },
    {
      "tIdTipoEmision": "2",
      "tTipoEmision": "Transcripción ",
    },
  ];

  emission_type: any = null;

  origin_incapacity_presumed: any = null;
  origin_incapacity_qualified: any = null;
  user_id: any = null;
  data_correlation_diagnostic: any = null;

  // diagnosticform: FormGroup;
  constructor(private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private dashboardComponent: DashboardComponent,
    private incapacityIssuanceComponent: IncapacityIssuanceComponent,
    private dialogService: NbDialogService,
    public router: Router) { }

  ngOnInit() {
    // this.diagnosticform = this.createFormGroup();

    if (this.paciente == null) {
      this.paciente = this.incapacityIssuanceComponent.paciente
    }
    this.user_id = sessionStorage.getItem('user_id');
    this.collection_cie10['symptoms'] = [];
    this.collection_cie10['signs'] = [];
    this.collection_cie10['diagnostics'] = [];
    this.token = this.dashboardComponent.token;
    if (this.diagnostic != null) {
      this.Idcie10 = this.diagnostic.cie10.iIdcie10;
      let index_symptoms = 0;
      let index_signs = 0;
      let index_diagnostics = 0;
      this.diagnostic.cie10.forEach(element => {
        if (element.iIdtipoCie == 2) {
          element.index_symptoms = index_symptoms;
          this.collection_cie10['symptoms'].push(element);
        }
        if (element.iIdtipoCie == 3) {
          element.index_signs = index_signs;
          this.collection_cie10['signs'].push(element);
        }
        if (element.iIdtipoCie == 1) {
          element.index_diagnostics = index_diagnostics;
          this.collection_cie10['diagnostics'].push(element);
        }
        index_symptoms = index_symptoms + 1;
        index_signs = index_signs + 1;
        index_diagnostics = index_diagnostics + 1;
      });
      this.Idcie10 = this.diagnostic.cie10.iIdcie10;
      // this.IdOrigenIncapacidad = this.diagnostic.origenIncapacidad.iIdOrigenIncapacidad;
      this.tDescripcionSintomatologica = this.diagnostic.tDescripcionSintomatologica;
      this.iDiasIncapacidad = this.diagnostic.iDiasIncapacidad;
      this.codigoQR = this.diagnostic.codigoQR;
      this.diagnostic.tipoEmision = this.list_emission_types[0];

      this.diagnostigoGenerado = this.diagnostic;
      this.diagnostigoGenerado.paciente = this.paciente;
    } else {
      this.fnClearForm();
      this.fnGetIncapacityAttentionTypes();
      this.collection_cie_10[0].forEach((value, key) => {
        value.key = key;
        if (value.iIdcie10 !== -1) {
          this.collection_cie_10[0][key] = value;
        }
      });
      this.collection_cie_10[1].forEach((value, key) => {
        value.key = key;
        if (value.iIdcie10 !== -1) {
          this.collection_cie_10[1][key] = value;
        }
      });
      this.collection_cie_10[2].forEach((value, key) => {
        value.key = key;
        if (value.iIdcie10 !== -1) {
          this.collection_cie_10[2][key] = value;
        }
      });
      this.collection_cie10_original = JSON.parse(JSON.stringify(this.collection_cie_10));
    }
  }

  fnClearForm() {
    this.diagnostic = {};
    this.iDiasIncapacidad = '';
    this.tDescripcionSintomatologica = '';
    this.Idcie10 = -1;
    this.IdOrigenIncapacidad = -1;
  }

  onChangeCie10() {
    if (this.Idcie10 <= 0) {
      $('#select-Cie10').addClass('ng-invalid');
      $('#select-Cie10').addClass('ng-touched');
      this.error_cie10 = true;
    }
    else if (this.Idcie10 > 0) {
      this.error_cie10 = false;
      $('#select-Cie10').removeClass('ng-invalid');
      $('#select-Cie10').removeClass('ng-touched');
      this.diagnostic.cie10 = this.list_Cie10.filter(c => c.iIdcie10 == this.Idcie10)[0];
    }
  }

  onChangeOrigenIncapacidad() {
    if (this.IdOrigenIncapacidad <= 0) {
      $('#select-origenIncapacidad').addClass('ng-invalid');
      $('#select-origenIncapacidad').addClass('ng-touched');
      this.error_origenIncapacidad = true;
    }
    else if (this.IdOrigenIncapacidad > 0) {
      this.error_origenIncapacidad = false;
      $('#select-origenIncapacidad').removeClass('ng-invalid');
      $('#select-origenIncapacidad').removeClass('ng-touched');
      this.diagnostic.origenIncapacidad = this.list_origenIncapacidad.filter(c => c.iIdOrigenIncapacidad == this.IdOrigenIncapacidad)[0];
    }
  }

  onChangeDiasIncapacidad() {
    if (this.iDiasIncapacidad < 0 || this.iDiasIncapacidad > this.diagnostic.cie10.iDiasMaxConsulta) {
      $('#input-DiasIncapacidad').addClass('input-danger');
      this.errors_DiasIncapacidad = true;
    }
    else if (this.iDiasIncapacidad >= 0 && this.iDiasIncapacidad <= this.diagnostic.cie10.iDiasMaxConsulta) {
      this.errors_DiasIncapacidad = false;
      $('#input-DiasIncapacidad').removeClass('input-danger');
    }
  }

  generateDiagnostic() {

    const fechaActual = new Date();
    const data_ips = JSON.parse(sessionStorage.getItem('ips'));
    const data_cie10 = (this.collection_diagnosis_complete['symptom'].concat(this.collection_diagnosis_complete['signs'])).concat(this.collection_diagnosis_complete['diagnosis']);

    const object_data = {
      'iIddiagnosticoIncapacidad': 0,
      'uiCodigoDiagnostico': null,
      'tCodigoCorto': '',
      'iIdpaciente': this.paciente.iIdpaciente,
      'iIdips': data_ips['iIdips'],
      'cie10': data_cie10,
      'tTiempo': this.diagnostic_time,
      'tModo': this.diagnostic_mode,
      'tLugar': this.diagnostic_place,
      'presuntoOrigenIncapacidad': this.origin_incapacity_presumed,
      'origenCalificadoIncapacidad': this.origin_incapacity_qualified,
      'tipoAtencion': this.attention_type,
      'tDescripcionSintomatologica': this.tDescripcionSintomatologica,
      'iDiasIncapacidad': this.iDiasIncapacidad,
      'iDiasAcumuladosPorroga': this.data_correlation_diagnostic['iDiasAcumuladosPorroga'],
      'dtFechaCreacion': fechaActual,
      'dtFechaFin': fechaActual,
      'bProrroga': this.data_correlation_diagnostic['bProrroga'],
      'bsoat': this.soat_insurance,
    };
    // return false;
    this.submitted = true;
    this.incapacityService.fnHttpPostDiagnosticosIncapacidad(this.token, object_data).subscribe(r => {
      if (r.status == 200) {
        // this.diagnostic = {};
        // this.Idcie10 = -1;
        // this.IdOrigenIncapacidad = -1;
        this.submitted = false;
        this.diagnostigoGenerado = r.body;
        this.diagnostigoGenerado.paciente = this.paciente;
        this.diagnostigoGenerado.diagnostico = object_data.cie10;
        this.showModalGeneratedDiagnostic();
      }
      if (r.status == 206) {
        this.submitted = false;
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
    });

  }

  showModalGeneratedDiagnostic() {
    let self = this;
    this.diagnostigoGenerado.codigoQR = this.utilitiesService.fnGetSite() + '/#/auth/login/' + this.diagnostigoGenerado.uiCodigoDiagnostico;
    this.dialogService.open(GeneratedDiagnosticComponent, { context: { diagnostigoGenerado: this.diagnostigoGenerado, showIncapacidad: true } }).onClose.subscribe((res) => {
      self.incapacityIssuanceComponent.search = true;
      self.incapacityIssuanceComponent.paciente = null;
      self.incapacityIssuanceComponent.diagnostic = null;
      self.incapacityIssuanceComponent.incapacidades = null;
      self.incapacityIssuanceComponent.user.documentNumber = '';
    });
  }

  fnVerIncapacidad() {
    let self = this;
    this.dialogService.open(GeneratedDiagnosticComponent,
      {
        context: { diagnostigoGenerado: this.diagnostigoGenerado, showIncapacidad: true }
      }).onClose.subscribe((res) => {
        // self.incapacityIssuanceComponent.search = true;
        // self.incapacityIssuanceComponent.paciente = null;
        // self.incapacityIssuanceComponent.diagnostic = null;
        // self.incapacityIssuanceComponent.incapacidades = null;
        // self.incapacityIssuanceComponent.user.documentNumber = '';
      });
  }





  fnAddCollectionCompleteDiagnosis(type_list, item_list, collection_items, event_target) {
    const data = JSON.parse(JSON.stringify(collection_items));
    // data.forEach((value, key) => {
    //   if (value.iIdcie10 == item_list.iIdcie10) {
    //     data.splice(key, 1);
    //     this.collection_cie_10[1] = data;
    //   }
    // });
    if (this.collection_diagnosis_complete[type_list]) {
      if (this.collection_diagnosis_complete[type_list].length <= 4) {
        // this.collection_cie_10[item_list.iIdtipoCie].splice(item_list.key, 1);
        this.collection_diagnosis_complete[type_list].push(item_list);
      }
    } else {
      // this.collection_cie_10[item_list.iIdtipoCie -1].splice(item_list.key, 1);
      this.collection_diagnosis_complete[type_list] = [];
      this.collection_diagnosis_complete[type_list].push(item_list);
    }
    // const collection_diagnosis_complete = [];
    // collection_diagnosis_complete[type_list] = [];
    // collection_diagnosis_complete[type_list].push(item_list);
    // this.collection_diagnosis_complete = collection_diagnosis_complete;
  }

  fnAddCollectionDiagnosis(type_list, item_list) {

    this.collection_diagnosis_complete[type_list] = [];
    this.collection_diagnosis_complete[type_list].push(item_list);
    // if (this.collection_diagnosis_complete[type_list]) {
    //   if (this.collection_diagnosis_complete[type_list].length < 1) {
    //     this.collection_diagnosis_complete[type_list].push(item_list);
    //   } else {
    //   }
    // } else {
    //   this.collection_diagnosis_complete[type_list] = [];
    //   this.collection_diagnosis_complete[type_list].push(item_list);
    // }
  }


  fnRemoveItemCollectionDiagnosisComplete(index, type_list, item_collection, collection_type_diagnosis) {
    // collection_type_diagnosis.splice(index, 1);
    let data_collection_diagnosis = null;
    data_collection_diagnosis = JSON.parse(JSON.stringify(collection_type_diagnosis));
    data_collection_diagnosis.splice(index, 1);
    this.collection_diagnosis_complete[type_list] = data_collection_diagnosis;
    this.diagnostic['cie10']['iDiasMaxConsulta'] = 0;
  }

  fnOnResetForm() {
    // this.diagnosticform.reset();
  }

  fnOnSaveForm() {
  }

  fnValidField(field, data_field, field_data_length?) {
    // if (!data_field) {
    //   this.error_validate_form = true;
    // } else {
    //   this.error_validate_form = false;
    // }

    switch (field) {
      case 'diagnostic_time':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          if (data_field.length > field_data_length) {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = true;
          } else {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = false;
          }
        }
        break;
      case 'diagnostic_mode':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          if (data_field.length > field_data_length) {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = true;
          } else {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = false;
          }
        }
        break;
      case 'diagnostic_place':
        if (!data_field) {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          if (data_field.length > field_data_length) {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = true;
          } else {
            this.error_form[field]['data'] = false;
            this.error_form[field]['length'] = false;
          }
        }
        break;
      case 'id_cie_10_symptom':
        if (!data_field || data_field.iIdcie10 == -1 || data_field.iIdcie10 == '') {
          this.error_form[field]['data'] = true;
          this.error_form[field]['length'] = false;
        } else {
          this.error_form[field]['data'] = false;
          this.error_form[field]['length'] = false;
        }
        break;
    }

  }

  public selected(value: any): void {
  }

  fnValidDays(days) {
    this.iDiasIncapacidad = null;
    const days_new = JSON.parse(JSON.stringify(days));
    // if (days == null) {
    //   this.iDiasIncapacidad = this.id_cie_10_diagnosis['iDiasMaxConsulta'];
    // } else {
    if (days_new > this.id_cie_10_diagnosis['iDiasMaxConsulta']) {
      this.iDiasIncapacidad = this.id_cie_10_diagnosis['iDiasMaxConsulta'];
    }
    else if (days_new < 1) {
      this.iDiasIncapacidad = 1;
    }
    else {
      this.iDiasIncapacidad = days_new;
    }
    this.fnSetIncapacityValue();
    // }
  }

  fnSetIncapacityValue() {
    if (this.iDiasIncapacidad > 3) {
      let data = (parseInt(this.ibc_value) / 30) * 0.6666;
      this.incapacity_value = (data * (this.iDiasIncapacidad - 3));
    } else {
      this.incapacity_value = 0;
    }
  }

  fnGetIncapacityAttentionTypes() {
    this.submitted = true;
    this.incapacityService.fnHttpGetListIncapacityAttentionTypes(this.token).subscribe(r => {
      this.list_incapacity_attention_types = JSON.parse(JSON.stringify(r.body));
      this.submitted = false;
    }, err => {
      this.submitted = false;
    });
  }

  fnGetCorrelationDiagnostic(cie_10) {
    this.submitted = true;
    this.data_correlation_diagnostic = null;
    let id_cie_10 = cie_10['iIdcie10'];
    this.incapacityService.fnHttpGetCorrelationDiagnostic(this.token, id_cie_10, this.paciente.iIdpaciente).subscribe(r => {
      this.data_correlation_diagnostic = JSON.parse(JSON.stringify(r.body));
      this.submitted = false;
    }, err => {
      this.submitted = false;
    });
  }
}