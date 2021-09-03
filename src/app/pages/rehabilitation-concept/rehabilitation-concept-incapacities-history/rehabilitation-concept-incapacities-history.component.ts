import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { TranscriptionService } from '../../../shared/api/services/transcription.service';
import { GeneratedDiagnosticComponent } from '../../incapacity/generated-diagnostic/generated-diagnostic.component';
import { TranscriptionPrintComponent } from '../../transcription/transcription-print/transcription-print.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-rehabilitation-concept-incapacities-history',
  templateUrl: './rehabilitation-concept-incapacities-history.component.html',
  styleUrls: ['./rehabilitation-concept-incapacities-history.component.scss'],
})
export class RehabilitationConceptIncapacitiesHistoryComponent implements OnInit {

  list_patients: any = [];
  list_patients_original: any = [];
  totalItems: any = 7;
  currentPage: any = 1;
  numItemsPage: any = 10;
  search_input: any = '';
  prevPage: any = null;
  nextNext: any = null;
  patient_id: any = null;
  public current_payload: string = null;
  @Input() data_object_tab: any;
  // @Output() flagCreateEntity = new EventEmitter<object>();
  // @Output() dataEntity = new EventEmitter<object>();
  // @Input() dataEntityTab: any;

  loading_state: Boolean = false;
  diagnostic: any = null;
  uiCodigoDiagnostico: any = null;
  esTranscripcion: any = null;
  paciente: any = null;

  constructor(
    private incapacityService: IncapacityService,
    private utilitiesService: UtilitiesService,
    public rehabilitationConceptService: RehabilitationConceptService,
    private transcriptionService: TranscriptionService,
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    // self.dataEntityTab
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        // idPaciente: 2
        // idpacienteporemitir: 56
        self.patient_id = self.data_object_tab['idPaciente'];
        self.fnGetList(self.current_payload, self.search_input, self.currentPage);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetList(current_payload, search_input, current_page) {
    const self = this;
    self.loading_state = true;
    // self.list_patients = [
    //   { 'codigoUnico': 23423423, 'fechaInicio': 7673287387, 'fechaFin': 7673287387, 'diasAcumulados': 10, 'diasOtorgados': 25, 'CIE10': 'Aneurisma', 'descripcionSintomatologica': 'qwertyuioasdfghjklzxcvbnklñiop' },
    //   { 'codigoUnico': 54645323, 'fechaInicio': 7673287387, 'fechaFin': 7673287387, 'diasAcumulados': 12, 'diasOtorgados': 9, 'CIE10': 'Aneurisma', 'descripcionSintomatologica': 'qwertyuioasdfghjklzxcvbnklñiop' },
    //   { 'codigoUnico': 97846310, 'fechaInicio': 7673287387, 'fechaFin': 7673287387, 'diasAcumulados': 8, 'diasOtorgados': 14, 'CIE10': 'Aneurisma', 'descripcionSintomatologica': 'qwertyuioasdfghjklzxcvbnklñiop' },
    //   { 'codigoUnico': 10435999, 'fechaInicio': 7673287387, 'fechaFin': 7673287387, 'diasAcumulados': 4, 'diasOtorgados': 32, 'CIE10': 'Aneurisma', 'descripcionSintomatologica': 'qwertyuioasdfghjklzxcvbnklñiop' },
    // ]
    self.rehabilitationConceptService.fnHttpGetListHistoryIncapacitiesByPatientId(self.patient_id, current_payload, current_page, search_input, self.numItemsPage).subscribe(resp_get_patients => {
      if (resp_get_patients.status == 200) {
        // self.search_input = '';
        self.list_patients = JSON.parse(JSON.stringify(resp_get_patients.body['diagnosticoIncapacidadOutputModels']));
        self.list_patients_original = JSON.parse(JSON.stringify(resp_get_patients.body['diagnosticoIncapacidadOutputModels']));
        self.totalItems = resp_get_patients.body['paginacion']['totalItems'];
        self.numItemsPage = resp_get_patients.body['paginacion']['itemsPorPagina'];
        self.currentPage = resp_get_patients.body['paginacion']['paginaActual'];
        self.prevPage = resp_get_patients.body['paginacion']['anterior'];
        self.nextNext = resp_get_patients.body['paginacion']['siguiente'];
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 1) {
      self.fnGetList(self.current_payload, text_search, self.currentPage);
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      text_search = '';
      self.fnGetList(self.current_payload, text_search, self.currentPage);
    }
  }

  getPage(page) {
    const self = this;
    self.currentPage = page;
    self.fnGetList(self.current_payload, self.search_input, self.currentPage);
  }

  fnShowIncapacity(data_patient) {
    this.uiCodigoDiagnostico = data_patient.codigoUnico;
    this.esTranscripcion = false;
    this.fnGetDiagnosicosIncapacidadByCodigoDiagnostico();
  }

  fnGetDiagnosicosIncapacidadByCodigoDiagnostico() {
    const self = this;
    this.loading_state = false;
    self.incapacityService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(self.current_payload, self.uiCodigoDiagnostico).subscribe(r => {
      if (r.status == 200) {
        self.diagnostic = JSON.parse(JSON.stringify(r.body));
        self.diagnostic.codigoQR = self.utilitiesService.fnGetSite() + '/#/auth/login/' + self.diagnostic.uiCodigoDiagnostico;
        self.loading_state = false;
        if (self.paciente == null) {
          self.fnGetPacienteByID();
        } else {
          self.diagnostic.paciente = self.paciente;
          this.fnPrevisualizar();
        }
      }
      if (r.status == 206) {
        self.loading_state = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      self.loading_state = false;
      self.utilitiesService.showToast('top-right', '', 'Error consultado el diagnostico!');
    });
  }

  fnGetPacienteByID() {
    this.loading_state = true;
    this.incapacityService.fnHttpGetPacienteByID(this.current_payload, this.diagnostic.iIdpaciente).subscribe(r => {
      if (r.status == 200) {
        this.loading_state = false;
        this.diagnostic.paciente = JSON.parse(JSON.stringify(r.body));
        this.fnPrevisualizar();
      }
      if (r.status == 206) {
        this.loading_state = false;
        const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.loading_state = false;
      if (err.status == "401") {
        this.router.navigateByUrl('');
      }
      else {
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      }
    });
  }

  fnPrevisualizar() {
    if (this.esTranscripcion) {
      this.fnGetIPS();
    } else {
      this.dialogService.open(GeneratedDiagnosticComponent,
        {
          context: { diagnostigoGenerado: this.diagnostic, showIncapacidad: true }
        }).onClose.subscribe((res) => {
        });
    }
  }

  fnGetIPS() {
    this.loading_state = true;
    this.transcriptionService.fnHttpGetIPS(this.current_payload, this.diagnostic.iIdips).subscribe(r => {
      if (r.status == 200) {
        this.diagnostic.ips = JSON.parse(JSON.stringify(r.body));
        this.fnPreviewTranscription();
        this.loading_state = false;
      }
      if (r.status == 206) {
        this.loading_state = false;
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.loading_state = false;
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


}
