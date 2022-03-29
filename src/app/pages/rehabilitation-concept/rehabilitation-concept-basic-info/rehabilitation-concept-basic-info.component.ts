import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../shared/api/services/user.service';
import { ProfilesService } from '../../../shared/api/services/profiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityService } from '../../../shared/api/services/entity.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'ngx-rehabilitation-concept-basic-info',
  templateUrl: './rehabilitation-concept-basic-info.component.html',
  styleUrls: ['./rehabilitation-concept-basic-info.component.scss'],
})
export class RehabilitationConceptBasicInfoComponent implements OnInit {

  @Input() data_object_tab: any;
  @Input() list_cie10: any;
  @Input() collection_cie_10: any;
  data_new_entity: any = {};
  loading_state: any = false;
  document_type: any = 9;
  token: any = null;
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
  required: any = true;
  submitted: any = false;
  collection_character: any = [];
  collection_relation_types: any = [];
  collection_entity_relation: any = [];
  collection_type_society: any = [];
  collection_document_types: any = [];
  collection_regime: any = [];

  // collection_cie_10: any = [];
  // list_cie10: any = [];
  errors: string[] = [];
  diagnosis: any = '';
  read_only: boolean = false;
  load_data: boolean = false;

  data_rehabilitation_concept: any = {};
  data_info_diagnostic: any = {};
  data_info_sequel: any = {};
  data_info_therapy: any = {};
  data_info_forecast: any = {};
  public max_date: string = null;
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
    {'value': 1, 'name': 'Favorable'},
    {'value': 2, 'name': 'Desfavorable'},
  ];
  collection_diagnotics_patient: any = [];
  collection_sequels_patient: any = [];
  state_concept: any = null;
  name_tratement: any = null;
  show_form_add_diagnostic: boolean = true;
  show_form_add_sequels: boolean = true;
  show_form_add_therapy: boolean = true;
  show_form_add_pronostic: boolean = true;

  error_form: boolean = false;
  error_diagnotics_patient: boolean = false;
  error_sequels_patient: boolean = false;
  error_medical_treatment: boolean = false;
  error_description_other_therapy: boolean = false;
  error_short_term: boolean = false;
  error_medium_term: boolean = false;
  error_medical_concept: boolean = false;
  error_checks_therapy: boolean = false;

  public dataCollectionConcepts: any = [];
  public unfavType: any = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public profilesService: ProfilesService,
    public entityService: EntityService,
    public rehabilitationConceptService: RehabilitationConceptService,
    private incapacityService: IncapacityService,
    public utilitiesService: UtilitiesService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      // $('#kstdy-button-back-concept').click();
    });
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.data_object_tab
        self.state_concept = self.data_object_tab['estado'];
        // self.object_data_patient['medical_concept']['pronosticoConceptoId'] = 1;
        // self.collection_cie_10
        self.patient_id = self.data_object_tab['idPaciente']; // 1-idPaciente 2-idpacienteporemitir
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

  fnGetDataPatientById(patient_id, token) {
    const self = this;
    self.loading_state = true;
    self.rehabilitationConceptService.fnHttpGetDataPatientById(token, patient_id).subscribe(response => {
      if (response.status == 200) {
        self.loading_state = false;
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
        // self.object_data_patient['medical_concept'] =  self.collection_medical_concept.find(x => x.pronosticoConceptoId === response['body']['concepto'])['descripcionPronostico'];
        // self.object_data_patient['text_medical_concept'] =  self.collection_medical_concept.find(x => x.pronosticoConceptoId === response['body']['concepto'])['texto'];
        
        const collection_diagnotics = JSON.parse(JSON.stringify(response['body']['diagnosticos']));
        self.collection_diagnotics_patient = collection_diagnotics;
        const collection_sequels = JSON.parse(JSON.stringify(response['body']['secuelas']));
        self.collection_sequels_patient = collection_sequels;
      } else {
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
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
        // this.collection_medical_concept = response['body'];
        this.dataCollectionConcepts = response['body'];
        console.log('this.dataCollectionConcepts: ', this.dataCollectionConcepts);
        console.log('this.collection_medical_concept: ', this.collection_medical_concept);
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



  fnAddDiagnostic(data_info_diagnostic) {
    // const date_unix = moment(data_info_diagnostic['date_create']).unix();
    const date_valueof = moment(data_info_diagnostic['date_create']).valueOf();
    this.collection_diagnotics_patient.push({
      'id': data_info_diagnostic['diagnostic']['iIdcie10'],
      'ciE10Id': data_info_diagnostic['diagnostic']['iIdcie10'],
      // 'diagnostico': data_info_diagnostic['diagnostic']['iIdcie10'],
      'fechaIncapacidad': date_valueof,
      'etiologia': data_info_diagnostic['etiology']['value'],
      'nombreEtiologia': data_info_diagnostic['etiology']['name'],
      'nombreDiagnostico': data_info_diagnostic['diagnostic']['tFullDescripcion'],
    });
    this.data_info_diagnostic.diagnostic = '';
    this.data_info_diagnostic.date_create = '';
    this.data_info_diagnostic.etiology = '';
    this.error_diagnotics_patient = false;
  }

  fnAddMedicalPrognosis(data_info_sequel) {
    // const date_unix = moment(data_info_diagnostic['date_create']).unix();
    // const date_valueof = moment(data_info_sequel['date_create']).valueOf();
    this.collection_sequels_patient.push(
      {
        'id': data_info_sequel['type_sequel']['value'],
        'tipoSecuela': data_info_sequel['type_sequel']['value'],
        'nombreTipoSecuela': data_info_sequel['type_sequel']['name'],
        'descripcion': data_info_sequel['description_sequel'],
        'pronostico': data_info_sequel['medical_prognosis']['value'],
        'nombrePronostico': data_info_sequel['medical_prognosis']['name'],
      },
    );
    this.data_info_sequel.type_sequel = '';
    this.data_info_sequel.description_sequel = '';
    this.data_info_sequel.medical_prognosis = '';
    this.error_sequels_patient = false;
  }

  fnRemoveDiagnosticPatient(index) {
    // if (index != 0) {
      this.collection_diagnotics_patient.splice(index, 1);
    // }
  }

  fnRemoveMedicalPrognosis(index) {
    // if (index != 0) {
      this.collection_sequels_patient.splice(index, 1);
    // }
  }

  fnSetCreateNewConceptByPatient(object_data_patient, collection_diagnotics_patient, collection_sequels_patient) {
    const self = this;
    self.submitted = true;
    self.loading_state = true;
    const collection_diagnotics = [];
    const collection_sequels = [];

    const objSendService = {
      'pacienteId': self.patient_id,
      'resumenHistoriaClinica': object_data_patient['description_medical_prognosis'],
      'finalidadTratamientos': object_data_patient['medical_treatment']['id'],
      'esFarmacologico': (object_data_patient['check_pharmacological']) ? object_data_patient['check_pharmacological'] : false,
      'esTerapiaOcupacional': (object_data_patient['check_occupational_therapy']) ? object_data_patient['check_occupational_therapy'] : false,
      'esFonoaudiologia': (object_data_patient['check_speech_therapy']) ? object_data_patient['check_speech_therapy'] : false,
      'esQuirurgico': (object_data_patient['check_surgical']) ? object_data_patient['check_surgical'] : false,
      'esTerapiaFisica': (object_data_patient['check_physical_therapy']) ? object_data_patient['check_physical_therapy'] : false,
      'esOtrosTratamientos': (object_data_patient['check_other_therapy']) ? object_data_patient['check_other_therapy'] : false,
      'descripcionOtrosTratamientos': object_data_patient['description_other_therapy'],
      'plazoCorto': parseInt(object_data_patient['short_term']),
      'plazoMediano': parseInt(object_data_patient['medium_term']),
      'concepto': object_data_patient['medical_concept']['pronosticoConceptoId'],
      'pacienteporEmitirId': self.data_object_tab['idpacienteporemitir'],
      'diagnosticos': collection_diagnotics_patient,
      'secuelas': collection_sequels_patient,
    };
    self.fnSetCreateNewMedicalConcept(objSendService, self.token, function(resp_doctor) {
      self.loading_state = false;
      if (resp_doctor.status == 200 || resp_doctor.status == 201 || resp_doctor.status == 204) {
        self.fnGetDataPatientById(self.patient_id, self.token);
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Concepto de rehabilitación creado satisfactoriamente', 'nb-alert');
        $('#kstdy-button-back-concept').click();
      } else {
        self.submitted = false;
        // self.data_user_basic_info = {};
        $('#kstdy-button-back-concept').click();
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
      }
    });
  }

  fnSetCreateNewMedicalConcept(object_data, token, callback) {
    // Instancia de conexion servicio
    this.rehabilitationConceptService.fnHttpCreateNewMedicalConcept(token, object_data).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGoBackList() {
    $('#kstdy-button-back-concept').click();
  }

  fnValidFormRehabilitationConcept(object_data_patient, collection_diagnotics_patient, collection_sequels_patient) {
    const self = this;
    if (collection_diagnotics_patient.length < 1 || 
      collection_sequels_patient.length < 1 || 
      !object_data_patient.medical_treatment || 
      (!object_data_patient.check_pharmacological && 
        !object_data_patient.check_occupational_therapy && 
        !object_data_patient.check_speech_therapy && 
        !object_data_patient.check_surgical && 
        !object_data_patient.check_physical_therapy && 
        !object_data_patient.check_other_therapy) || 
      !object_data_patient.description_other_therapy ||
      !object_data_patient.short_term ||
      !object_data_patient.medium_term ||
      !object_data_patient.medical_concept['pronosticoConceptoId']) {

      self.error_form = true;
      // $("div#content-rehabilitation-concept").scrollTop(0);
      self.document.body.scrollTop = 0;

      if (collection_diagnotics_patient.length < 1) {
        self.error_diagnotics_patient = true;
      }

      if (collection_sequels_patient.length < 1) {
        self.error_sequels_patient = true;
      }

      if (!object_data_patient.medical_treatment) {
        self.error_medical_treatment = true;
      }

      if (!object_data_patient.check_pharmacological && 
        !object_data_patient.check_occupational_therapy && 
        !object_data_patient.check_speech_therapy && 
        !object_data_patient.check_surgical && 
        !object_data_patient.check_physical_therapy && 
        !object_data_patient.check_other_therapy) {
          self.error_checks_therapy = true;
        }

      if (!object_data_patient.description_other_therapy && object_data_patient.check_other_therapy) {
        self.error_description_other_therapy = true;
      }

      if (!object_data_patient.short_term) {
        self.error_short_term = true;
      }

      if (!object_data_patient.medium_term) {
        self.error_medium_term = true;
      }

      if (!object_data_patient.medical_concept['pronosticoConceptoId']) {
        self.error_medical_concept = true;
      }

    } else {
      self.error_form = false;
      self.fnSetCreateNewConceptByPatient(object_data_patient, collection_diagnotics_patient, collection_sequels_patient);
    }

  }

  fnSetMedicalConcept(data_concept) {
    console.log('data_concept: ', data_concept);
    switch (data_concept["value"]) {
      case 1:
        console.log("Favorable");
        // this.dataCollectionConcepts[0]; // Favorable
        this.object_data_patient['text_medical_concept'] = this.dataCollectionConcepts[0]['texto'];
        break;
      case 2:
        console.log("Desfavorable");
        // this.dataCollectionConcepts
        console.log('this.dataCollectionConcepts: ', this.dataCollectionConcepts);
        // this.text
        // this.dataCollectionConcepts[1]; // Desfavorable - con incapacidad
        // this.dataCollectionConcepts[2]; // Desfavorable - sin incapacidad
        break;
    }
  }

  fnCheckUnFavType(unfav_type) {
    console.log('unfav_type: ', unfav_type);
    this.unfavType = unfav_type;
    switch (unfav_type) {
      case 1:
        
        break;
      case 2:
        
        break;
    }
  }

}
