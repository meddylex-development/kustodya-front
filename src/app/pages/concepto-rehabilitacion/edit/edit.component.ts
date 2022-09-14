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
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildAddressComponent } from '../../../common/build-address/build-address.component';
import { map } from 'rxjs/operators';
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
  public collectionIncapacityType: any = [];
  public collectionPatientSigns: any = [];
  public collectionPatientSymptoms: any = [];
  public collectionPatientDiagnostics: any = [];

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
  public patientInputClinicHistorySummary: any = 'Usuario con incapacidad prolongada por el (los) Diagnóstico(s) anotados, se emite concepto de rehabilitación en cumplimiento de normatividad vigente para trámite de calificación de pérdida de capacidad laboral o revisión de la calificación de pérdida de capacidad laboral a la que haya lugar por el Fondo de Pensiones de acuerdo con normatividad vigente: Decreto 1333/2018 y Decreto 1352/2013.';
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
  public collectionTreatmentPurpose: any = [
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
  public flagShowDiagnostics: boolean = false;
  public flagShowSequels: boolean = false;
  public validDiagnostic: boolean = false;
  public textLoading: string = 'Obteniendo información del concepto de rehabilitación...';
  public percentajeConcept: any = null;
  public dataEmployers: any;
  public dataMettrics: any;
  public linearMode: boolean = true;
  public dataSession;
  public inputEmailPatient: boolean = false;
  public inputPhonePatient: boolean = false;
  public inputAddressPatient: boolean = false;
  public patientCountry: any = null;
  public patientDepartament: any = null;
  public patientCity: any = null;
  public patientAddressWayType: any = null;
  public patientAddressFirstNumber: any = null;
  public patientAddressFirstLetter: any = null;
  public patientAddressSufixBis: any = null;
  public patientAddressSecondLetter: any = null;
  public patientAddressFirstCardinalSufix: any = null;
  public patientAddressSecondNumber: any = null;
  public patientAddressThirdLetter: any = null;
  public patientAddressThirdNumber: any = null;
  public patientAddressSecondCardinalSufix: any = null;
  public patientAddressPlaceCondition: any = null;
  public idPaciente: any = null;
  public idCaso: any = null;
  public collectionDataSelectors: any = null;
  public patientFullName: string;
  public dataConceptForm: any = {
    'ResumenHistoriaClinica': '',
    'FinalidadTratamientos': '',
  };

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
    private authService: NbAuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
  }
  
  ngOnInit() {
    $(document).ready(function () {
      // $("#stepper-crhb > .header > div:nth-child(5) > .label-index").css("border", "2px solid #ff6780");
      // $("#stepper-crhb > .header > div:nth-child(5) > div").css("color", "#ff6780").click((resp) => {
      //   alert("Alert!");
      // });

    });
    /* **** END - JQuery definition **** */
    // /api/K2ConceptoRehabilitacion/ConceptoRehabilitacion/{pacienteporEmitirId}
    // this.bsLocaleService.use('es');
    // this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    this.submitted = true;
    // this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token["token"];
        this.dataSession = token.getPayload();

        this.route.params.subscribe(params => {
          this.idPaciente = params['idPaciente'];
          this.idCaso = params['idCaso'];
          let dataObject = {
            "idPaciente": this.idPaciente,
          };

          // let service1 = this.fnGetDataUser(this.token, dataObject);
          // let service2 = this.fnGetDataConcept(this.token, params['idCaso']);

          // Promise.all([service1, service2]).then((response) => {
          //   if (response.length > 0) {
              
          //   } else {
          //     this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          //   }
          // });
          this.bsLocaleService.use('es');
          this.fnGetDataConcept(this.token, this.idCaso).then((response6) => {
            if (response6) {
              // this.collectionMedicalConcept = response6['body'];
              this.dataConcept = response6['body'];
              this.dataConceptForm = response6['body']['Concepto'][0];
    
              this.dataConcept['DiagnosticosConcepto'].forEach((value, key) => {
                this.listDiagnosticsPatient.push({
                  'idDiagnosticoConcepto': value['id'],
                  'aplicaLateralidad': null,
                  'iDiasMaxAcumulados': null,
                  'iDiasMaxConsulta': null,
                  'iIdcie10': value['Cie10Id'],
                  'iIdtipoCie': null,
                  'tCie10': value['tCIE10'],
                  'tDescripcion': value['tDescripcion'],
                  'tFullDescripcion': `${ value['tCIE10'] } ${ value['tDescripcion'] }`,
                  'fechaIncapacidad': value['FechaIncapacidad'],
                  'etiologia': value['Etiologia'],
                  'nombreEtiologia': value['nombreEtiologia'],
                });
              });
              this.dataConcept['SecuelasConcepto'].forEach((value, key) => {
                this.listSequelsPatient.push({
                  'id': value['Id'],
                  'idTypeSequel': value['Tipo'],
                  'nameTypeSequel': value['nombreSecuela'],
                  'idMedicalPrognosis': value['Pronostico'],
                  'nameMedicalPrognosis': value['nombrePronostico'],
                  'sequelDescription': value['Descripcion'],
                  'dateSequel': null,
                });
              });
              this.checkPharmacological = this.dataConceptForm['farmacologico'];
              this.checkOccupationalTherapy = this.dataConceptForm['terapiaOcupacional'];
              this.checkSpeechTherapy = this.dataConceptForm['fonoAudiologia'];
              this.checkSurgical = this.dataConceptForm['quirurgico'];
              this.checkPhysicalTherapy = this.dataConceptForm['terapiaFisica'];
              this.checkOtherTherapy = this.dataConceptForm['otrosTramites'];
    
              this.patientInputOtherTreatments = this.dataConceptForm['otrosTratamientos'];
    
              this.patientGoodShortTerm = (this.dataConceptForm['PlazoCorto'] == 1) ? true : false;
              this.patientRegularShortTerm = (this.dataConceptForm['PlazoCorto'] == 2) ? true : false;
              this.patientBadShortTerm = (this.dataConceptForm['PlazoCorto'] == 3) ? true : false;
    
              this.patientGoodMediumTerm = (this.dataConceptForm['PlazoMediano'] == 1) ? true : false;
              this.patientRegularMediumTerm = (this.dataConceptForm['PlazoMediano'] == 2) ? true : false;
              this.patientBadMediumTerm = (this.dataConceptForm['PlazoMediano'] == 3) ? true : false;
    
    
    
              // let dataType = ((this.dataConceptForm['Concepto'] < 3) ? (this.dataCollectionConcepts.filter((el) => { return el.pronosticoConceptoId == this.dataConceptForm['Concepto'] }))[0] : (this.dataCollectionConcepts.filter((el) => { return el.pronosticoConceptoId == 2 }))[0]) || 0;
              let dataType = (this.dataConceptForm['Concepto'] == 1) ? 1 : (this.dataConceptForm['Concepto'] == 2 || this.dataConceptForm['Concepto'] == 3) ? 2 : 0;
              // this.selectMedicalConcept = (dataType < 3) ? dataType : dataType;
              this.selectMedicalConcept = dataType;
              this.unfavTypeWithIncapacity = (this.dataConceptForm['Concepto'] == 2) ? true : false;
              this.unfavTypeNoIncapacity = (this.dataConceptForm['Concepto'] == 3) ? true : false;

              this.fnGetDataUser(this.token, dataObject).then((response) => {
                if (response) {
                  this.submitted = false;
                  this.fnClickStep(1);
                  this.fnClickStep(2);
                  this.fnClickStep(3);
                  this.fnClickStep(4);
                  this.textLoading = '';
                  this.patientData = response['body']['informacionPacientes'][0];
                  this.patientFullName = (`${this.patientData['primerNombre']} ${this.patientData['segundoNombre']} ${this.patientData['primerApellido']} ${this.patientData['segundoApellido']}`).trim();
                  this.dataEmployers = response['body']['empleador'];
                  this.dataMettrics = response['body']['datosTotales'];
                  // this.loading = false;
                } else {
                  this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
                  // this.dismiss(false);
                  // this.loading = false;
                }
              }).catch((err) => {
                this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
              });
    
    
              this.fnGetDataSelectors(this.token).then(response1 => {
                if (response1) {
                  this.collectionDataSelectors = response1;
                  this.collectionEtiology = response1['TiposEtiologia'];
                  this.collectionTypeSequel = response1['TiposSecuela'];
                  this.collectionMedicalPrognosis = response1['TiposPronostico'];
                  this.collectionTreatmentPurpose = response1['TiposFinalidadTratamiento'];
                } else {
                  this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
                } 
              });
    
              this.fnGetCie10(this.token, 1).then(response1 => {
                if (response1) {
                  this.collectionPatientDiagnostics = response1;
                } else {
                  this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
                } 
              });

              this.fnGetListMedicalConcept(this.token).then((response5) => {
                if (response5) {
                  this.collectionMedicalConcept = response5['body'];
                } else {
                  this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
                }
              });

              this.fnGetDataPlace();
              this.percentajeConcept = this.dataConceptForm['Progreso'];
              this.fnGetPercentaje()

              // this.fnGetListMedicalPrognosis(this.token).then((response4) => {
              //   if (response4) {
              //     this.collectionMedicalPrognosis = response4['body'];
              //   } else {
              //     this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
              //   }
              // });

              this.fnGetDataUserById(this.token, this.dataSession['UserId']).then((response) => {
                if (response) {
                  let numeroIdentificacion = response['numeroIdentificacion'];
                  this.fnGetDoctorRethusByDNI(this.token, 1, numeroIdentificacion).then((responseRethus) => {
                    if (responseRethus['body']) {
        
                      this.fnGetDoctorRethusByDNI(this.token, 'CC', numeroIdentificacion).then((responseRethusDetail) => {
                        if (responseRethusDetail['body']) {
                          this.dataUserSpecialist = responseRethusDetail['body'];
                          let tipoPorgrama = this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
                          if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
                            this.flagShowAlertUser = true;
                          } else {
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
              });
    
            } else {
              this.submitted = false;
              this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            }
          });
          // this.fnGetDataConceptAll(this.token, this.idCaso, this.idPaciente);
        });

      }
    });
  }

  fnGetDataPlace() {
    this.utilitiesService.fnGetCountryDataAPI().subscribe(response => {
      const dataCountries = JSON.parse(JSON.stringify(response['body']));
      let dataContry = [];
      // dataCountries.forEach(element => {
      //   dataContry.push({ 'name': element['name']['common'], 'flag': element['flags'], 'allDataCountry': element })
      // });
      dataContry = [{ name: ' Colombia', flag: 'null', allDataCountry: {} }];
      this.collectionCountries = dataContry;
      // this.patientData['diagnostic']['patientCountryCondition'] = this.collectionCountries[34];
    }, (error) => {
    });

    let urlApi = this.utilitiesService.fnReturnUrlApiMapDivPolColombia();
    this.utilitiesService.fnHttpGetDataJSONAPI(urlApi).then(response => {
      this.collectionDepartaments = JSON.parse(JSON.stringify(response));
    }, (error) => {
    });
  }

  fnGetDataUser(token, data_object_) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUser(token, data_object_).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
      });
    })
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
    this.submitted = true;
    this.textLoading = 'Agregando nuevo diagnósitco concepto...';
    // const date_unix = moment(patientInputDiagnosticDate).unix();
    const patientDiagnosticDate = moment(patientInputDiagnosticDate).valueOf();

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
      let dataObjectDiagnostic = {
        "conceptoRehabilitacionId": this.dataConceptForm['iIDConcepto'],
        "cie10Id": selectPatientDiagnostics['iIdcie10'],
        "fechaIncapacidad": (moment(patientDiagnosticDate).format('YYYY-MM-DD')) + 'T' + (moment(patientDiagnosticDate).format('HH:mm:ss')), // 2022-04-22T21:52:54.177Z HH:mm:ss
        "etiologia": selectPatientEtiology['iIDMultivalor'],
      };
      this.fnSaveConceptDiagnostic(this.token, dataObjectDiagnostic).then((response) => {
        if (response) {
          // this.listDiagnosticsPatient[this.listDiagnosticsPatient.length - 1]['idDiagnosticoConcepto'] = response['body']['idDiagnosticoConcepto'];
          this.utilitiesService.showToast('bottom-right', 'success', 'Diagnostico agegado satisfactoriamente!', 'nb-check');
          this.fnUpdateConceptSilence().then((resp) => {
            if (resp) {
              this.fnGetPercentaje();
              this.fnClickStep(1);
              this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
              this.submitted = false;
              this.textLoading = '';
            } else {
              this.submitted = false;
              this.textLoading = '';
            }
          });
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error agregando el diagnóstico', 'nb-alert');
        }
      });
      this.selectPatientDiagnostics = '';
      this.selectPatientEtiology = '';
      this.patientInputDiagnosticDate = '';
    } else {
      let validData = false;
      this.listDiagnosticsPatient.forEach((element, key) => {
        // element['valid'] = false;
        if (element['iIdcie10'] === selectPatientDiagnostics['iIdcie10']) {
          validData = true;
          this.validDiagnostic = true;
          // key diagnostic-{{i}}
          // element['valid'] = true;
          $('.diagnostic-' + key).removeClass('degrade-border-danger', () => {
            // $('.diagnostic-' + key).addClass('degrade-border-danger');
            $('.diagnostic-' + key).removeClass('pulse', () => {
              $('.diagnostic-' + key).removeClass('headShake', () => {
                $('.diagnostic-' + key).addClass('headShake', () => {
                  // setTimeout(() => {
                  //   $('.diagnostic-' + key).addClass('headShake', () => {
                  //     // hola
                  //   });
                  // }, 1000);
                });
              });
            }); 
          });
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
              'etiologia': selectPatientEtiology['iIDMultivalor'],
              'nombreEtiologia': selectPatientEtiology['tDescripcion'],
            });
            this.selectPatientDiagnostics = '';
            this.selectPatientEtiology = '';
            this.patientInputDiagnosticDate = '';
            // /api/K2ConceptoRehabilitacion/AgregarDiagnosticoConcepto
            let dataObjectDiagnostic = {
              "conceptoRehabilitacionId": this.dataConceptForm['iIDConcepto'],
              "cie10Id": selectPatientDiagnostics['iIdcie10'],
              "fechaIncapacidad": (moment(patientDiagnosticDate).format('YYYY-MM-DD')) + 'T' + (moment(patientDiagnosticDate).format('HH:mm:ss')), // 2022-04-22T21:52:54.177Z HH:mm:ss
              "etiologia": selectPatientEtiology['iIDMultivalor'],
            };
            this.fnSaveConceptDiagnostic(this.token, dataObjectDiagnostic).then((response) => {
              if (response) {
                // this.listDiagnosticsPatient[this.listDiagnosticsPatient.length - 1]['idDiagnosticoConcepto'] = response['body']['idDiagnosticoConcepto'];
                this.utilitiesService.showToast('bottom-right', 'success', 'Diagnostico agegado satisfactoriamente!', 'nb-check');
                this.fnUpdateConceptSilence().then((resp) => {
                  if (resp) {
                    this.fnGetPercentaje();
                    this.fnClickStep(1);
                    this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
                    this.submitted = false;
                    this.textLoading = '';
                  } else {
                    this.submitted = false;
                    this.textLoading = '';
                  }
                });
                
              } else {
                this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error agregando el diagnóstico', 'nb-alert');
              }

            });
          } 
        }
      });
    }
    // this.dataConcept.diagnostic = '';
    // this.dataConcept.date_create = '';
    // this.dataConcept.etiology = '';
    // this.error_diagnotics_patient = false;
  }

  fnSaveConceptDiagnostic(token, data_object) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetSaveConceptDiagnostic(token, data_object).subscribe(response => {
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

  fnSaveConceptSequels(token, data_object) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetSaveConceptSequels(token, data_object).subscribe(response => {
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
    this.submitted = true;
    this.textLoading = 'Agregando nueva secuela concepto...';
    // const date_unix = moment(patientInputDiagnosticDate).unix();
    const patientSequelDate = moment().valueOf();
    this.listSequelsPatient.push({
      'idTypeSequel': selectPatientTypeSequel['iIDMultivalor'],
      'nameTypeSequel': selectPatientTypeSequel['tDescripcion'],
      'idMedicalPrognosis': selectPatientMedicalPrognosis['iIDMultivalor'],
      'nameMedicalPrognosis': selectPatientMedicalPrognosis['tDescripcion'],
      'sequelDescription': patientInputSequelDescription,
      'dateSequel': patientSequelDate,
    });
    this.selectPatientTypeSequel = '';
    this.selectPatientMedicalPrognosis = '';
    this.patientInputSequelDescription = '';
    let dataObjectSequel = {
      "conceptoRehabilitacionId": this.dataConceptForm['iIDConcepto'],
      "tipo": selectPatientTypeSequel['iIDMultivalor'],
      "descripcion": patientInputSequelDescription,
      "pronostico": selectPatientMedicalPrognosis['iIDMultivalor'],
    };
    this.fnSaveConceptSequels(this.token, dataObjectSequel).then((response) => {
      if (response) {
        this.utilitiesService.showToast('bottom-right', 'success', 'Secuela agegada satisfactoriamente!', 'nb-check');
        this.fnUpdateConceptSilence().then((resp) => {
          if (resp) {
            this.fnGetPercentaje();
            this.fnClickStep(2);
            this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
            this.submitted = false;
            this.textLoading = '';
          } else {
            this.submitted = false;
            this.textLoading = '';
          }
        });
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error agregando la secuela', 'nb-alert');
      }

    });
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
  }

  fnSetMedicalConcept(data_concept) {
    if (data_concept) {
      switch (data_concept["value"]) {
        case 1:
          // this.collectionMedicalConcept[0]; // Favorable
          this.descriptionMedicalConcept = this.collectionMedicalConcept[0]['texto'];
          this.unfavTypeWithIncapacity = false;
          this.unfavTypeNoIncapacity = false;
          this.fnGetPercentaje();
          break;
        case 2:
          this.unfavTypeWithIncapacity = true;
          this.unfavTypeNoIncapacity = false;
          // this.collectionMedicalConcept
          // this.collectionMedicalConcept[1]; // Desfavorable - con incapacidad
          // this.collectionMedicalConcept[2]; // Desfavorable - sin incapacidad
          this.fnGetPercentaje();
          break;
      }
    } else {
      this.fnGetPercentaje();
    }
    
  }

  fnCheckUnFavType(unfav_type) {
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
    // this.patientConcept = data['patientConcept'];

    // this.submitted = true;
    // let dataObjectSend = {
    //   "id": this.dataConceptForm['iIDConcepto'],
    //   // "resumenHistoriaClinica": (this.patientInputClinicHistorySummary) ? this.patientInputClinicHistorySummary : '',
    //   "resumenHistoriaClinica": (this.dataConceptForm['ResumenHistoriaClinica']) ? this.dataConceptForm['ResumenHistoriaClinica'] : '',
    //   "finalidadTratamientos": (this.dataConceptForm['FinalidadTratamientos']) ? this.dataConceptForm['FinalidadTratamientos'] : 0,
    //   "esFarmacologico": (this.dataConceptForm['EsFarmacologico']) ? this.dataConceptForm['EsFarmacologico'] : false,
    //   "esTerapiaOcupacional": (this.dataConceptForm['EsTerapiaOcupacional']) ? this.dataConceptForm['EsTerapiaOcupacional'] : false,
    //   "esFonoaudiologia": (this.dataConceptForm['EsFonoaudiologia']) ? this.dataConceptForm['EsFonoaudiologia'] : false,
    //   "esQuirurgico": (this.dataConceptForm['EsQuirurgico']) ? this.dataConceptForm['EsQuirurgico'] : false,
    //   "esTerapiaFisica": (this.dataConceptForm['EsTerapiaFisica']) ? this.dataConceptForm['EsTerapiaFisica'] : false,
    //   "esOtrosTratamientos": (this.dataConceptForm['EsOtrosTratamientos']) ? this.dataConceptForm['EsOtrosTratamientos'] : false,
    //   "descripcionOtrosTratamientos": (this.dataConceptForm['DescripcionOtrosTratamientos']) ? this.dataConceptForm['DescripcionOtrosTratamientos'] : '',
    //   "plazoCorto": (this.patientGoodShortTerm) ? 1 : (this.patientRegularShortTerm) ? 2 : (this.patientBadShortTerm) ? 3 : 0,
    //   "plazoMediano": (this.patientGoodMediumTerm) ? 1 : (this.patientRegularMediumTerm) ? 2 : (this.patientBadMediumTerm) ? 3 : 0,
    //   "concepto": 0,
    //   "remisionAdministradoraFondoPension": '',
    //   "progreso": this.percentajeConcept,
    //   "idAfp": (this.dataConceptForm['iIDAfp']) ? this.dataConceptForm['iIDAfp'] :  this.patientData['IDafp'],
    //   "tAsunto": (this.dataConceptForm['tAsunto']) ? this.dataConceptForm['tAsunto'] : '',
    //   "tDireccionPaciente": (this.patientData['direccion']) ? this.patientData['direccion'] : '',
    //   "tTelefonoPaciente": (this.patientData['telefono']) ? this.patientData['telefono'] : '',
    //   "iIDCiudad": (this.patientData['iIDCiudad']) ? this.patientData['iIDCiudad'] : 1,
    //   "tEmailPaciente": (this.patientData['email']) ? this.patientData['email'] : '',
    // };
    // if (this.selectMedicalConcept) {
    //   dataObjectSend['concepto'] = (this.selectMedicalConcept == 1) ? 1 : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? 2 : (this.selectMedicalConcept == 2 && !this.unfavTypeWithIncapacity) ? 3 : 0;
    //   dataObjectSend['remisionAdministradoraFondoPension'] = (this.selectMedicalConcept == 1) ? this.collectionMedicalConcept[0]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? this.collectionMedicalConcept[1]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeNoIncapacity) ? this.collectionMedicalConcept[2]['texto'] : '';
    // } 
    // this.utilitiesService.fnSetSessionStorage('data-concept', JSON.stringify(dataObjectSend));
    this.fnUpdateConceptSilence().then((resp) => {
      if (resp) {
        this.router.navigate(['/pages/concepto-de-rehabilitacion/certificado-emitido/', this.idCaso, this.dataConceptForm['PacienteId']], { skipLocationChange: false });
      } else {
        // Error al actualizar
      }
    });
    // this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/certificado-emitido/' + this.idCaso + '/' + this.dataConceptForm['PacienteId']);
  }

  fnGetDataConcept(token, id_task) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpGetConceptByTask(token, id_task).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        } else {
          reject(false);
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

  fnGetPercentaje(): void {

    let valPorDiagnosticos = 20;
    let valPorSecuelas = 10;
    let valPorResumenHistoriaClinica = 10;
    let valPorFinalidadTratamientos = 10;
    let valPorTratamientoSinOtros = 10;
    let valPorTratamientoConOtros = 5;
    let valPorOtrosTratamintos = 5;
    let valPorDescOtrosTratamientos = 5;
    let valPorCortoPlazo = 5;
    let valPorMedianoPlazo = 5;
    let valPorConcepto = 30;


    let valueProgress = 0;
    // Valor por diagnosticos = 20
    valueProgress = (this.listDiagnosticsPatient.length > 0) ? valueProgress + valPorDiagnosticos : valueProgress + 0;
    // Valor por secuelas = 20
    valueProgress = (this.listSequelsPatient.length > 0) ? valueProgress + valPorSecuelas : valueProgress + 0;
    // Valor por historia clinica = 20
    valueProgress = (this.dataConceptForm['ResumenHistoriaClinica']) ? valueProgress + valPorResumenHistoriaClinica : valueProgress + 0;
    // Valor por finalidad tratamiento = 10
    valueProgress = (this.dataConceptForm['FinalidadTratamientos']) ? valueProgress + valPorFinalidadTratamientos : valueProgress + 0;
    // Valor por tipo de tratamiento (si no esta chequeado otros tramientos su peso sera de 10 pero si esta chequeado otros tratamientos su valor sera de 5)
    valueProgress = ((this.dataConceptForm['EsFarmacologico'] || 
        this.dataConceptForm['EsTerapiaOcupacional'] || 
        this.dataConceptForm['EsFonoaudiologia'] || 
        this.dataConceptForm['EsQuirurgico'] || 
        this.dataConceptForm['EsTerapiaFisica']) && 
      (!this.dataConceptForm['EsOtrosTratamientos'])) ? valueProgress + valPorTratamientoSinOtros : 
      ((this.dataConceptForm['EsFarmacologico'] || 
        this.dataConceptForm['EsTerapiaOcupacional'] || 
        this.dataConceptForm['EsFonoaudiologia'] || 
        this.dataConceptForm['EsQuirurgico'] || 
        this.dataConceptForm['EsTerapiaFisica']) && (this.dataConceptForm['EsOtrosTratamientos'])) ? valueProgress + valPorTratamientoConOtros : 
      ((!this.dataConceptForm['EsFarmacologico'] || 
        !this.dataConceptForm['EsTerapiaOcupacional'] || 
        !this.dataConceptForm['EsFonoaudiologia'] || 
        !this.dataConceptForm['EsQuirurgico'] || 
        !this.dataConceptForm['EsTerapiaFisica']) && (this.dataConceptForm['EsOtrosTratamientos'])) ? valueProgress + valPorOtrosTratamintos : valueProgress + 0;
    // Otros tratamientos y descripcion de otros tratamientos = 5
    valueProgress = (
      this.dataConceptForm['EsOtrosTratamientos'] && this.dataConceptForm['DescripcionOtrosTratamientos']) ? valueProgress + valPorDescOtrosTratamientos : 
      (this.dataConceptForm['EsOtrosTratamientos'] && (!this.dataConceptForm['DescripcionOtrosTratamientos'] || this.dataConceptForm['DescripcionOtrosTratamientos'] == '' || this.dataConceptForm['DescripcionOtrosTratamientos'] == null)) ? valueProgress + 0 : valueProgress + 0;
    // Corto plazo = 5
    // valueProgress = (this.patientGoodShortTerm) ? valueProgress + 5 : (this.patientRegularShortTerm) ? valueProgress + 5 : (this.patientBadShortTerm) ? valueProgress + 5 : valueProgress + 0;
    valueProgress = (this.patientGoodShortTerm || this.patientRegularShortTerm || this.patientBadShortTerm) ? valueProgress + valPorCortoPlazo : valueProgress + 0;
    // Mediano plazo = 5
    // valueProgress = (this.patientGoodMediumTerm) ? valueProgress + 5 : (this.patientRegularMediumTerm) ? valueProgress + 5 : (this.patientBadMediumTerm) ? valueProgress + 5 : valueProgress + 0;
    valueProgress = (this.patientGoodMediumTerm || this.patientRegularMediumTerm || this.patientBadMediumTerm) ? valueProgress + valPorMedianoPlazo : valueProgress + 0;
    // Concepto - Remision fondo de pensiones = 10
    if (this.selectMedicalConcept) {
      valueProgress = (this.selectMedicalConcept == 1) ? valueProgress + valPorConcepto : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? valueProgress + valPorConcepto : (this.selectMedicalConcept == 2 && !this.unfavTypeWithIncapacity) ? valueProgress + valPorConcepto : valueProgress + 0;
    } else {
      valueProgress = valueProgress + 0;
    }
    this.percentajeConcept = valueProgress;
    // return valueProgress;
  }

  fnUpdateConcept() {
    this.submitted = true;
    this.textLoading = 'Guardando información del concepto';
    
    // this.dataConcept
    // this.selectMedicalConcept
    // this.dataCollectionConcepts

    this.fnGetPercentaje();
    // this.percentajeConcept
    // return false;
    let dataObjectSend = {
      "id": this.dataConceptForm['iIDConcepto'],
      // "resumenHistoriaClinica": (this.patientInputClinicHistorySummary) ? this.patientInputClinicHistorySummary : '',
      "resumenHistoriaClinica": (this.dataConceptForm['ResumenHistoriaClinica']) ? this.dataConceptForm['ResumenHistoriaClinica'] : '',
      "finalidadTratamientos": (this.dataConceptForm['FinalidadTratamientos']) ? this.dataConceptForm['FinalidadTratamientos'] : 0,
      "esFarmacologico": (this.dataConceptForm['EsFarmacologico']) ? this.dataConceptForm['EsFarmacologico'] : false,
      "esTerapiaOcupacional": (this.dataConceptForm['EsTerapiaOcupacional']) ? this.dataConceptForm['EsTerapiaOcupacional'] : false,
      "esFonoaudiologia": (this.dataConceptForm['EsFonoaudiologia']) ? this.dataConceptForm['EsFonoaudiologia'] : false,
      "esQuirurgico": (this.dataConceptForm['EsQuirurgico']) ? this.dataConceptForm['EsQuirurgico'] : false,
      "esTerapiaFisica": (this.dataConceptForm['EsTerapiaFisica']) ? this.dataConceptForm['EsTerapiaFisica'] : false,
      "esOtrosTratamientos": (this.dataConceptForm['EsOtrosTratamientos']) ? this.dataConceptForm['EsOtrosTratamientos'] : false,
      "descripcionOtrosTratamientos": (this.dataConceptForm['DescripcionOtrosTratamientos']) ? this.dataConceptForm['DescripcionOtrosTratamientos'] : '',
      "plazoCorto": (this.patientGoodShortTerm) ? 1 : (this.patientRegularShortTerm) ? 2 : (this.patientBadShortTerm) ? 3 : 0,
      "plazoMediano": (this.patientGoodMediumTerm) ? 1 : (this.patientRegularMediumTerm) ? 2 : (this.patientBadMediumTerm) ? 3 : 0,
      "concepto": 0,
      "remisionAdministradoraFondoPension": '',
      "progreso": this.percentajeConcept,
      "idAfp": (this.dataConceptForm['iIDAfp']) ? this.dataConceptForm['iIDAfp'] :  this.patientData['IDafp'],
      "tAsunto": (this.dataConceptForm['tAsunto']) ? this.dataConceptForm['tAsunto'] : '',
      "tDireccionPaciente": (this.patientData['direccion']) ? this.patientData['direccion'] : '',
      "tTelefonoPaciente": (this.patientData['telefono']) ? this.patientData['telefono'] : '',
      "iIDCiudad": (this.patientData['iIDCiudad']) ? this.patientData['iIDCiudad'] : 1,
      "tEmailPaciente": (this.patientData['email']) ? this.patientData['email'] : '',
    };
    if (this.selectMedicalConcept) {
      dataObjectSend['concepto'] = (this.selectMedicalConcept == 1) ? 1 : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? 2 : (this.selectMedicalConcept == 2 && !this.unfavTypeWithIncapacity) ? 3 : 0;
      dataObjectSend['remisionAdministradoraFondoPension'] = (this.selectMedicalConcept == 1) ? this.collectionMedicalConcept[0]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? this.collectionMedicalConcept[1]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeNoIncapacity) ? this.collectionMedicalConcept[2]['texto'] : '';
    } 
    // /api/K2ConceptoRehabilitacion/ActualizarConcepto // fnHttpSetUpdateConcept(guid_user, data_object)
    this.fnSetUpdateConceptCase(this.token, dataObjectSend).then((response) => {
      if (response) {
        this.utilitiesService.showToast('top-right', 'success', 'Concepto guardado satisfactoriamente!');
        this.submitted = false;
        this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.submitted = false;
        this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
      }
    }).catch((err) => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      this.submitted = false;
      this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
    });
  }

  fnUpdateConceptSilence() {
    return new Promise((resolve, reject) => {
      // this.submitted = false;
      // this.textLoading = '';
      
      // this.dataConcept
      // this.selectMedicalConcept
      // this.dataCollectionConcepts
  
      this.fnGetPercentaje();
      // this.percentajeConcept
      // return false;
      let dataObjectSend = {
        "id": this.dataConceptForm['iIDConcepto'],
        // "resumenHistoriaClinica": (this.patientInputClinicHistorySummary) ? this.patientInputClinicHistorySummary : '',
        "resumenHistoriaClinica": (this.dataConceptForm['ResumenHistoriaClinica']) ? this.dataConceptForm['ResumenHistoriaClinica'] : '',
        "finalidadTratamientos": (this.dataConceptForm['FinalidadTratamientos']) ? this.dataConceptForm['FinalidadTratamientos'] : 0,
        "esFarmacologico": (this.dataConceptForm['EsFarmacologico']) ? this.dataConceptForm['EsFarmacologico'] : false,
        "esTerapiaOcupacional": (this.dataConceptForm['EsTerapiaOcupacional']) ? this.dataConceptForm['EsTerapiaOcupacional'] : false,
        "esFonoaudiologia": (this.dataConceptForm['EsFonoaudiologia']) ? this.dataConceptForm['EsFonoaudiologia'] : false,
        "esQuirurgico": (this.dataConceptForm['EsQuirurgico']) ? this.dataConceptForm['EsQuirurgico'] : false,
        "esTerapiaFisica": (this.dataConceptForm['EsTerapiaFisica']) ? this.dataConceptForm['EsTerapiaFisica'] : false,
        "esOtrosTratamientos": (this.dataConceptForm['EsOtrosTratamientos']) ? this.dataConceptForm['EsOtrosTratamientos'] : false,
        "descripcionOtrosTratamientos": (this.dataConceptForm['DescripcionOtrosTratamientos']) ? this.dataConceptForm['DescripcionOtrosTratamientos'] : '',
        "plazoCorto": (this.patientGoodShortTerm) ? 1 : (this.patientRegularShortTerm) ? 2 : (this.patientBadShortTerm) ? 3 : 0,
        "plazoMediano": (this.patientGoodMediumTerm) ? 1 : (this.patientRegularMediumTerm) ? 2 : (this.patientBadMediumTerm) ? 3 : 0,
        "concepto": 0,
        "remisionAdministradoraFondoPension": '',
        "progreso": this.percentajeConcept,
        "idAfp": (this.dataConceptForm['iIDAfp']) ? this.dataConceptForm['iIDAfp'] :  this.patientData['IDafp'],
        "tAsunto": (this.dataConceptForm['tAsunto']) ? this.dataConceptForm['tAsunto'] : '',
        "tDireccionPaciente": (this.patientData['direccion']) ? this.patientData['direccion'] : '',
        "tTelefonoPaciente": (this.patientData['telefono']) ? this.patientData['telefono'] : '',
        "iIDCiudad": (this.patientData['iIDCiudad']) ? this.patientData['iIDCiudad'] : 1,
        "tEmailPaciente": (this.patientData['email']) ? this.patientData['email'] : '',
      };
      if (this.selectMedicalConcept) {
        dataObjectSend['concepto'] = (this.selectMedicalConcept == 1) ? 1 : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? 2 : (this.selectMedicalConcept == 2 && !this.unfavTypeWithIncapacity) ? 3 : 0;
        dataObjectSend['remisionAdministradoraFondoPension'] = (this.selectMedicalConcept == 1) ? this.collectionMedicalConcept[0]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? this.collectionMedicalConcept[1]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeNoIncapacity) ? this.collectionMedicalConcept[2]['texto'] : '';
      } 
      // /api/K2ConceptoRehabilitacion/ActualizarConcepto // fnHttpSetUpdateConcept(guid_user, data_object)
      this.fnSetUpdateConceptCase(this.token, dataObjectSend).then((response) => {
        if (response) {
          // this.utilitiesService.showToast('top-right', 'success', 'Concepto guardado satisfactoriamente!');
          // this.submitted = false;
          // this.textLoading = '';
          resolve(true);
        } else {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          // this.submitted = false;
          // this.textLoading = '';
          resolve(false);
        }
      }).catch((err) => {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        reject(err);
        // this.submitted = false;
        // this.textLoading = '';
      });
    });
  }

  fnEmmitConcept() {
    this.submitted = true;
    this.textLoading = 'Guardando información del concepto';
    
    // this.dataConcept
    // this.selectMedicalConcept
    // this.dataCollectionConcepts

    this.fnGetPercentaje();
    // this.percentajeConcept
    // return false;
    let dataObjectSend = {
      "id": this.dataConceptForm['iIDConcepto'],
      // "resumenHistoriaClinica": (this.patientInputClinicHistorySummary) ? this.patientInputClinicHistorySummary : '',
      "resumenHistoriaClinica": (this.dataConceptForm['ResumenHistoriaClinica']) ? this.dataConceptForm['ResumenHistoriaClinica'] : '',
      "finalidadTratamientos": (this.dataConceptForm['FinalidadTratamientos']) ? this.dataConceptForm['FinalidadTratamientos'] : 0,
      "esFarmacologico": (this.dataConceptForm['EsFarmacologico']) ? this.dataConceptForm['EsFarmacologico'] : false,
      "esTerapiaOcupacional": (this.dataConceptForm['EsTerapiaOcupacional']) ? this.dataConceptForm['EsTerapiaOcupacional'] : false,
      "esFonoaudiologia": (this.dataConceptForm['EsFonoaudiologia']) ? this.dataConceptForm['EsFonoaudiologia'] : false,
      "esQuirurgico": (this.dataConceptForm['EsQuirurgico']) ? this.dataConceptForm['EsQuirurgico'] : false,
      "esTerapiaFisica": (this.dataConceptForm['EsTerapiaFisica']) ? this.dataConceptForm['EsTerapiaFisica'] : false,
      "esOtrosTratamientos": (this.dataConceptForm['EsOtrosTratamientos']) ? this.dataConceptForm['EsOtrosTratamientos'] : false,
      "descripcionOtrosTratamientos": (this.dataConceptForm['DescripcionOtrosTratamientos']) ? this.dataConceptForm['DescripcionOtrosTratamientos'] : '',
      "plazoCorto": (this.patientGoodShortTerm) ? 1 : (this.patientRegularShortTerm) ? 2 : (this.patientBadShortTerm) ? 3 : 0,
      "plazoMediano": (this.patientGoodMediumTerm) ? 1 : (this.patientRegularMediumTerm) ? 2 : (this.patientBadMediumTerm) ? 3 : 0,
      "concepto": 0,
      "remisionAdministradoraFondoPension": '',
      "progreso": this.percentajeConcept,
      "idAfp": (this.dataConceptForm['iIDAfp']) ? this.dataConceptForm['iIDAfp'] :  this.patientData['IDafp'],
      "tAsunto": (this.dataConceptForm['tAsunto']) ? this.dataConceptForm['tAsunto'] : '',
      "tDireccionPaciente": (this.patientData['direccion']) ? this.patientData['direccion'] : '',
      "tTelefonoPaciente": (this.patientData['telefono']) ? this.patientData['telefono'] : '',
      "iIDCiudad": (this.patientData['iIDCiudad']) ? this.patientData['iIDCiudad'] : 1,
      "tEmailPaciente": (this.patientData['email']) ? this.patientData['email'] : '',
    };
    if (this.selectMedicalConcept) {
      dataObjectSend['concepto'] = (this.selectMedicalConcept == 1) ? 1 : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? 2 : (this.selectMedicalConcept == 2 && !this.unfavTypeWithIncapacity) ? 3 : 0;
      dataObjectSend['remisionAdministradoraFondoPension'] = (this.selectMedicalConcept == 1) ? this.collectionMedicalConcept[0]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeWithIncapacity) ? this.collectionMedicalConcept[1]['texto'] : (this.selectMedicalConcept == 2 && this.unfavTypeNoIncapacity) ? this.collectionMedicalConcept[2]['texto'] : '';
    } 
    // /api/K2ConceptoRehabilitacion/ActualizarConcepto // fnHttpSetUpdateConcept(guid_user, data_object)
    this.fnSetEmmitConceptCase(this.token, dataObjectSend).then((response) => {
      if (response) {
        this.utilitiesService.showToast('top-right', 'success', 'Concepto se ha emitido satisfactoriamente!');
        this.submitted = false;
        this.textLoading = '';
        setTimeout(() => {
          this.fnReturnListCases();
        }, 2000);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.submitted = false;
        this.textLoading = '';
      }
    }).catch((err) => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      this.submitted = false;
      this.textLoading = '';
    });
  }

  fnSetUpdateConceptCase(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetUpdateConcept(token, dataUpdate).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSetEmmitConceptCase(token, dataEmmit) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetEmmitConceptCase(token, dataEmmit).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnChangeShortTermsValid(event) {
    switch (event) {
      case 1:
        if (!this.patientGoodShortTerm && !this.patientRegularShortTerm && !this.patientBadShortTerm) {
          this.patientGoodShortTerm = false;
          this.patientRegularShortTerm = false;
          this.patientBadShortTerm = false;
        } else {
          this.patientGoodShortTerm = true;
          this.patientRegularShortTerm = false;
          this.patientBadShortTerm = false;
        }
        break;
      case 2:
        if (!this.patientGoodShortTerm && !this.patientRegularShortTerm && !this.patientBadShortTerm) {
          this.patientGoodShortTerm = false;
          this.patientRegularShortTerm = false;
          this.patientBadShortTerm = false;
        } else {
          this.patientGoodShortTerm = false;
          this.patientRegularShortTerm = true;
          this.patientBadShortTerm = false;
        }
        break;
      case 3:
        if (!this.patientGoodShortTerm && !this.patientRegularShortTerm && !this.patientBadShortTerm) {
          this.patientGoodShortTerm = false;
          this.patientRegularShortTerm = false;
          this.patientBadShortTerm = false;
        } else {
          this.patientGoodShortTerm = false;
          this.patientRegularShortTerm = false;
          this.patientBadShortTerm = true;
        }

        break;
    }
    
  }

  fnChangeMediumTermsValid(event) {
    switch (event) {
      case 1:
        if (!this.patientGoodMediumTerm && !this.patientRegularMediumTerm && !this.patientBadMediumTerm) {
          this.patientGoodMediumTerm = false;
          this.patientRegularMediumTerm = false;
          this.patientBadMediumTerm = false;
        } else {
          this.patientGoodMediumTerm = true;
          this.patientRegularMediumTerm = false;
          this.patientBadMediumTerm = false;
        }
        break;
      case 2:
        if (!this.patientGoodMediumTerm && !this.patientRegularMediumTerm && !this.patientBadMediumTerm) {
          this.patientGoodMediumTerm = false;
          this.patientRegularMediumTerm = false;
          this.patientBadMediumTerm = false;
        } else {
          this.patientGoodMediumTerm = false;
          this.patientRegularMediumTerm = true;
          this.patientBadMediumTerm = false;
        }
        break;
      case 3:
        if (!this.patientGoodMediumTerm && !this.patientRegularMediumTerm && !this.patientBadMediumTerm) {
          this.patientGoodMediumTerm = false;
          this.patientRegularMediumTerm = false;
          this.patientBadMediumTerm = false;
        } else {
          this.patientGoodMediumTerm = false;
          this.patientRegularMediumTerm = false;
          this.patientBadMediumTerm = true;
        }

        break;
    }
    
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnReturnListCases(): void {
    this.router.navigate(['/pages/concepto-de-rehabilitacion/listado-casos']);
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

  fnGetDataSelectors(token) {
    return new Promise ((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpGetDataSelectors(token).subscribe(result => {
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

  fnGetCie10(token, typeCie10) {
    // this.errors = [];
    // this.submitted = true;
    return new Promise ((resolve, reject) => {
      this.utilitiesService.fnGetDataJson('mockdata_diagnostics_cie10.json').subscribe(result => {
      // this.incapacityService.fnHttpGetCie10(token, typeCie10).subscribe((result) => {
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

  fnRemoveDiagnostic(item, index, collectionPatientDiagnostics) {
    this.submitted = true;
    this.textLoading = 'Eliminando diagnostico concepto...';
    this.fnRemovePatientDiagnostic(item, index, collectionPatientDiagnostics).then(resp => {
      if (resp) {
        this.utilitiesService.showToast('top-right', 'success', 'Diagnostico concepto eliminado satisfactoriamente!');
        // this.fnUpdateConcept();
        this.fnUpdateConceptSilence().then((resp) => {
          if (resp) {
            this.fnGetPercentaje();
            this.fnClickStep(1);
            this.submitted = false;
            this.textLoading = '';
            this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
          } else {
            this.submitted = false;
            this.textLoading = '';
          }
        });
      }
    });
  }
  
  fnRemoveSequel(item, index, collectionPatientSequels) {
    this.submitted = true;
    this.textLoading = 'Eliminando secuela concepto...';
    this.fnRemovePatientSequel(item, index, collectionPatientSequels).then(resp => {
      if (resp) {
        this.utilitiesService.showToast('top-right', 'success', 'Secuela concepto eliminada satisfactoriamente!');
        // this.fnUpdateConcept();
        this.fnUpdateConceptSilence().then((resp) => {
          if (resp) {
            this.fnGetPercentaje();
            this.fnClickStep(2);
            this.submitted = false;
            this.textLoading = '';
            this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
          } else {
            this.submitted = false;
            this.textLoading = '';
          }
        });
      }
    });
  }

  fnRemovePatientDiagnostic(item, index, collectionPatientSigns) {
    return new Promise((resolve, reject) => {
      let collection = [];
      collectionPatientSigns.forEach((element, key) => {
        if (element.idDiagnosticoConcepto == item.idDiagnosticoConcepto) {
          collection.push(element);
          let idCie10 = item.idDiagnosticoConcepto;
          this.fnDeleteDiagnostic(this.token, idCie10).then((response) => {

            if (response['status'] == 200) {
              collection = collectionPatientSigns.filter((resp) => { return resp.idDiagnosticoConcepto !== item.idDiagnosticoConcepto });
              this.listDiagnosticsPatient = collection;
              resolve(true);
            } else {
              reject(false);
            }
          });
        }
      });
    });

    // this.listDiagnosticsPatient = collection;
    // this.fnDeleteDiagnostic(this.token, element.)
  }

  fnRemovePatientSequel(item, index, collectionPatientSequels) {
    return new Promise((resolve, reject) => {
      let collection = [];
      collectionPatientSequels.forEach((element, key) => {
        if (element.id == item.id) {
          collection.push(element);
          let idSequel = item.id;
          this.fnDeleteSequel(this.token, idSequel).then((response) => {

            if (response['status'] == 200) {
              collection = collectionPatientSequels.filter((resp) => { return resp.id !== item.id });
              this.listSequelsPatient = collection;
              resolve(true);
            } else {
              reject(false);
            }
          });
        }
      });
    });
  }

  fnDeleteDiagnostic(token, idCie10) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpDeletePatientDiagnostic(token, idCie10).subscribe(response => {
          resolve(response);
      }, err => {
          reject(err);
      });
    });
  }

  fnDeleteSequel(token, idSequel) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpDeletePatientSequel(token, idSequel).subscribe(response => {
          resolve(response);
      }, err => {
          reject(err);
      });
    });
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

  fnSetPatientCityCondition(item_depto) {
    // this.patientData['diagnostic']['patientCityCondition'] = [];
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

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    // dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    // this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
    // });
  }

  fnAddNewEmployerPatient(collectionDataEmployers) {
    let dataSend = {};
    // dataSend['data'] = { module: '', title: 'Agregar empleador', description: 'En el siguiente formulario puedes agregar un nuevo empleador asociado al paciente.', collection: collectionDataEmployers };
    // this.dialogService.open(AgregarEmpleadorComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
    // });
  }

  fnBuildAddress($event) {
    let addressPlaceBuilded = 
      ((this.patientAddressWayType) ? this.patientAddressWayType.name : '') +' '+ 
      ((this.patientAddressFirstNumber) ? this.patientAddressFirstNumber : '') +' '+
      ((this.patientAddressFirstLetter) ? this.patientAddressFirstLetter.name : '') +' '+
      ((this.patientAddressSufixBis) ? this.patientAddressSufixBis.name : '')  +' '+
      ((this.patientAddressSecondLetter) ? this.patientAddressSecondLetter.name : '')  +' '+
      ((this.patientAddressFirstCardinalSufix) ? this.patientAddressFirstCardinalSufix.name : '')  +' '+
      ((this.patientAddressSecondNumber) ? this.patientAddressSecondNumber : '') +' '+
      ((this.patientAddressThirdLetter) ? this.patientAddressThirdLetter.name : '')  +' '+
      ((this.patientAddressThirdNumber) ? this.patientAddressThirdNumber : '') +' '+
      ((this.patientAddressSecondCardinalSufix) ? this.patientAddressSecondCardinalSufix.name : '')  +' '+
      ((this.patientAddressPlaceCondition) ? this.patientAddressPlaceCondition : '' );
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

  fnShowModalAddAddress() {
    let dataSend = {};
    dataSend['data'] = this.patientData;
    dataSend['typeAddress'] = 1;
    this.dialogService.open(BuildAddressComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
      if (res) {
        this.patientData['dataAddress'] = res;
        this.patientData['direccion'] = ((res['address'] + ', ' + res['aditionalDataAddress'] + ' - ' + res['userCity']['name'] + ', ' + res['userDepartament']['departamento'] + ', ' + res['userCountry']['name']).toUpperCase()).trim();
      }
    });
  }

  fnShowDiagnostics(flagShowDiagnostics) {
    $(".content-form-add-diagnostics").slideToggle(resp => {
      this.flagShowDiagnostics = !this.flagShowDiagnostics;

    });
  }

  fnShowSequels(flagShowSequels) {
    $(".content-form-add-sequels").slideToggle(resp => {
      this.flagShowSequels = !this.flagShowSequels;

    });
  }

  fnShowContent(nameClass) {
    $('.' + nameClass).slideToggle();
  }

  fnClickStep(step_num){
    
    let child = (step_num == 1) ? 1 : (step_num == 2) ? 3 : (step_num == 3) ? 5 : (step_num == 4) ? 7 : null;
    
    switch (step_num) {
      case 1:
        if (this.listDiagnosticsPatient.length < 1) {
          // $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").css("border", "2px solid #ff6780");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").addClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").addClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").addClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconClose = '<i class="icon nb-close"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconClose);
          // }, 0);
        
        } else {
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").removeClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").removeClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").removeClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconCheck = '<i class="icon nb-checkmark" style="color: #fff;"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconCheck);
          // }, 0);
        }
        break;
      case 2:
        if (this.listSequelsPatient.length < 1 || this.dataConceptForm['ResumenHistoriaClinica'] == '' || this.dataConceptForm['ResumenHistoriaClinica'] == null) {
          // $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").css("border", "2px solid #ff6780");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").addClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").addClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").addClass("bckgrnd-color-red");
           // $("#stepper-crhb > .header > div:nth-child(2)").addClass("step-border-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconClose = '<i class="icon nb-close"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconClose);
          // }, 0);
        
        } else {
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").removeClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").removeClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").removeClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconCheck = '<i class="icon nb-checkmark" style="color: #fff;"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconCheck);
          // }, 0);
        }
        break;
      case 3:
        if (
            this.dataConceptForm['FinalidadTratamientos'] == '' || 
            this.dataConceptForm['FinalidadTratamientos'] == null || 
            this.dataConceptForm['FinalidadTratamientos'] == 0 || 
            (
              !this.dataConceptForm['EsFarmacologico'] && 
              !this.dataConceptForm['EsTerapiaOcupacional'] && 
              !this.dataConceptForm['EsFonoaudiologia'] && 
              !this.dataConceptForm['EsQuirurgico'] && 
              !this.dataConceptForm['EsTerapiaFisica'] && 
              !this.dataConceptForm['EsOtrosTratamientos'] 
            ) || 
            (
              !this.dataConceptForm['EsFarmacologico'] && 
              !this.dataConceptForm['EsTerapiaOcupacional'] && 
              !this.dataConceptForm['EsFonoaudiologia'] && 
              !this.dataConceptForm['EsQuirurgico'] && 
              !this.dataConceptForm['EsTerapiaFisica'] && 
              this.dataConceptForm['EsOtrosTratamientos'] && 
              (this.dataConceptForm['DescripcionOtrosTratamientos'] == '' || this.dataConceptForm['DescripcionOtrosTratamientos'] == null)
            )
          ) {
          // $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").css("border", "2px solid #ff6780");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").addClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").addClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").addClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconClose = '<i class="icon nb-close"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconClose);
          // }, 0);
        
        } else {
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").removeClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").removeClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").removeClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconCheck = '<i class="icon nb-checkmark" style="color: #fff;"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconCheck);
          // }, 0);
        }
        break;
      case 4:
        if (
            (this.patientGoodShortTerm == false && 
            this.patientRegularShortTerm == false && 
            this.patientBadShortTerm == false) ||   
            (this.patientGoodMediumTerm == false && 
            this.patientRegularMediumTerm == false && 
            this.patientBadMediumTerm == false) ||  
            (this.selectMedicalConcept == null || this.selectMedicalConcept == '')
          ) {
          // $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").css("border", "2px solid #ff6780");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").addClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").addClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").addClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconClose = '<i class="icon nb-close"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconClose);
          // }, 0);
        
        } else {
          $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").removeClass("step-border-red");
          $("#stepper-crhb > .header > div:nth-child("+ child +") > div").removeClass("step-color-red");
          $("#stepper-crhb > .header > div:nth-child("+ (child + 1) +")").removeClass("bckgrnd-color-red");
          // setTimeout(() => {
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").removeClass("nb-ckeckmark");
          //   // $("#stepper-crhb > .header > .completed > .label-index > .icon").addClass("nb-close");
          //   let iconCheck = '<i class="icon nb-checkmark" style="color: #fff;"></i>';
          //   $("#stepper-crhb > .header > .completed > .label-index").text("").append(iconCheck);
          // }, 0);
        }
        break;
    }
    // if (child) {
    //   // $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").css("border", "2px solid #ff6780");
    //   $("#stepper-crhb > .header > div:nth-child("+ child +") > .label-index").addClass("step-border-red");
    //   $("#stepper-crhb > .header > div:nth-child("+ child +") > div").addClass("step-color-red").click((resp) => {
    //     alert("Alert!");
    //   });
    // } 
  }

  fnGetDataConceptSilence(token: string, id_caso: number, idPaciente: number): void {
    // this.submitted = true;
    this.fnGetDataConcept(token, id_caso).then((response6) => {
      if (response6) {
        // this.collectionMedicalConcept = response6['body'];
        this.dataConcept = response6['body'];
        this.dataConceptForm = response6['body']['Concepto'][0];
        this.listDiagnosticsPatient = [];
        this.dataConcept['DiagnosticosConcepto'].forEach((value, key) => {
          this.listDiagnosticsPatient.push({
            'idDiagnosticoConcepto': value['id'],
            'aplicaLateralidad': null,
            'iDiasMaxAcumulados': null,
            'iDiasMaxConsulta': null,
            'iIdcie10': value['Cie10Id'],
            'iIdtipoCie': null,
            'tCie10': value['tCIE10'],
            'tDescripcion': value['tDescripcion'],
            'tFullDescripcion': `${ value['tCIE10'] } ${ value['tDescripcion'] }`,
            'fechaIncapacidad': value['FechaIncapacidad'],
            'etiologia': value['Etiologia'],
            'nombreEtiologia': value['nombreEtiologia'],
          });
        });
        this.listSequelsPatient = [];
        this.dataConcept['SecuelasConcepto'].forEach((value, key) => {
          this.listSequelsPatient.push({
            'id': value['Id'],
            'idTypeSequel': value['Tipo'],
            'nameTypeSequel': value['nombreSecuela'],
            'idMedicalPrognosis': value['Pronostico'],
            'nameMedicalPrognosis': value['nombrePronostico'],
            'sequelDescription': value['Descripcion'],
            'dateSequel': null,
          });
        });
        this.checkPharmacological = this.dataConceptForm['farmacologico'];
        this.checkOccupationalTherapy = this.dataConceptForm['terapiaOcupacional'];
        this.checkSpeechTherapy = this.dataConceptForm['fonoAudiologia'];
        this.checkSurgical = this.dataConceptForm['quirurgico'];
        this.checkPhysicalTherapy = this.dataConceptForm['terapiaFisica'];
        this.checkOtherTherapy = this.dataConceptForm['otrosTramites'];

        this.patientInputOtherTreatments = this.dataConceptForm['otrosTratamientos'];

        this.patientGoodShortTerm = (this.dataConceptForm['PlazoCorto'] == 1) ? true : false;
        this.patientRegularShortTerm = (this.dataConceptForm['PlazoCorto'] == 2) ? true : false;
        this.patientBadShortTerm = (this.dataConceptForm['PlazoCorto'] == 3) ? true : false;

        this.patientGoodMediumTerm = (this.dataConceptForm['PlazoMediano'] == 1) ? true : false;
        this.patientRegularMediumTerm = (this.dataConceptForm['PlazoMediano'] == 2) ? true : false;
        this.patientBadMediumTerm = (this.dataConceptForm['PlazoMediano'] == 3) ? true : false;



        // let dataType = ((this.dataConceptForm['Concepto'] < 3) ? (this.dataCollectionConcepts.filter((el) => { return el.pronosticoConceptoId == this.dataConceptForm['Concepto'] }))[0] : (this.dataCollectionConcepts.filter((el) => { return el.pronosticoConceptoId == 2 }))[0]) || 0;
        let dataType = (this.dataConceptForm['Concepto'] == 1) ? 1 : (this.dataConceptForm['Concepto'] == 2 || this.dataConceptForm['Concepto'] == 3) ? 2 : 0;
        // this.selectMedicalConcept = (dataType < 3) ? dataType : dataType;
        this.selectMedicalConcept = dataType;
        this.unfavTypeWithIncapacity = (this.dataConceptForm['Concepto'] == 2) ? true : false;
        this.unfavTypeNoIncapacity = (this.dataConceptForm['Concepto'] == 3) ? true : false;
        // this.submitted = false;
      } else {
        // this.submitted = false;
        this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
      }
    });
  }

  fnValidInput(step: number): void {
    this.fnUpdateConceptSilence().then((resp) => {
      if (resp) {
        this.fnGetPercentaje(); 
        this.fnClickStep(step); 
        this.fnGetDataConceptSilence(this.token, this.idCaso, this.idPaciente);
      } else {
        this.submitted = false;
        this.textLoading = '';
      }
    });
    
  }

}
