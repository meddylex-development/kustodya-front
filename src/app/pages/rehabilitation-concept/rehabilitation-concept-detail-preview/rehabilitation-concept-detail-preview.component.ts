import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
//This is required
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'ngx-rehabilitation-concept-detail-preview',
  templateUrl: './rehabilitation-concept-detail-preview.component.html',
  styleUrls: ['./rehabilitation-concept-detail-preview.component.scss']
})
export class RehabilitationConceptDetailPreviewComponent implements OnInit {

  @Input() diagnostigoGenerado: any;
  @Input() showIncapacidad: boolean = true;
  @Input() data: any;
  @Input() status_list: boolean = true;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<RehabilitationConceptDetailPreviewComponent>,
    private utilitiesService: UtilitiesService,
    public rehabilitationConceptService: RehabilitationConceptService,
    private sanitizer: DomSanitizer,
  ) { }

  sintomas: any = [];
  signos: any = [];
  diagnostico: string = '';
  token: any = null;

  eps: any = {};
  ips: any = {};
  ips_user: any = null;
  age: string = '';
  days: any;
  months: any;
  years: any;

  user: any = {};
  user_data: any = null;
  patient_id: any = null;
  object_data_patient: any = {
    'diasAcumulados': 0,
    'conceptosEmitidos': 0,
    'pclCalificados': 0,
    'apellidos': '',
    'nombres': '',
    'tipoDocumento': '',
    'numeroDocumento': '',
    'fechaNacimiento': 0,
    'edad': null,
    'arl': '',
    'afp': '',
    'eps': '',
    'diagnosticos': [],
    'historiaClinica': '',
    'finalidadTratmamiento': '',
    'farmacologico': '',
    'terapiaOcupacional': '',
    'fonoAudiologia': '',
    'quirurgico': '',
    'terapiaFisica': '',
    'otrosTramites': '',
    'otrosTratamientos': '',
    'cortoPlazo': '',
    'medianoPlazo': '',
    'concepto': '',
  };

  collection_etiology: any = [
    // {'value': 1, 'name': 'Autoinmune'},
    // {'value': 2, 'name': 'Congenita'},
    // {'value': 3, 'name': 'Cardiovascular'},
    // {'value': 4, 'name': 'Degenerativa'},
    // {'value': 5, 'name': 'Inflamatoria'},
    // {'value': 6, 'name': 'Mental'},
    // {'value': 7, 'name': 'Metabolica'},
    // {'value': 8, 'name': 'Neoplastica'},
    // {'value': 9, 'name': 'Traumatica'},
    // {'value': 10, 'name': 'Vascular'},
  ];
  collection_type_sequel: any = [
    // {'value': 1, 'name': 'Anatomica'},
    // {'value': 2, 'name': 'Funcional'},
  ];
  collection_medical_prognosis: any = [
    // {'value': 1, 'name': 'Bueno'},
    // {'value': 2, 'name': 'Regular'},
    // {'value': 3, 'name': 'Malo'},
  ];
  collection_medical_treatment: any = [
    // {'value': 1, 'name': 'Paliativo'},
    // {'value': 2, 'name': 'Curativo'},
  ];
  collection_medical_concept: any = [
    {'value': null, 'name': 'Seleccione concepto'},
    // {'value': 1, 'name': 'Favorable'},
    // {'value': 2, 'name': 'Desfavorable'},
  ];
  collection_diagnotics_patient: any = [];
  collection_sequels_patient: any = [];

  ngOnInit() {

    const self = this;


    // self.diagnostico = self.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 1)[0].tFullDescripcion;
    // self.sintomas = self.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 2);
    // self.signos = self.diagnostigoGenerado.cie10.filter(d => d.iIdtipoCie == 3);
    // self.user_data = JSON.parse(sessionStorage.getItem('user_data'));
    // self.ips_user = JSON.parse(sessionStorage.getItem('ips'));

    // self.diagnostigoGenerado.tLugarExpedicion = "Cundinamarca - Bogota D.C";
    // self.diagnostigoGenerado.tshortIncapacityNumber = "101603-17";
    // self.diagnostigoGenerado.paciente.tRegimenAfiliacion = "Cotizante";
    // self.diagnostigoGenerado.paciente.tdireccionRecidencia = "Cll 152  # 111 - 33";
    // self.diagnostigoGenerado.paciente.tdepartamento = "Cundinamarca";
    // self.diagnostigoGenerado.paciente.tmunicipio = "Bogota D.C";
    // self.diagnostigoGenerado.paciente.tCargo = "Desarrollador";
    // self.diagnostigoGenerado.paciente.empresa = {};
    // self.diagnostigoGenerado.paciente.empresa.tNombre = "Roojo-tech";
    // self.diagnostigoGenerado.paciente.empresa.tActividadEconomica = "Desarrollo Tecnologico";

    // self.ips = self.utilitiesService.getIPS();
    // self.eps = self.diagnostigoGenerado.eps;
    // self.ips = self.diagnostigoGenerado.ips;
    // self.user = JSON.parse(self.utilitiesService.fnGetUser());
    // self.user.tEspecialidad = self.user.usuario.ocupacion.tNombre;
    // self.user.tRegistroMedico = self.user.usuario.ocupacion.numeroRegistroProfesional;
    // const signature_doctor = (self.user.usuario.documento.imagen) ? 'data:image/png;base64, ' + self.user.usuario.documento.imagen : null;
    // self.user.tfirma = (signature_doctor) ? self.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;

    // const s = self.diagnostigoGenerado.paciente.dtFechaNacimiento.slice(0, 10);//d.toJSON().slice(0, 10);
    // self.getAge(s)
    // self.age = self.years + ' años / ' + self.months + ' meses / ' + self.days + ' dias'

    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        // self.data_object_tab
        // self.state_concept = self.data_object_tab['estado'];
        // self.object_data_patient['medical_concept']['pronosticoConceptoId'] = 1;
        // self.collection_cie_10
        self.patient_id = self.data['idPaciente']; // 1-idPaciente 2-idpacienteporemitir
        self.fnGetListEtiologies(self.token);
        self.fnGetListTypeSequels(self.token);
        self.fnGetListMedicalPrognosis(self.token);
        self.fnGetListMedicalTreatments(self.token);
        self.fnGetListMedicalConcept(self.token);
        self.fnGetDataPatientById(self.patient_id, self.token);
      } else {
        // self.router.navigateByUrl('');
      }
    });
  }

  fnGetListEtiologies(token) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpGetDataEtiologiesEnum(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_etiology = response['body'];
      } else {
        this.collection_etiology = response['body'];
      }
    }, err => {
    });
  }

  fnGetListTypeSequels(token) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpGetDataTypeSequelsEnum(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_type_sequel = response['body'];
      } else {
        this.collection_type_sequel = response['body'];
      }
    }, err => {
    });
  }

  fnGetListMedicalPrognosis(token) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpGetDataMedicalPrognosisEnum(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_medical_prognosis = response['body'];
      } else {
        this.collection_medical_prognosis = response['body'];
      }
    }, err => {
    });
  }

  fnGetListMedicalTreatments(token) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpGetDataMedicalTreatmentsEnum(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_medical_treatment = response['body'];
      } else {
        this.collection_medical_treatment = response['body'];
      }
    }, err => {
    });
  }

  fnGetListMedicalConcept(token) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpGetDataMedicalConceptEnum(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_medical_concept = response['body'];
        // this.collection_medical_concept = this.collection_medical_concept.concat(response['body']);
        this.object_data_patient['medical_concept'] = {
          'pronosticoConceptoId': 1,
          'descripcionPronostico': 'Favorable',
          'texto': 'Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico favorable',
        };
      } else {
        // this.collection_medical_concept = response['body'];
      }
    }, err => {
    });
  }

  fnGetDataPatientById(patient_id, token) {
    const self = this;
    // self.loading_state = true;
    self.rehabilitationConceptService.fnHttpGetDataPatientById(token, patient_id).subscribe(response => {
      if (response.status == 200) {
        // self.loading_state = false;
        // self.utilitiesService.showToast('top-right', 'success', 'Información actualizada satisfactoriamente', 'nb-alert');
        self.object_data_patient = response['body'];
        self.object_data_patient['medical_treatment'] = self.collection_medical_treatment.find(x => x.value === response['body']['finalidadTratmamiento'])['name'];
        self.object_data_patient['check_pharmacological'] =  response['body']['farmacologico'];
        self.object_data_patient['check_occupational_therapy'] =  response['body']['terapiaOcupacional'];
        self.object_data_patient['check_speech_therapy'] =  response['body']['fonoAudiologia'];
        self.object_data_patient['check_surgical'] =  response['body']['quirurgico'];
        self.object_data_patient['check_physical_therapy'] =  response['body']['terapiaFisica'];
        self.object_data_patient['check_other_therapy'] =  response['body']['otrosTramites'];
        self.object_data_patient['short_term'] =  response['body']['cortoPlazo'];
        self.object_data_patient['medium_term'] =  response['body']['medianoPlazo'];
        self.object_data_patient['medical_concept'] =  self.collection_medical_concept.find(x => x.pronosticoConceptoId === response['body']['concepto'])['descripcionPronostico'];
        self.object_data_patient['text_medical_concept'] =  self.collection_medical_concept.find(x => x.pronosticoConceptoId === response['body']['concepto'])['texto'];
        
        const collection_diagnotics = JSON.parse(JSON.stringify(response['body']['diagnosticos']));
        self.collection_diagnotics_patient = collection_diagnotics;
        const collection_sequels = JSON.parse(JSON.stringify(response['body']['secuelas']));
        self.collection_sequels_patient = collection_sequels;
      } else {
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
        // self.loading_state = false;
      }
    }, err => {
      // self.loading_state = false;
    });
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.tfirma);
  }

  dismiss() {
    this.ref.close();
  }

  fnShowIncapacidad() {
    this.showIncapacidad = true;
  }

  fnDateInterval(start, end) {
    if (start > end) [start, end] = [end, start];
    this.days = end.getDate() - start.getDate();
    this.months = end.getMonth() - start.getMonth();
    this.years = end.getFullYear() - start.getFullYear();
    if (this.days < 0) {
      this.days += (new Date(start.getFullYear(), start.getMonth() + 1, 0)).getDate();
      this.months--;
    }
    if (this.months < 0) {
      this.months += 12;
      this.years--;
    }
  }

  getAge(dateString) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dob = new Date(dateString);
    dob.setHours(0, 0, 0, 0);
    this.fnDateInterval(dob, today);
  }

}
