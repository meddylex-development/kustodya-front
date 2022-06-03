import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NbDialogService } from '@nebular/theme';

import { TranscriptionService } from '../../../shared/api/services/transcription.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TranscriptionIssuanceComponent } from '../transcription-issuance/transcription-issuance.component';
// import { GeneratedDiagnosticComponent } from '../generated-diagnostic/generated-diagnostic.component';
import { GeneratedDiagnosticComponent } from '../../incapacity/generated-diagnostic/generated-diagnostic.component';
import { TranscriptionPrintComponent } from '../../transcription/transcription-print/transcription-print.component';


@Component({
  selector: 'ngx-transcription-history',
  templateUrl: './transcription-history.component.html',
  styleUrls: ['./transcription-history.component.scss']
})
export class TranscriptionHistoryComponent implements OnInit {

  @Input() incapacidades: any = [];
  @Input() listCantidadDiagnoticosIncapacidad: any = [];
  @Input() paciente: any = null;

  submitted: boolean = false;
  totalItems: number;

  layout_component_display: String = 'grid';
  token: any;

  char1_title_gc = 'Cie10 - Días Incapacidad';
  char1_type_gc: string = 'PieChart';
  char1_dataChart_gc = [];
  char1_columnNames_gc = ['CIE10', 'DiasIncapacidad'];
  char1_width_gc = '500';
  char1_height_gc = '340';
  char1_options_gc = {
    hAxis: {},
    vAxis: { format: 'percent' },
    is3D: true,
    // pieSliceText: 'label',
    pieStartAngle: 100,
    // legend: 'none',
    legend: { 'position': 'right', 'alignment': 'center' },
    chartArea: { left: 0, right: 0, bottom: 0, top: 40 },
  };

  char2_title_gc = 'Cie10 - Incapacidades Emitidas';
  char2_type_gc: string = 'PieChart';
  char2_dataChart_gc = [];
  char2_columnNames_gc = ['CIE10', 'IncapacidadesEmitidas'];
  char2_width_gc = '500';
  char2_height_gc = '340';
  char2_options_gc = {
    hAxis: {},
    vAxis: { format: 'percent' },
    is3D: true,
    // pieSliceText: 'label',
    pieStartAngle: 100,
    // legend: 'none',
    legend: { 'position': 'right', 'alignment': 'center' },
    chartArea: { left: 0, right: 0, bottom: 0, top: 40 },
  };

  diagnostic: any = null;
  uiCodigoDiagnostico: any = null;
  esTranscripcion: any = null;


  constructor(private utilitiesService: UtilitiesService,
    private transcriptionService: TranscriptionService,
    private dashboardComponent: DashboardComponent,
    private transcriptionIssuanceComponent: TranscriptionIssuanceComponent,
    private dialogService: NbDialogService,
    public router: Router) { }

  ngOnInit() {
    this.token = this.dashboardComponent.token;
    this.fnGetCantidadDiagnoticosIncapacidadByPaciente();
  }
  fnSwitchViewData(state_view) {
    this.layout_component_display = state_view;
  }

  fnGetCantidadDiagnoticosIncapacidadByPaciente() {
    this.submitted = true;
    this.listCantidadDiagnoticosIncapacidad = [];
    var idPaciente = this.transcriptionIssuanceComponent.paciente.iIdpaciente;
    let self = this;
    this.transcriptionService.fnHttpGetCantidadDiagnoticosIncapacidadByPaciente(this.token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        self.submitted = false;
        self.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
        self.listCantidadDiagnoticosIncapacidad.forEach(i => {
          let itemDiasIncapacidad = [i.tCie10, i.iDiasIncapacidad];
          self.char1_dataChart_gc.push(itemDiasIncapacidad);
          let itemIncapacidadesEmitidas = [i.tCie10, i.iIncapacidadesEmitidas];
          self.char2_dataChart_gc.push(itemIncapacidadesEmitidas);
        });
      }
      else if (r.status == 206) {
        this.submitted = false;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente() {
    this.submitted = true;
    this.incapacidades = [];
    const idPaciente = this.transcriptionIssuanceComponent.paciente.iIdpaciente;
    this.transcriptionService.fnHttpGetDiagnosicosIncapacidadByPaciente(this.token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
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

  fnShowIncapacity(item) {
    this.uiCodigoDiagnostico = item.uiCodigoDiagnostico;
    this.esTranscripcion = item.esTranscripcion;
    this.fnGetDiagnosicosIncapacidadByCodigoDiagnostico();
  }

  fnPrevisualizar() {
    if (this.esTranscripcion) {
      this.fnGetIPS();
    }
    else {
      this.dialogService.open(GeneratedDiagnosticComponent,
        {
          context: { diagnostigoGenerado: this.diagnostic, showIncapacidad: true }
        }).onClose.subscribe((res) => {
        });
    }
  }

  fnGetIPS() {
    this.submitted = true;
    this.transcriptionService.fnHttpGetIPS(this.token, this.diagnostic.iIdips).subscribe(r => {
      if (r.status == 200) {
        this.diagnostic.ips = JSON.parse(JSON.stringify(r.body));
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
      this.utilitiesService.showToast('top-right', '', 'Error consultado la ips!');
    });
  }

  fnPreviewTranscription() {
    let self = this;
    this.dialogService.open(TranscriptionPrintComponent,
      {
        context: { diagnostigoGenerado: this.diagnostic }
      }).onClose.subscribe((res) => {
      });
  }

  fnGetDiagnosicosIncapacidadByCodigoDiagnostico() {
    this.submitted = true;
    let self = this;
    this.transcriptionService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(this.token, this.uiCodigoDiagnostico).subscribe(r => {
      if (r.status == 200) {
        self.diagnostic = JSON.parse(JSON.stringify(r.body));
        self.diagnostic.codigoQR = self.utilitiesService.fnGetSite() + '/#/auth/login/' + self.diagnostic.uiCodigoDiagnostico;
        self.submitted = false;
        if (self.paciente == null) {
          self.fnGetPacienteByID();
        }
        else {
          this.diagnostic.paciente = this.paciente;
          this.fnPrevisualizar();
        }
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      self.submitted = false;
      self.utilitiesService.showToast('top-right', '', 'Error consultado el diagnostico!');
    });
  }

  fnGetPacienteByID() {
    this.submitted = true;
    this.transcriptionService.fnHttpGetPacienteByID(this.token, this.diagnostic.iIdpaciente).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
        this.diagnostic.paciente = JSON.parse(JSON.stringify(r.body));
        this.fnPrevisualizar();
      }
      if (r.status == 206) {
        this.submitted = false;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
      if (err.status == "401") {
        this.router.navigateByUrl('');
      }
      else {
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      }
    });
  }
}
