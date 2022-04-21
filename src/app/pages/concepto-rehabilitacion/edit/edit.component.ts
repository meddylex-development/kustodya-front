import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UserService } from '../../../shared/api/services/user.service';
import { RethusService } from '../../../shared/api/services/rethus.service';


// import { AyudaComponent } from '../ayuda/ayuda.component';
// import { AgregarEmpleadorComponent } from '../agregar-empleador/agregar-empleador.component';
import { resolve } from 'url';
import * as moment from 'moment';
declare var $: any;

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
defineLocale('es', esLocale);

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public patientData: any = null;
  public patientIncapacities: any = null;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;
  public token: any;
  public submitted: boolean = false;
  public listCantidadDiagnoticosIncapacidad: any;
  public collectionIncapacityType: any = [];
  public collectionPatientSigns: any = [];
  public collectionPatientSymptoms: any = [];
  public collectionPatientDiagnostics: any = [];
  public collectionPatientConditionKeywords: any = [
    { 'id': 1, 'name': 'Golpe' },
    { 'id': 2, 'name': 'Caida' },
    { 'id': 3, 'name': 'Accidente de transito' },
    { 'id': 4, 'name': 'Fractura' },
    { 'id': 5, 'name': 'Accidente en trabajo' },
    { 'id': 6, 'name': 'Choque' },
  ];
  public collectionAfectionType: any = [
    { 'id': 1, 'name': 'Accidente' },
    { 'id': 2, 'name': 'Enfermedad' },
  ];
  public patientTimeStartCondition: any = { 'hour': 13, 'minute': 30 };
  public meridian: boolean = true;

  public colorTheme = 'theme-green';
  public bsConfig: Partial<BsDatepickerConfig>;
  public maxDate = new Date();
  public locale = 'es';
  public collectionCountries: any = [];
  public collectionDepartaments: any = [];
  public collectionCities: any = [];
  public collectionLateralities: any = [];
  public applyLaterality: boolean = false;
  public dataDiagnosticCorrelation: any = null;
  public dataDoctor: any = null;
  public dataIPS: any = null;

  public loadingData: boolean = false;

  public collectionWayType: any = [
    { 'id': 1, 'name': 'Calle' },
    { 'id': 2, 'name': 'Carrera' },
    { 'id': 3, 'name': 'Transversal' },
    { 'id': 4, 'name': 'Diagonal' },
    { 'id': 5, 'name': 'Avenida Calle' },
    { 'id': 6, 'name': 'Avenida Carrera' },
    { 'id': 7, 'name': 'Avenida Transversal' },
    { 'id': 8, 'name': 'Avenida Diagonal' },
  ];
  public collectionLetters: any = [
    { 'id': 1, 'name': 'A' },
    { 'id': 2, 'name': 'B' },
    { 'id': 3, 'name': 'C' },
    { 'id': 4, 'name': 'D' },
    { 'id': 5, 'name': 'E' },
    { 'id': 6, 'name': 'F' },
    { 'id': 7, 'name': 'G' },
    { 'id': 8, 'name': 'H' },
    { 'id': 9, 'name': 'I' },
    { 'id': 10, 'name': 'J' },
    { 'id': 11, 'name': 'K' },
    { 'id': 12, 'name': 'L' },
    { 'id': 13, 'name': 'M' },
    { 'id': 14, 'name': 'N' },
    { 'id': 15, 'name': 'Ñ' },
    { 'id': 16, 'name': 'O' },
    { 'id': 17, 'name': 'P' },
    { 'id': 18, 'name': 'Q' },
    { 'id': 19, 'name': 'R' },
    { 'id': 20, 'name': 'S' },
    { 'id': 21, 'name': 'T' },
    { 'id': 22, 'name': 'U' },
    { 'id': 23, 'name': 'V' },
    { 'id': 24, 'name': 'W' },
    { 'id': 25, 'name': 'X' },
    { 'id': 26, 'name': 'Y' },
    { 'id': 27, 'name': 'Z' },
  ];
  public collectionBis: any = [
    { 'id': 1, 'name': 'Bis' },
  ]
  public collectionCardinalSufix: any = [
    { 'id': 1, 'name': 'Este' },
    { 'id': 2, 'name': 'Sur' },
  ]
  public addressPlaceBuilded: string = '';
  public dataUserSpecialist: any = null;
  public flagShowAlertUser: boolean = false;
  public dataUserSpecialistRethus: any = '';
  public dataAccountingBasicInfo: any = {};
  public idContabilidad: string = '';
  public patientIBC: any = [];
  public inputValueIBCPatient: string = '';
  public daysEPSToPay: any = 0;
  public daysEmployerToPay: any = 0;
  public EPSValuePay: any = 0;
  public employerValuePay: any = 0;
  public totalPatientDaysToPay: any = 0;
  public totalPatientValueToPay: any = 0;
  public valueDayJob: any = 0;
  public daysAFPToPay: any = 0;
  public AFPValueToPay: any = 0;
  public patientDaysAccum: any = [];

  public patientConcept: any = null;
  public collectionEtiology: any = null;
  public dataConcept: any = {};
  
  public listDiagnosticsPatient: any = [];
  public listSequelsPatient: any = [];
  public selectPatientDiagnostics: any = '';
  public selectPatientEtiology: any = '';
  public patientInputDiagnosticDate: any = '';
  public collectionTypeSequel: any = [];
  public selectPatientTypeSequel: any = '';
  public collectionMedicalPrognosis: any = [];
  public selectPatientMedicalPrognosis: any = '';
  public patientInputSequelDescription: any = '';
  public patientInputClinicHistorySummary: any = '';
  public patientInputOtherTreatments: any = '';
  
  public checkPharmacological: boolean = false;
  public checkOccupationalTherapy: boolean = false;
  public checkSpeechTherapy: boolean = false;
  public checkSurgical: boolean = false;
  public checkPhysicalTherapy: boolean = false;
  public checkOtherTherapy: boolean = false;

  public patientGoodShortTerm: boolean = false;
  public patientRegularShortTerm: boolean = false;
  public patientBadShortTerm: boolean = false;
  
  public patientGoodMediumTerm: boolean = false;
  public patientRegularMediumTerm: boolean = false;
  public patientBadMediumTerm: boolean = false;
  public collectionMedicalConcept: any = [
    // {'value': 1, 'name': 'Favorable'},
    // {'value': 2, 'name': 'Desfavorable'},
  ];
  public selectMedicalConcept: any = '';
  public dataCollectionConcepts: any = [
    {'value': 1, 'name': 'Favorable'},
    {'value': 2, 'name': 'Desfavorable'},
  ];
  public unfavTypeWithIncapacity: boolean = true;
  public unfavTypeNoIncapacity: boolean = false;
  public descriptionMedicalConcept: any = null;
  

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private userService: UserService, 
    private rethusService: RethusService, 
    private bsLocaleService: BsLocaleService,
    private dialogService: NbDialogService,
    private parameterizationService: ParameterizationService,
    private auditService: AuditService,
    private rehabilitationConceptService: RehabilitationConceptService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
  ) {
  }
  
  ngOnInit() {
    // /api/K2ConceptoRehabilitacion/ConceptoRehabilitacion/{pacienteporEmitirId}
    const token = sessionStorage.getItem("token");
    this.token = token;
    console.log('this.token: ', this.token);
    this.bsLocaleService.use('es');
    let data = this.utilitiesService.fnGetDataShare();
    console.log('data: ', data);
    this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    console.log('this.dataDoctor: ', this.dataDoctor);
    const user_id = sessionStorage.getItem('user_id');
    this.dataIPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('ips'));
    console.log('this.dataIPS: ', this.dataIPS);
    if (data) {
      this.patientData = data['patientData'];
      this.patientConcept = data['patientConcept'];
      console.log('this.patientConcept: ', this.patientConcept);

      this.fnGetDataConcept(this.token, this.patientConcept['idpacienteporemitir']).then((response6) => {
        console.log('response6: ', response6);
        if (response6) {
          // this.collectionMedicalConcept = response6['body'];
          // console.log('this.collectionMedicalConcept: ', this.collectionMedicalConcept);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }
      });

      this.fnGetDataUserById(this.token, user_id).then((response) => {
        console.log('response: ', response);
        if (response) {
          let numeroIdentificacion = response['numeroIdentificacion'];
          this.fnGetDoctorRethusByDNI(this.token, 1, numeroIdentificacion).then((responseRethus) => {
            console.log('responseRethus: ', responseRethus);
            if (responseRethus['body']) {

              this.fnGetDoctorRethusByDNI(this.token, 'CC', numeroIdentificacion).then((responseRethusDetail) => {
                // console.log('responseRethusDetail: ', responseRethusDetail);
                if (responseRethusDetail['body']) {
                  this.dataUserSpecialist = responseRethusDetail['body'];
                  console.log('this.dataUserSpecialist: ', this.dataUserSpecialist);
                  let tipoPorgrama = this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
                  if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
                    console.log('Usted no esta autorizado');
                    this.flagShowAlertUser = true;
                  } else {
                    console.log('Si tiene permisos para generar incapacidades');
                    this.flagShowAlertUser = false;
                  }
                } 
              });
            } else {
              this.flagShowAlertUser = true;
              this.dataUserSpecialist = null
            }
          });
        } else {
          this.flagShowAlertUser = true;
          this.dataUserSpecialist = null
        }
      })

      this.fnGetCie10(this.token, 1).then(response1 => {
        console.log('response1: ', response1);
        if (response1) {
          this.collectionPatientDiagnostics = response1;
          console.log('this.collectionPatientDiagnostics: ', this.collectionPatientDiagnostics);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        } 
      });  
      this.fnGetListEtiologies(this.token).then((response2) => {
        console.log('response2: ', response2);
        if (response2) {
          this.collectionEtiology = response2['body'];
          console.log('this.collectionEtiology: ', this.collectionEtiology);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }
      });
      this.fnGetListTypeSequels(this.token).then((response3) => {
        console.log('response3: ', response3);
        if (response3) {
          this.collectionTypeSequel = response3['body'];
          console.log('this.collectionTypeSequel: ', this.collectionTypeSequel);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }
      });
      this.fnGetListMedicalPrognosis(this.token).then((response4) => {
        console.log('response4: ', response4);
        if (response4) {
          this.collectionMedicalPrognosis = response4['body'];
          console.log('this.collectionMedicalPrognosis: ', this.collectionMedicalPrognosis);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }
      });
      this.fnGetListMedicalConcept(this.token).then((response5) => {
        console.log('response5: ', response5);
        if (response5) {
          this.collectionMedicalConcept = response5['body'];
          console.log('this.collectionMedicalConcept: ', this.collectionMedicalConcept);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }
      });
      

    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/listado-casos');
    }
  }

  fnGetListEtiologies(token) {
    return new Promise((resolve, reject) => {
      this.rehabilitationConceptService.fnHttpGetDataEtiologiesEnum(token).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      }, err => {
      });
    });
  }

  fnAddNewDiagnostic(selectPatientDiagnostics, selectPatientEtiology, patientInputDiagnosticDate) {
    console.log('selectPatientDiagnostics: ', selectPatientDiagnostics);
    console.log('selectPatientEtiology: ', selectPatientEtiology);
    console.log('patientInputDiagnosticDate: ', patientInputDiagnosticDate);
    // const date_unix = moment(patientInputDiagnosticDate).unix();
    const patientDiagnosticDate = moment(patientInputDiagnosticDate).valueOf();
    console.log('patientDiagnosticDate: ', patientDiagnosticDate);

    if (this.listDiagnosticsPatient.length < 1) {
      this.listDiagnosticsPatient.push({
        'aplicaLateralidad': selectPatientDiagnostics['aplicaLateralidad'],
        'iDiasMaxAcumulados': selectPatientDiagnostics['iDiasMaxAcumulados'],
        'iDiasMaxConsulta': selectPatientDiagnostics['iDiasMaxConsulta'],
        'iIdcie10': selectPatientDiagnostics['iIdcie10'],
        'iIdtipoCie': selectPatientDiagnostics['iIdtipoCie'],
        'tCie10': selectPatientDiagnostics['tCie10'],
        'tDescripcion': selectPatientDiagnostics['tDescripcion'],
        'tFullDescripcion': selectPatientDiagnostics['tFullDescripcion'],
        'fechaIncapacidad': patientDiagnosticDate,
        'etiologia': selectPatientEtiology['id'],
        'nombreEtiologia': selectPatientEtiology['name'],
      });
      console.log('this.listDiagnosticsPatient: ', this.listDiagnosticsPatient);
    } else {
      let validData = false;
      this.listDiagnosticsPatient.forEach((element, key) => {
        console.log('element: ', element);
        console.log('selectPatientDiagnostics[iIdcie10]: ', selectPatientDiagnostics['iIdcie10']);
        console.log('element[iIdcie10]: ', element['iIdcie10']);
        if (element['iIdcie10'] === selectPatientDiagnostics['iIdcie10']) {
          validData = true;
        }
        if ((this.listDiagnosticsPatient.length - 1) == key) {
          if (!validData) {
            this.listDiagnosticsPatient.push({
              'aplicaLateralidad': selectPatientDiagnostics['aplicaLateralidad'],
              'iDiasMaxAcumulados': selectPatientDiagnostics['iDiasMaxAcumulados'],
              'iDiasMaxConsulta': selectPatientDiagnostics['iDiasMaxConsulta'],
              'iIdcie10': selectPatientDiagnostics['iIdcie10'],
              'iIdtipoCie': selectPatientDiagnostics['iIdtipoCie'],
              'tCie10': selectPatientDiagnostics['tCie10'],
              'tDescripcion': selectPatientDiagnostics['tDescripcion'],
              'tFullDescripcion': selectPatientDiagnostics['tFullDescripcion'],
              'fechaIncapacidad': patientDiagnosticDate,
              'etiologia': selectPatientEtiology['id'],
              'nombreEtiologia': selectPatientEtiology['name'],
            });
            console.log('this.listDiagnosticsPatient: ', this.listDiagnosticsPatient);
          } 
        }
      });
    }

    // this.listDiagnosticsPatient.push({
    //   'aplicaLateralidad': selectPatientDiagnostics['aplicaLateralidad'],
    //   'iDiasMaxAcumulados': selectPatientDiagnostics['iDiasMaxAcumulados'],
    //   'iDiasMaxConsulta': selectPatientDiagnostics['iDiasMaxConsulta'],
    //   'iIdcie10': selectPatientDiagnostics['iIdcie10'],
    //   'iIdtipoCie': selectPatientDiagnostics['iIdtipoCie'],
    //   'tCie10': selectPatientDiagnostics['tCie10'],
    //   'tDescripcion': selectPatientDiagnostics['tDescripcion'],
    //   'tFullDescripcion': selectPatientDiagnostics['tFullDescripcion'],
    //   'fechaIncapacidad': patientDiagnosticDate,
    //   'etiologia': selectPatientEtiology['id'],
    //   'nombreEtiologia': selectPatientEtiology['name'],
    // });
    console.log('this.listDiagnosticsPatient: ', this.listDiagnosticsPatient);
    // this.dataConcept.diagnostic = '';
    // this.dataConcept.date_create = '';
    // this.dataConcept.etiology = '';
    // this.error_diagnotics_patient = false;
  }

  fnGetListTypeSequels(token) {
    return new Promise((resolve, reject) => {
      this.rehabilitationConceptService.fnHttpGetDataTypeSequelsEnum(token).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });
  }

  fnGetListMedicalPrognosis(token) {
    return new Promise((resolve, reject) => {
      this.rehabilitationConceptService.fnHttpGetDataMedicalPrognosisEnum(token).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });
  }
  
  fnAddNewSequel(selectPatientTypeSequel, selectPatientMedicalPrognosis, patientInputSequelDescription) {
    console.log('selectPatientTypeSequel: ', selectPatientTypeSequel);
    console.log('selectPatientMedicalPrognosis: ', selectPatientMedicalPrognosis);
    console.log('patientInputSequelDescription: ', patientInputSequelDescription);
    // const date_unix = moment(patientInputDiagnosticDate).unix();
    const patientSequelDate = moment().valueOf();
    console.log('patientSequelDate: ', patientSequelDate);
    this.listSequelsPatient.push({
      'idTypeSequel': selectPatientTypeSequel['value'],
      'nameTypeSequel': selectPatientTypeSequel['name'],
      'idMedicalPrognosis': selectPatientMedicalPrognosis['value'],
      'nameMedicalPrognosis': selectPatientMedicalPrognosis['name'],
      'sequelDescription': patientInputSequelDescription,
      'dateSequel': patientSequelDate,
    });
    console.log('this.listSequelsPatient: ', this.listSequelsPatient);
  }

  fnGetListMedicalConcept(token) {

    return new Promise((resolve, reject) => {
      this.rehabilitationConceptService.fnHttpGetDataMedicalConceptEnum(token).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });

    // Instancia de conexion servicio
    // this.rehabilitationConceptService.fnHttpGetDataMedicalConceptEnum(token).subscribe(response => {
    //   if (response.status == 200) {
    //     // this.collection_medical_concept = response['body'];
    //     this.dataCollectionConcepts = response['body'];
    //     console.log('this.dataCollectionConcepts: ', this.dataCollectionConcepts);
    //     // console.log('this.collection_medical_concept: ', this.collection_medical_concept);
    //     // this.collection_medical_concept = this.collection_medical_concept.concat(response['body']);
    //     // this.object_data_patient['medical_concept'] = {
    //     //   'pronosticoConceptoId': 1,
    //     //   'descripcionPronostico': 'Favorable',
    //     //   'texto': 'Es posible que la incapacidad actual se prolongue más de 180 días y tiene un pronóstico favorable',
    //     // };
    //   } else {
    //     // this.collection_medical_concept = response['body'];
    //   }
    // }, err => {
    // });
  }


  fnSetMedicalConcept(data_concept) {
    console.log('data_concept: ', data_concept);
    switch (data_concept["value"]) {
      case 1:
        console.log("Favorable");
        // this.collectionMedicalConcept[0]; // Favorable
        this.descriptionMedicalConcept = this.collectionMedicalConcept[0]['texto'];
        break;
      case 2:
        console.log("Desfavorable");
        // this.collectionMedicalConcept
        console.log('this.collectionMedicalConcept: ', this.collectionMedicalConcept);
        // this.collectionMedicalConcept[1]; // Desfavorable - con incapacidad
        // this.collectionMedicalConcept[2]; // Desfavorable - sin incapacidad
        break;
    }
  }

  fnCheckUnFavType(unfav_type) {
    console.log('unfav_type: ', unfav_type);
    console.log('this.unfavTypeWithIncapacity: ', this.unfavTypeWithIncapacity);
    console.log('this.unfavTypeNoIncapacity: ', this.unfavTypeNoIncapacity);
    // this.unfavType = unfav_type;
    switch (unfav_type) {
      case 1:
        if (this.unfavTypeWithIncapacity) {
          this.unfavTypeNoIncapacity = false;
        } else {
          this.unfavTypeNoIncapacity = true;
        }
        break;
      case 2:
        if (this.unfavTypeNoIncapacity) {
          this.unfavTypeWithIncapacity = false;
        } else {
          this.unfavTypeWithIncapacity = true;
        }
        break;
    }
    
  }

  fnShoewPreviewCRHB() {
    // this.patientData = data['patientData'];
    console.log('this.patientData: ', this.patientData);
    // this.patientConcept = data['patientConcept'];
    console.log('this.patientConcept: ', this.patientConcept);
    this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/certificado-crhb/123456');
  }

  fnGetDataConcept(token, id_user) {

    return new Promise((resolve, reject) => {
      this.submitted = true;
      this.conceptoRehabilitacionService.fnHttpGetDataConcept(token, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        } else {
          reject(false);
          this.submitted = false;
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })

  }

  fnSetUpdateConcept(token, obj_concept) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      this.conceptoRehabilitacionService.fnHttpSetUpdateConcept(token, obj_concept).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(false);
          this.submitted = false;
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })
  }

  fnUpdateConcept() {
    let dataObjectSend = {
      "id": this.patientConcept['idpacienteporemitir'],
      "resumenHistoriaClinica": this.patientInputClinicHistorySummary,
      "finalidadTratamientos": this.selectPatientTypeSequel,
      "esFarmacologico": this.checkPharmacological,
      "esTerapiaOcupacional": this.checkOccupationalTherapy,
      "esFonoaudiologia": this.checkSpeechTherapy,
      "esQuirurgico": this.checkSurgical,
      "esTerapiaFisica": this.checkPhysicalTherapy,
      "esOtrosTratamientos": this.checkOtherTherapy,
      "descripcionOtrosTratamientos": this.patientInputOtherTreatments,
      "plazoCorto": 0,
      "plazoMediano": 0,
      "concepto": this.selectMedicalConcept,
      "remisionAdministradoraFondoPension": "string",
      "progreso": 10,
    }
    console.log('dataObjectSend: ', dataObjectSend);
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
  }

  fnViewDagnosticCertificate(item) {
    let diagnosticCodeDNI = item['uiCodigoDiagnostico'];
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/certificado/'+ diagnosticCodeDNI);
  }

  fnGetIncapacityType(token) {
    // this.submitted = true;
    this.incapacityService.fnHttpGetOrigenesIncapacidad(token).subscribe((result) => {
      // this.submitted = false;
      if (result.status == 200) {
        this.collectionIncapacityType = JSON.parse(JSON.stringify(result.body));
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.collectionIncapacityType.unshift(new_item);
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los origenes de incapacidad', 'nb-alert');
      }
      // this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
      // this.submitted = false;
    });
  }

  fnGetCie10(token, typeCie10) {
    // this.errors = [];
    // this.submitted = true;
    return new Promise ((resolve, reject) => {
      this.utilitiesService.fnGetDataJson('mockdata_diagnostics_cie10.json').subscribe(result => {
      // this.incapacityService.fnHttpGetCie10(token, typeCie10).subscribe((result) => {
        console.log('result: ', result);
        // this.submitted = false;
        if (result.status == 200) {
          let collectionList = JSON.parse(JSON.stringify(result.body));
          resolve(collectionList);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
          reject(false);
        }
        // this.submitted = false;
      }, error => {
        this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        reject(error);
        // this.submitted = false;
      });
    })
  }

  fnGetLateralities(token) {
    this.incapacityService.fnHttpGetListLateralities(token).subscribe(response => {
      this.collectionLateralities = response['body'];
    }, (error) => {
    })
  }

  fnRemovePatientSign(item, index, collectionPatientSigns) {
    let collection = [];
    collectionPatientSigns.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    this.patientData['diagnostic']['patientSigns'] = collection;
  }

  fnRemovePatientSymptom(item, index, collectionPatientSymptoms) {
    let collection = [];
    collectionPatientSymptoms.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    this.patientData['diagnostic']['patientSymptoms'] = collection;
  }

  fnRemovePatientKeywords(item, index, collectionPatientKeywords) {
    let collection = [];
    collectionPatientKeywords.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    this.patientData['diagnostic']['patientConditionKeywords'] = collection;
  }

  fnRemovePatientDiagnostic(item, index, collectionPatientDiagnostic) {
    let collection = [];
    collectionPatientDiagnostic.forEach((element, key) => {
      if (key != index) {
        collection.push(element);
      }
    });
    this.patientData['diagnostic']['patientDiagnostic'] = collection;
  }

  fnSetPatientCityCondition(item_depto) {
    this.patientData['diagnostic']['patientCityCondition'] = [];
    this.collectionCities = [];
    if (item_depto['ciudades'].length > 0) {
      let dataCollectionCities = [];
      item_depto['ciudades'].forEach(element => {
        dataCollectionCities.push({ 'name': element })
      });
      this.collectionCities = dataCollectionCities;
    }

  }

  fnGetCorrelationDiagnostic(item_cie_10) {
    console.log('item_cie_10: ', item_cie_10);
    this.loadingData = false;
    this.applyLaterality =  item_cie_10['aplicaLateralidad'] || false;
    this.dataDiagnosticCorrelation = null;
    let idCIE10 = item_cie_10['iIdcie10'];
    this.incapacityService.fnHttpGetCorrelationDiagnostic(this.token, idCIE10, this.patientData['iIdpaciente']).subscribe(r => {
      this.dataDiagnosticCorrelation = JSON.parse(JSON.stringify(r.body));
      this.patientData['diagnostic']['extensionIncapacity'] = this.dataDiagnosticCorrelation['bProrroga'];
      this.loadingData = true;
    }, err => {
      this.loadingData = false;
    });
  }

  fnSetPatientDaysGranted(event) {
    if(this.patientIBC[0] != '' && this.patientIBC[0] != null && this.patientDaysAccum[0] != '' && this.patientDaysAccum[0] != null) {
      this.fnCalcValueIncapacity(this.patientDaysAccum[0], this.patientIBC[0], 0, this.patientData.diagnostic.patientDaysGranted, this.dataDiagnosticCorrelation);
    }
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    // dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    // this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
    // });
  }

  fnShowPreviewIncapacityCertificate(itemEmployer, i) {
    this.patientData['employer'] = itemEmployer;
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.patientData, 
      patientIncapacities: this.patientIncapacities, 
      dataDiagnosticCorrelation: this.dataDiagnosticCorrelation,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/vista-previa-certificado');
  }

  fnGenerateNewIncapacityCertificate() {
    return new Promise((resolve, reject) => {
  
      const dateNowUnix = moment(new Date()).unix();
      const dateNowValueOf = moment(new Date()).valueOf();
      const date_incapcatity = moment(moment(new Date()).add(this.patientData['diagnostic']['patientDaysGranted'], 'days')).valueOf();
      

      
      // this.dataIPS = dataIPS;
  
      let object_data = null;
      // const fechaActual = new Date();
      // const data_ips = JSON.parse(sessionStorage.getItem('ips'));
      // const data_cie10 = (this.collection_diagnosis_complete['symptom'].concat(this.collection_diagnosis_complete['signs'])).concat(this.collection_diagnosis_complete['diagnosis']);
      // // this.lateralidad
      object_data = {
        "bProrroga": (this.dataDiagnosticCorrelation['bProrroga']) ? this.dataDiagnosticCorrelation['bProrroga'] : false,
        "bsoat": (this.patientData['diagnostic']['soatInsurance']) ? this.patientData['diagnostic']['soatInsurance'] : false,
        "cie10": (this.patientData['diagnostic']['patientDiagnostics']) ? [this.patientData['diagnostic']['patientDiagnostics']] : [],
        "dtFechaCreacion": new Date(),
        "dtFechaFin": new Date(),
        "esTranscripcion": false,
        "fechaEmisionIncapacidad": new Date(),
        "iDiasAcumuladosPorroga": (this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga']) ? this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga'] : '',
        "iDiasIncapacidad": (this.patientData['diagnostic']['patientDaysGranted']) ? this.patientData['diagnostic']['patientDaysGranted'] : '',
        "iIddiagnosticoIncapacidad": (this.dataDiagnosticCorrelation['iIddiagnosticoCorrelacion']) ? this.dataDiagnosticCorrelation['iIddiagnosticoCorrelacion'] : '',
        "iIdips": (this.dataIPS['iIdips']) ? this.dataIPS['iIdips'] : '',
        "iIdEps": (this.patientData['eps']['iIdeps']) ? this.patientData['eps']['iIdeps'] : '',
        "iIdpaciente": (this.patientData['iIdpaciente']) ? this.patientData['iIdpaciente'] : '',
        "iIdUsuarioCreador": (this.dataDoctor['userId']) ? this.dataDoctor['userId'] : '',
        "lugarExpedicion": {
          "iIdDane": 0,
          "iIdDepartamento": 0,
          "iIdMunicipio": 0,
          "iIdPais": 0,
          "tCodigoDANE": "string",
          "tNombreDepartamento": "string",
          "tNombreMunicipio": "string",
          "tNombrePais": "string",
          "tNombrePoblacion": "string"
        },
        "numeroIncapacidadIPSTranscripcion": null,
        "origenCalificadoIncapacidad": {
          "iIdOrigenIncapacidad": 0,
          "tOrigenIncapacidad": "string"
        },
        "presuntoOrigenIncapacidad": (this.patientData['diagnostic']['incapacityType']) ? this.patientData['diagnostic']['incapacityType'] : '',
        "tCodigoCorto": null,
        "tDescripcionSintomatologica": (this.patientData['diagnostic']['patientConditionMedicalDescription']) ? this.patientData['diagnostic']['patientConditionMedicalDescription'] : '',
        "tipoAtencion": (this.patientData['diagnostic']['attentionTypes']) ? this.patientData['diagnostic']['attentionTypes'] : '',
        "tipoEmision": {
          "iid": 0,
          "nombreEmision": "string"
        },
        "tLugar": (this.patientData['diagnostic']['patientCountryCondition']) ? this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'] : '',
        "tLugarExpedicion": (this.patientData['diagnostic']['patientCountryCondition']) ? this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'] : '',
        "tModo": (this.patientData['diagnostic']['patientModeDescription']) ? this.patientData['diagnostic']['patientModeDescription'] : '',
        "tTiempo": (this.patientData['diagnostic']['dateStartPatientCondition']) ? this.patientData['diagnostic']['dateStartPatientCondition'] + ' - ' + this.patientData['diagnostic']['timeStartPatientCondition']['hour'] + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['minute']  + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['second'] : '',
        "uiCodigoDiagnostico": null,
        "iIDLateralidad": (this.patientData['diagnostic']['laterality']) ? this.patientData['diagnostic']['laterality']['iIDLateralidad'] : '',
        "eps": (this.patientData['eps']) ? this.patientData['eps'] : '',
        "ips": (this.dataIPS) ? this.dataIPS : '',
      };
  
      const object_data_test = {
        'iIddiagnosticoIncapacidad': 0,
        'uiCodigoDiagnostico': null,
        'tCodigoCorto': '',
        "iIdpaciente": (this.patientData['iIdpaciente']) ? this.patientData['iIdpaciente'] : '',
        "iIdips": (this.dataIPS['iIdips']) ? this.dataIPS['iIdips'] : '',
        "cie10": (this.patientData['diagnostic']['patientDiagnostics']) ? [this.patientData['diagnostic']['patientDiagnostics']] : [],
        "tTiempo": this.patientData['diagnostic']['dateStartPatientCondition'] + ' - ' + this.patientData['diagnostic']['timeStartPatientCondition']['hour'] + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['minute']  + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['second'],
        "tModo": (this.patientData['diagnostic']['patientModeDescription']) ? this.patientData['diagnostic']['patientModeDescription'] : '',
        "tLugar": (this.patientData['diagnostic']['patientCountryCondition']['name']) ? this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'] : '',
        "presuntoOrigenIncapacidad": (this.patientData['diagnostic']['incapacityType']) ? this.patientData['diagnostic']['incapacityType'] : '',
        'origenCalificadoIncapacidad': null,
        "tipoAtencion": (this.patientData['diagnostic']['attentionTypes']) ? this.patientData['diagnostic']['attentionTypes'] : '',
        "tDescripcionSintomatologica": (this.patientData['diagnostic']['patientConditionMedicalDescription']) ? this.patientData['diagnostic']['patientConditionMedicalDescription'] : '',
        "iDiasIncapacidad": (this.patientData['diagnostic']['patientDaysGranted']) ? this.patientData['diagnostic']['patientDaysGranted'] : '',
        "iDiasAcumuladosPorroga": (this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga']) ? this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga'] : '',
        "dtFechaCreacion": moment(dateNowValueOf).format(),
        "dtFechaFin": moment(dateNowValueOf).add(this.patientData['diagnostic']['patientDaysGranted'], 'days').format(),
        "bProrroga": (this.patientData['diagnostic']['extensionIncapacity']) ? this.patientData['diagnostic']['extensionIncapacity'] : false,
        "bsoat": (this.patientData['diagnostic']['soatInsurance']) ? this.patientData['diagnostic']['soatInsurance'] : false,
        "iIDLateralidad": (this.patientData['diagnostic']['laterality']) ? this.patientData['diagnostic']['laterality']['iIDLateralidad'] : 0,
      };
      // return false;
      // this.submitted = true;
      this.incapacityService.fnHttpPostDiagnosticosIncapacidad(this.token, object_data_test).subscribe(response => {
        if (response.status == 200) {
          // this.patientData['diagnostic'] = {
          //   'soatInsurance': false,
          //   'timeStartPatientCondition': { 'hour': 12, 'minute': 0 },
          //   'laterality': null,
          //   'patientDaysGranted': 1,
          // };
          // this.applyLaterality = false;

          let dataResolve = {
            'dates': {
              'dateNowUnix': dateNowUnix,
              'dateNowValueOf': dateNowValueOf,
              'dateIncapcatity': date_incapcatity,
              'dateObjectSend': new Date(),
            },
            'objectDataSend': object_data_test,
            'dataResponse': response
          }

          // Consumir API que envia correo
          resolve(dataResolve);
        }
        if (response.status == 206) {
          // this.submitted = false;
          let error = this.utilitiesService.fnSetErrors(response.body.codMessage)[0];
          this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        reject(false);
        // this.submitted = false;
      });
    });

  }

  fnGetContabilidad(token, value) {
    // this.loading_state = true;
    this.parameterizationService.fnHttpGetAccountingDetail(token, value).subscribe(r => {
      if (r.status == 200) {
        this.dataAccountingBasicInfo['claseDocumento'] = r.body['claseDocumentoPorDefecto'];
        this.dataAccountingBasicInfo['descripcionFicha'] = r.body['descripcionMovimientoPorDefecto'];
        this.dataAccountingBasicInfo['subcuenta'] = r.body['codigo'] + " - " + r.body['descripcion'];
        this.idContabilidad = r.body['id'];
      }
    }, err => {
      // this.collection_accounting = [];
    });

  }

  fnGenerateNewAccountingRegistry(dataIncapacityCreated, dataEmployer, dataAccountingBasicInfo, token, idContabilidad) {

    let datesDataIncapacityCreated = dataIncapacityCreated['dates'];
    let objectDataSend = dataIncapacityCreated['objectDataSend'];
    let dataResponse = dataIncapacityCreated['dataResponse']['body'];

    let dateIncapacity = moment(datesDataIncapacityCreated['dateNowValueOf']).format('YYYY/MM/DD');
    let monthDateIncapacity =  moment(datesDataIncapacityCreated['dateNowValueOf']).format('MM');
    console.log('monthDateIncapacity: ', monthDateIncapacity);
    let dayDateIncapacity =  moment(datesDataIncapacityCreated['dateNowValueOf']).format('DD');
    console.log('dayDateIncapacity: ', dayDateIncapacity);
    let yearDateIncapacity =  moment(datesDataIncapacityCreated['dateNowValueOf']).format('YYYY');
    console.log('yearDateIncapacity: ', yearDateIncapacity);

    // this.submitted = true;
    return new Promise((resolve, reject) => {

      let object_send = {
        "EstadoId": 1,
        // "descripcionFicha": "Comprobante de emisión - Nueva incapacidad",
        "situacionEncontrada": `IEGA-${dataResponse['uiCodigoDiagnostico']}-NI-${dataEmployer['nit']}-CC-${this.patientData['tNumeroDocumento']}-${monthDateIncapacity}/${yearDateIncapacity}`,
        "usuarioCreacionId": this.dataDoctor['userId'],
        "contabilidadId": idContabilidad,
        // "claseDocumentoId": "5313F263-F8A0-4801-7CC9-08D8274C56E5",
        "entidadId": 1,
        "nroIncapacidad": dataResponse['uiCodigoDiagnostico'],
        "nitEmpleador": dataEmployer['nit'],
        "valor": Math.round(this.totalPatientValueToPay),
      };
      this.auditService.fnHttpPostCrearMovimientoContable(token, dataResponse['uiCodigoDiagnostico'], object_send).subscribe( r => {
        resolve(true);
        // if (r.status == 201) {
        //   resolve(true);
        //   this.utilitiesService.showToast('top-right', 'success', 'Se ha creado la depuracion con exito');
        //   // this.submitted = false;
        // }
      }, err => {
        reject(false);
      });
    });
  }

  fnGenerateIncapacity() {
    this.submitted = true;
    // this.fnSendMailPatientAlert();
    if (this.dataDiagnosticCorrelation['bProrroga']) {
      // Envio de mail -  Alerta Paciente con prórroga acumulada
      // 1 - Alerta Paciente con prórroga acumulada
      this.fnSendMailPatientAlert(1);
    }

    if(this.patientData["diagnostic"]["patientDaysGranted"] > this.patientData["diagnostic"]["patientDiagnostics"]["iDiasMaxConsulta"]) {
      // Envio de mail -  Alerta Incapacidad con días en exceso
      // 2 - Alerta Incapacidad con días en exceso
      this.fnSendMailPatientAlert(2);
    }

    if(this.flagShowAlertUser == true) {
      // Envio de mail -  Alerta Incapacidad generada por personal no autorizado
      // 3 - Alerta Incapacidad generada por personal no autorizado
      this.fnSendMailPatientAlert(3);
    }

  }

  fnAfectionType(event) {
    this.patientData['diagnostic']['incapacityType'] = null;
    this.collectionIncapacityType = [];
    if (event['id'] == 1) {
      this.collectionIncapacityType = [
        { 'iIdOrigenIncapacidad': 3549 ,'tOrigenIncapacidad': 'Accidente laboral' },
        { 'iIdOrigenIncapacidad': 2 ,'tOrigenIncapacidad': 'Accidente de tránsito' },
      ];
    } else {
      this.collectionIncapacityType = [
        { 'iIdOrigenIncapacidad': 3551 ,'tOrigenIncapacidad': 'Enfermedad laboral' },
        { 'iIdOrigenIncapacidad': 3550 ,'tOrigenIncapacidad': 'Enfermedad general' },
      ];
    }

  }

  fnAddNewEmployerPatient(collectionDataEmployers) {
    let dataSend = {};
    // dataSend['data'] = { module: '', title: 'Agregar empleador', description: 'En el siguiente formulario puedes agregar un nuevo empleador asociado al paciente.', collection: collectionDataEmployers };
    // this.dialogService.open(AgregarEmpleadorComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
    // });
  }

  fnBuildAddress($event) {
    let addressPlaceBuilded = 
      ((this.patientData.diagnostic.addressPlace.patientAddressWayType) ? this.patientData.diagnostic.addressPlace.patientAddressWayType.name : '') +' '+ 
      ((this.patientData.diagnostic.addressPlace.patientAddressFirstNumber) ? this.patientData.diagnostic.addressPlace.patientAddressFirstNumber : '') +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressFirstLetter) ? this.patientData.diagnostic.addressPlace.patientAddressFirstLetter.name : '') +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressSufixBis) ? this.patientData.diagnostic.addressPlace.patientAddressSufixBis.name : '')  +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressSecondLetter) ? this.patientData.diagnostic.addressPlace.patientAddressSecondLetter.name : '')  +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressFirstCardinalSufix) ? this.patientData.diagnostic.addressPlace.patientAddressFirstCardinalSufix.name : '')  +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressSecondNumber) ? this.patientData.diagnostic.addressPlace.patientAddressSecondNumber : '') +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressThirdLetter) ? this.patientData.diagnostic.addressPlace.patientAddressThirdLetter.name : '')  +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressThirdNumber) ? this.patientData.diagnostic.addressPlace.patientAddressThirdNumber : '') +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressSecondCardinalSufix) ? this.patientData.diagnostic.addressPlace.patientAddressSecondCardinalSufix.name : '')  +' '+
      ((this.patientData.diagnostic.addressPlace.patientAddressPlaceCondition) ? this.patientData.diagnostic.addressPlace.patientAddressPlaceCondition : '' );
    this.addressPlaceBuilded = addressPlaceBuilded
}

  fnSendMailPatientAlert(type_email) {
    // this.patientData

    this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    let dataEPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('eps'));
    let dataIPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('ips'));
    if (this.dataDoctor) {
      const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
      const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
      const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
      // const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
      this.dataDoctor['especiality'] = dataDoctorEspeciality;
      this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
      // this.dataDoctor['signature'] = dataDoctorSignature;
      this.dataDoctor['email'] = sessionStorage.getItem('user_session');
      this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));
      this.patientData['incapacities'] = { 'data': this.patientIncapacities, 'totalItems': this.totalItems };
      // this.dataDiagnosticCorrelation

      let flagDiasDeIncapacidad =  this.patientData.diagnostic.patientDaysGranted > this.patientData.diagnostic.patientDiagnostics.iDiasMaxConsulta;
      let diasDeIncapacidadOtorgados = this.patientData.diagnostic.patientDaysGranted;
      let diasMaximoConsulta = this.patientData.diagnostic.patientDiagnostics.iDiasMaxConsulta;
      let diasDeIncapacidadOtorgadosJustificacion = this.patientData.diagnostic.patientDaysGaratedDescription;

      let object_data_send = {
        patientname: this.patientData['tPrimerNombre'] + ' ' + this.patientData['tSegundoNombre'] + ' ' + this.patientData['tPrimerApellido'] + ' ' + this.patientData['tSegundoApellido'],
        patientEmail: this.patientData['tEmail'],
        patientDocumentNumber: this.patientData['tNumeroDocumento'],
        patientDocumentType: this.patientData['tipoDocumento']['tTipoIdentificacion'],
        patientPhoneNumber: this.patientData['tTelefono'],
        doctorname: this.dataDoctor['name'],
        doctorEmail: this.dataDoctor['email'],
        doctorjobeps: dataEPS['tNombre'],
        doctorjobips: dataIPS['tNombre'],
        // data: this.patientData,
        flagDiasDeIncapacidad: (flagDiasDeIncapacidad) ? 1 : 0,
        diasDeIncapacidadOtorgados: diasDeIncapacidadOtorgados,
        diasMaximoConsulta: diasMaximoConsulta,
        diasDeIncapacidadOtorgadosJustificacion: this.patientData.diagnostic.patientDaysGaratedDescription,
        patientIncapacities: this.totalItems,
        doctorDocumentNumber: this.dataDoctor['usuario']['tNumeroDocumento'],
        doctorDocumentNumberType: this.dataDoctor['usuario']['tipoDocumento']['tNombre'],
        doctorPhoneNumber: "+573004401625",
        doctorMedicalRegister: this.dataDoctor['medicalRegister'],
        doctorEspeciality: this.dataDoctor['especiality'],
        correlationIncapacity: (this.dataDiagnosticCorrelation['bProrroga']) ? 1 : 0,
        diasAcumuladosProrroga: (this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga']) ? this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga'] : 0,
        patientDiagnostics: this.patientData.diagnostic.patientDiagnostics.tFullDescripcion,
        patientDaysGaratedDescription: this.patientData.diagnostic.patientDaysGaratedDescription,
        patientConditionMedicalDescription: this.patientData.diagnostic.patientConditionMedicalDescription,
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
        email: 'German Pinilla <gpinilladev@gmail.com>',
        // email: 'jjalmonacid@gmail.com, covalle@famisanar.com.co, haguirre@famisanar.com.co, erodriguezb@famisanar.com.co, framirez@famisanar.com.co, dangulo@famisanar.com.co, fcaicedo@famisanar.com.co, lceballos@famisanar.com.co, vbarrera@famisanar.com.co, joseeduardoquinones@gmail.com, meddylexs@gmail.com, gpinilladev@gmail.com, slopezb@famisanar.com.co, dcastros@famisanar.com.co',
        // email: 'jjalmonacid@gmail.com, gpinilladev@gmail.com, juan.mendez@proyectatsp.com, joseeduardoquinones@gmail.com',
        typeMail: type_email,
        userProgramType: (this.dataUserSpecialist) ? this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'] : '',
        userOcupation: (this.dataUserSpecialist) ? this.dataUserSpecialist['detalles'][0]['ocupacion'] : '',
        // email: 'gpinilladev@gmail.com',
        subject: 'Kustodya Web App - Alerta Incapacidad',
        
      }

      // return false;
      this.incapacityService.fnHttpPostSendAlertMail(this.token, object_data_send).subscribe(response => {
        if (response.status == 200) {
          let dataResposeMailSend = JSON.parse(JSON.stringify(response.body));
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error!', 'nb-alert');
        }
        // this.submitted = false;
      }, error => {
        this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        // this.submitted = false;
      });
    }

  }

  fnGetDoctorRethusByDNI(token, document_type, document_number) {
    // Instancia de conexion servicio
    return new Promise((resolve, reject) => {
      this.rethusService.fnHttpGetListDoctorsRethusByDNI(token, document_type, document_number, '', '').subscribe(response => {
          resolve(response);
      }, err => {
          reject(err);
      });
    });
  }

  fnGetDataUserById(token, user_id) {
    // Instancia de conexion servicio
    // this.loading_state = true;
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUserById(token, user_id).subscribe(response => {
        if (response.status == 200) {
          let data_user_full = JSON.parse(JSON.stringify(response['body']));
          let data_list = JSON.parse(JSON.stringify(response['body']['correos']));
          let data_list_original = JSON.parse(JSON.stringify(response['body']['correos']));
          // this.loading_state = false;
          resolve(data_user_full);
        } else {
          let data_list = [];
          resolve(false);
          // this.loading_state = false;
        }
      }, err => {
        resolve(new Error(err));
          this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
      });
    });
  }

  fnCalcValueIncapacity(patientDaysAccum, dataIBC, index, patientDaysGranted, dataDiagnosticCorrelation) {
    console.log('patientDaysAccum: ', patientDaysAccum);
    console.log('dataIBC: ', dataIBC);

    if(patientDaysAccum != '' && patientDaysAccum != null && dataIBC != '' && dataIBC != null) {
      this.inputValueIBCPatient = dataIBC;
      // let diasAcumulados = dataDiagnosticCorrelation['iDiasAcumuladosPorroga'];
      let diasAcumulados = patientDaysAccum;
      console.log('diasAcumulados: ', diasAcumulados);
      // let prorroga = dataDiagnosticCorrelation['bProrroga'];
      let prorroga = this.patientData['diagnostic']['extensionIncapacity'];
  
      let daysAccumulated = parseInt(diasAcumulados);
      let totalDaysAccumulated = parseInt(patientDaysGranted) + parseInt(diasAcumulados);
      let totalDays = parseInt(patientDaysGranted);
      let valueDayJob = parseInt(this.inputValueIBCPatient) / 30;
      this.valueDayJob = valueDayJob;
      let daysEPSToPay = 0;
      let daysEPSToFirstPay = 0;
      let daysEPSToSecondPay = 0;
      let daysAFPToPay = 0;
      let AFPValueToPay = 0;
      let EPSValuePay = 0;
      let EPSValueFirstPay = 0;
      let EPSValueSecondPay = 0;
      let daysEmployerToPay = 0;
      let employerValuePay = 0;
      let totalPatientDaysToPay = 0;
      let totalPatientValueToPay = 0;
      let formulaFamisanar = (2*(1/3));
      let salarioMinimo = 1000000;
      let valorSalarioMinimoDia = salarioMinimo / 30;
  
      if(prorroga == false) {
  
        if(totalDays <= 30 && totalDays > 0) {
            // Si los dias son superiores a 2 entonces la incapacidad la paga la EPS
  
            daysEPSToPay = totalDays - 2;
            EPSValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
            this.daysEPSToPay = daysEPSToPay;
            this.EPSValuePay = EPSValuePay;
  
            this.daysAFPToPay = daysAFPToPay;
            this.AFPValueToPay = AFPValueToPay;
  
            daysEmployerToPay = totalDays - daysEPSToPay;
            employerValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) * daysEmployerToPay) : valorSalarioMinimoDia * daysEmployerToPay;
            this.daysEmployerToPay = daysEmployerToPay;
            this.employerValuePay = employerValuePay;
  
            totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay;
            totalPatientValueToPay = EPSValuePay + employerValuePay;
            this.totalPatientDaysToPay = totalPatientDaysToPay;
            this.totalPatientValueToPay = totalPatientValueToPay;
  
        }
  
      }
  
      if (prorroga == true) {
        
        
        if (daysAccumulated <= 90 && daysAccumulated > 0) {
            if (totalDaysAccumulated <= 90) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = daysEmployerToPay;
                this.employerValuePay = employerValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 90;
                console.log('data1: ', data1);
                let data2 = totalDays - data1;
                console.log('data2: ', data2);
  
                daysEPSToFirstPay = data2;
                console.log('daysEPSToFirstPay: ', daysEPSToFirstPay);
                EPSValueFirstPay = ((valueDayJob * formulaFamisanar) > valorSalarioMinimoDia) ? ((valueDayJob * formulaFamisanar) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
                console.log('EPSValueFirstPay: ', EPSValueFirstPay);
  
                daysEPSToSecondPay = data1;
                console.log('daysEPSToSecondPay: ', daysEPSToSecondPay);
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
                console.log('EPSValueSecondPay: ', EPSValueSecondPay);
  
                daysEPSToPay = data1 + data2;
                console.log('daysEPSToPay: ', daysEPSToPay);
  
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                console.log('EPSValuePay: ', EPSValuePay);
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = daysEmployerToPay;
                this.employerValuePay = employerValuePay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated <= 180 && daysAccumulated > 90) {
            if (totalDaysAccumulated <= 180 && totalDaysAccumulated > 90) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 180;
                console.log('data1: ', data1);
                let data2 = totalDays - data1;
                console.log('data2: ', data2);
  
                daysEPSToFirstPay = data2;
                console.log('daysEPSToFirstPay: ', daysEPSToFirstPay);
                EPSValueFirstPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
                console.log('EPSValueFirstPay: ', EPSValueFirstPay);
                
                daysEPSToSecondPay = 0;
                console.log('daysEPSToSecondPay: ', daysEPSToSecondPay);
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
                console.log('EPSValueSecondPay: ', EPSValueSecondPay);
                
                daysAFPToPay = data1;
                console.log('daysAFPToPay: ', daysAFPToPay);
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia * daysAFPToPay;
                console.log('AFPValueToPay: ', AFPValueToPay);
  
                // daysEPSToPay = data1 + data2;
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                console.log('daysEPSToPay: ', daysEPSToPay);
                // EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                console.log('EPSValuePay: ', EPSValuePay);
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                console.log('daysEPSToPay: ', daysEPSToPay);
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = 0 // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated <= 540 && daysAccumulated > 180) {
            if (totalDaysAccumulated <= 540 && totalDaysAccumulated > 180) {
                // Paga el Fondo de Pensiones
                daysAFPToPay = totalDays;
                console.log('daysAFPToPay: ', daysAFPToPay);
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia *  daysAFPToPay;
                console.log('AFPValueToPay: ', AFPValueToPay);
                // daysEPSToPay = daysEPSToPay;
                // EPSValuePay = EPSValuePay;
                daysEPSToPay = 0;
                console.log('daysEPSToPay: ', daysEPSToPay);
                EPSValuePay = 0;
                console.log('EPSValuePay: ', EPSValuePay);
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = 0; // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                console.log('daysAFPToPay: ', daysAFPToPay);
                this.AFPValueToPay = AFPValueToPay;
                console.log('AFPValueToPay: ', AFPValueToPay);
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            } else {
  
                let data1 = totalDaysAccumulated - 540;
                console.log('data1: ', data1);
                let data2 = totalDays - data1;
                console.log('data2: ', data2);
  
                daysEPSToFirstPay = 0;
                console.log('daysEPSToFirstPay: ', daysEPSToFirstPay);
                EPSValueFirstPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToFirstPay) : valorSalarioMinimoDia *  daysEPSToFirstPay;
                console.log('EPSValueFirstPay: ', EPSValueFirstPay);
  
                daysEPSToSecondPay = data1;
                console.log('daysEPSToSecondPay: ', daysEPSToSecondPay);
                EPSValueSecondPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToSecondPay) : valorSalarioMinimoDia * daysEPSToSecondPay;
                console.log('EPSValueSecondPay: ', EPSValueSecondPay);
  
                daysAFPToPay = data2;
                console.log('daysAFPToPay: ', daysAFPToPay);
                AFPValueToPay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysAFPToPay) : valorSalarioMinimoDia * daysAFPToPay;
                console.log('AFPValueToPay: ', AFPValueToPay);
  
                // daysEPSToPay = data1 + data2;
                daysEPSToPay = daysEPSToFirstPay + daysEPSToSecondPay;
                console.log('daysEPSToPay: ', daysEPSToPay);
                // daysAFPToPay = daysAFPToPay;
  
                EPSValuePay = EPSValueFirstPay + EPSValueSecondPay;
                // EPSValuePay = EPSValueFirstPay;
                // AFPValueToPay = AFPValueToPay;
                
                // daysEPSToPay = 0;
                // EPSValuePay = 0;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                daysEmployerToPay = totalDays - (daysEPSToPay + daysAFPToPay);
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
        if (daysAccumulated > 540) {
            if (totalDaysAccumulated > 540) {
  
                daysEPSToPay = totalDays;
                EPSValuePay = ((valueDayJob * 0.50) > valorSalarioMinimoDia) ? ((valueDayJob * 0.50) *  daysEPSToPay) : valorSalarioMinimoDia *  daysEPSToPay;
                daysEPSToPay = daysEPSToPay;
                EPSValuePay = EPSValuePay;
                this.daysEPSToPay = daysEPSToPay;
                this.EPSValuePay = EPSValuePay;
  
                daysEmployerToPay = 0; // totalDays - daysEPSToPay;
                employerValuePay = valueDayJob * daysEmployerToPay;
                this.daysEmployerToPay = 0;
                this.employerValuePay = 0;
  
                this.daysAFPToPay = daysAFPToPay;
                this.AFPValueToPay = AFPValueToPay;
  
                totalPatientDaysToPay = daysEPSToPay + daysEmployerToPay + daysAFPToPay;
                totalPatientValueToPay = EPSValuePay + employerValuePay + AFPValueToPay;
                this.totalPatientDaysToPay = totalPatientDaysToPay;
                this.totalPatientValueToPay = totalPatientValueToPay;
  
            }
        }
  
  
      } 
    }

  }


  

}
