import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UserService } from '../../../shared/api/services/user.service';
import { RethusService } from '../../../shared/api/services/rethus.service';


import { AyudaComponent } from '../ayuda/ayuda.component';
import { AgregarEmpleadorComponent } from '../agregar-empleador/agregar-empleador.component';
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
defineLocale('es', esLocale);

@Component({
  selector: 'ngx-generar-incapacidad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generar-incapacidad.component.html',
  styleUrls: ['./generar-incapacidad.component.scss']
})
export class GenerarIncapacidadComponent implements OnInit {

  public patientData: any = null;
  public patientIncapacities: any = null;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;
  public token: any;
  public submitted: boolean = false;
  public listCantidadDiagnoticosIncapacidad: any;
  public collectionAttentionTypes: any = [];
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
  public collectionDataEmployers: any = [
    { 'nit': '900365863', 
      'tRazonSocial': 'ProyectaTSP S.A.S.', 
      'tDigitoVerificacion': '0',
      'tDireccion': 'Calle 106 # 54 - 73 Oficina 201',
      'tObjetoSocial': null,
      'tipoDocumento': {
        'iIdTipoIdentificacion': 10,
        'tTipoIdentificacion': "Nit Empresarial",
      },
      'actividadEconomica': {
        'ciiu': "K7220",
        'iId': 603,
        'tNombreActividad': "Consultores en programas de informática, elaboración y suministro de programas de informática",
      },
      'ciiu': 'K7220 - Consultores en programas de informática, elaboración y suministro de programas de informática', 
      'ocupacionPaciente': '2511 - INGENIERO DE SISTEMAS ANÁLISIS Y DISEÑO', 
      'fechaIngreso': '22 Oct 2016', 
      'estadoContrato': true, 
      'ibc': 1200000, 
      // 'salario': 1200000, 
      // 'ibc': 640000, 
      'valorDiaIncapcidad': 45000 
    }, 
    // { 
    //   'nit': '900456789-0', 
    //   'tRazonSocial': 'Skynet S.A.S', 
    //   'tDigitoVerificacion': '0',
    //   'tDireccion': 'Calle 106 # 54 - 73 Oficina 201',
    //   'tObjetoSocial': null,
    //   'tipoDocumento': {
    //     'iIdTipoIdentificacion': 10,
    //     'tTipoIdentificacion': "Nit Empresarial",
    //   },
    //   'actividadEconomica': {
    //     'ciiu': "K7220",
    //     'iId': 603,
    //     'tNombreActividad': "Consultores en programas de informática, elaboración y suministro de programas de informática",
    //   },
    //   'ciiu': 'K7220 - Consultores en programas de informática, elaboración y suministro de programas de informática', 
    //   'ocupacionPaciente': '2511 - INGENIERO DE SISTEMAS ANÁLISIS Y DISEÑO', 
    //   'fechaIngreso': '14 Sep 2017', 
    //   'estadoContrato': true, 
    //   'salario': 2300000, 
    //   'ibc': 978500, 
    //   'valorDiaIncapcidad': 82417 
    // }, 
    // { 
    //   'nit': '930651876-3', 
    //   'tRazonSocial': 'Compumundohypermegared S.A.S', 
    //   'tDigitoVerificacion': '3',
    //   'tDireccion': 'Calle 106 # 54 - 73 Oficina 201',
    //   'tObjetoSocial': null,
    //   'tipoDocumento': {
    //     'iIdTipoIdentificacion': 10,
    //     'tTipoIdentificacion': "Nit Empresarial",
    //   },
    //   'actividadEconomica': {
    //     'ciiu': "K7220",
    //     'iId': 603,
    //     'tNombreActividad': "Consultores en programas de informática, elaboración y suministro de programas de informática",
    //   },
    //   'ciiu': 'K7220 - Consultores en programas de informática, elaboración y suministro de programas de informática', 
    //   'ocupacionPaciente': '2511 - INGENIERO DE SISTEMAS ANÁLISIS Y DISEÑO', 
    //   'fechaIngreso': '25 May 2019', 
    //   'estadoContrato': true, 
    //   'salario': 2000000, 
    //   'ibc': 908400, 
    //   'valorDiaIncapcidad': 72640 
    // },
  ];
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
  ) {
  }
  
  ngOnInit() {
    const token = sessionStorage.getItem('payload');
    this.token = token;
    this.bsLocaleService.use('es');
    let data = this.utilitiesService.fnGetDataShare();
    this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    const user_id = sessionStorage.getItem('user_id');
    this.dataIPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('ips'));
    if (data) {
      this.patientData = data['patientData'];
      this.dataUserSpecialist = data['dataUserSpecialist'];
      // this.dataUserSpecialist = responseRethusDetail['body'];
      if(this.dataUserSpecialist) {
        let tipoPorgrama = this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
        if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
          this.flagShowAlertUser = true;
        } else {
          this.flagShowAlertUser = false;
        }
      } else {
        this.flagShowAlertUser = true;
        this.dataUserSpecialist = null
      }

      if (!this.patientData['diagnostic']) {
        this.patientData['diagnostic'] = {
          'soatInsurance': false,
          'timeStartPatientCondition': { 'hour': 12, 'minute': 0 },
          'laterality': null,
          'patientDaysGranted': 1,
          'patientConditionKeywords': null,
          'addressPlace': {
            // 'patientAddressFirstNumber': '',
            // 'patientAddressFirstLetter': '',
            // 'patientAddressSufixBis': '',
            // 'patientAddressSecondLetter': '',
            // 'patientAddressFirstCardinalSufix': '',
            // 'patientAddressSecondNumber': '',
            // 'patientAddressThirdLetter': '',
            // 'patientAddressThirdNumber': '',
            // 'patientAddressSecondCardinalSufix': '',
            // 'patientAddressPlaceCondition': '',
          },
        };
      } else {
        this.applyLaterality = (this.patientData['diagnostic']['laterality']) ? true : false;
        let objectDiagnosticPatient = this.patientData['diagnostic']['patientDiagnostics'];
        this.fnGetCorrelationDiagnostic(objectDiagnosticPatient);
        this.loadingData = true;
      }

      // this.fnGetDataUserById(this.token, user_id).then((response) => {
      //   if (response) {
      //     let numeroIdentificacion = response['numeroIdentificacion'];
      //     this.fnGetDoctorRethusByDNI(this.token, 1, numeroIdentificacion).then((responseRethus) => {
      //       if (responseRethus) {

      //         this.fnGetDoctorRethusByDNI(this.token, 'CC', numeroIdentificacion).then((responseRethusDetail) => {
      //           if (responseRethusDetail) {
      //             this.dataUserSpecialist = responseRethusDetail['body'];
      //             let tipoPorgrama = this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
      //             if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
      //               this.flagShowAlertUser = true;
      //             } else {
      //               this.flagShowAlertUser = false;
      //             }
      //           } 
      //         });
      //       } else {

      //       }
      //     });

      //   } else {

      //   }
      // })
      this.fnGetContabilidad(this.token, "001");
      this.patientIncapacities = data['patientIncapacities'];
      this.totalItems = data['patientIncapacities'].length;
      this.fnGetIncapacityAttentionTypes(this.token);
      // this.fnGetIncapacityType(this.token);
      this.fnGetCie10(this.token, 3).then(response1 => {
        this.collectionPatientSigns = response1;
        return this.fnGetCie10(this.token, 2);
      }).then(response2 => {
        this.collectionPatientSymptoms = response2;
        return this.fnGetCie10(this.token, 1);
      }).then(response3 => {
        this.collectionPatientDiagnostics = response3;
      });

      this.utilitiesService.fnGetCountryDataAPI().subscribe(response => {
        const dataCountries = JSON.parse(JSON.stringify(response['body']));
        let dataContry = [];
        // dataCountries.forEach(element => {
        //   dataContry.push({ 'name': element['name']['common'], 'flag': element['flags'], 'allDataCountry': element })
        // });
        dataContry = [{ name: ' Colombia', flag: 'null', allDataCountry: {} }];
        this.collectionCountries = dataContry;
        this.patientData['diagnostic']['patientCountryCondition'] = this.collectionCountries[34];
      }, (error) => {
      });

      let urlApi = this.utilitiesService.fnReturnUrlApiMapDivPolColombia();
      this.utilitiesService.fnHttpGetDataJSONAPI(urlApi).then(response => {
        this.collectionDepartaments = JSON.parse(JSON.stringify(response));
      }, (error) => {
      });
      this.fnGetLateralities(this.token);
    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
    }
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

  fnShowContent(nameClass) {
    $('.' + nameClass).slideToggle();
  }

  fnGetIncapacityAttentionTypes(token) {
    // this.submitted = true;
    this.incapacityService.fnHttpGetListIncapacityAttentionTypes(token).subscribe(r => {
      this.collectionAttentionTypes = JSON.parse(JSON.stringify(r.body));
      // this.submitted = false;
    }, err => {
      this.utilitiesService.showToast('bottom-right', 'danger', err, 'nb-alert');
      // this.submitted = false;
    });
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
      this.incapacityService.fnHttpGetCie10(token, typeCie10).subscribe((result) => {
        // this.submitted = false;
        if (result.status == 200) {
          let collectionList = JSON.parse(JSON.stringify(result.body));
          // let new_item: any = { iIdcie10: -1, tFullDescripcion: '' };
          // this.list_Cie10.unshift(new_item);
          // this.collection_cie_10[type_cie10 - 1] = result.body;
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
    dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
    });
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
        "tLugar": (this.patientData['diagnostic']['patientCountryCondition']['name']) ? this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'] : '',
        "tLugarExpedicion": (this.patientData['diagnostic']['patientCountryCondition']['name']) ? this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'] : '',
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
        "bProrroga": (this.dataDiagnosticCorrelation['bProrroga']) ? this.dataDiagnosticCorrelation['bProrroga'] : false,
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

    this.collectionDataEmployers.forEach((element, key) => {
      let dataEmployer = element;
      this.fnGenerateNewIncapacityCertificate().then(response => {
        if (!response) {
          this.submitted = false;
          return false;
        } else {
          let dataIncapacityCreated = response;
          this.fnGenerateNewAccountingRegistry(dataIncapacityCreated, dataEmployer, this.dataAccountingBasicInfo, this.token, this.idContabilidad).then((responseAccounting) => {
            if (responseAccounting) {
              if(this.collectionDataEmployers.length == key + 1) {
                this.submitted = false;
                setTimeout(() => {            
                  this.utilitiesService.fnNavigateByUrl('pages/incapacidad/historico');
                }, 1000);
              }
            }
  
          });
        }
      });
    });
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
    dataSend['data'] = { module: '', title: 'Agregar empleador', description: 'En el siguiente formulario puedes agregar un nuevo empleador asociado al paciente.', collection: collectionDataEmployers };
    this.dialogService.open(AgregarEmpleadorComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
    });
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
        email: 'jjalmonacid@gmail.com, covalle@famisanar.com.co, haguirre@famisanar.com.co, erodriguezb@famisanar.com.co, framirez@famisanar.com.co, dangulo@famisanar.com.co, fcaicedo@famisanar.com.co, lceballos@famisanar.com.co, vbarrera@famisanar.com.co, joseeduardoquinones@gmail.com, meddylexs@gmail.com, gpinilladev@gmail.com, slopezb@famisanar.com.co, dcastros@famisanar.com.co',
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
      let prorroga = dataDiagnosticCorrelation['bProrroga'];
  
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
