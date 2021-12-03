import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { AyudaComponent } from '../ayuda/ayuda.component';
import { resolve } from 'url';
import * as moment from 'moment';
declare var $: any;

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
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
    { 'nit': '900365863-0', 
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
      'salario': 1200000, 
      'ibc': 640000, 
      'valorDiaIncapcidad': 45000 
    }, { 
      'nit': '900456789-0', 
      'tRazonSocial': 'Skynet S.A.S', 
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
      'fechaIngreso': '14 Sep 2017', 
      'estadoContrato': true, 
      'salario': 2300000, 
      'ibc': 978500, 
      'valorDiaIncapcidad': 82417 
    }, { 
      'nit': '930651876-3', 
      'tRazonSocial': 'Compumundohypermegared S.A.S', 
      'tDigitoVerificacion': '3',
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
      'fechaIngreso': '25 May 2019', 
      'estadoContrato': true, 
      'salario': 2000000, 
      'ibc': 908400, 
      'valorDiaIncapcidad': 72640 
    },
  ];

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private bsLocaleService: BsLocaleService,
    private dialogService: NbDialogService,
  ) {
  }
  
  ngOnInit() {
    const token = sessionStorage.getItem('payload');
    this.token = token;
    this.bsLocaleService.use('es');
    let data = this.utilitiesService.fnGetDataShare();
    this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    this.dataIPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('ips'));
    console.log('this.dataIPS: ', this.dataIPS);
    if (data) {
      this.patientData = data['patientData'];
      if (!this.patientData['diagnostic']) {
        this.patientData['diagnostic'] = {
          'soatInsurance': false,
          'timeStartPatientCondition': { 'hour': 12, 'minute': 0 },
          'laterality': null,
          'patientDaysGranted': 1,
        };
      } else {
        this.applyLaterality = (this.patientData['diagnostic']['laterality']) ? true : false;
        let objectDiagnosticPatient = this.patientData['diagnostic']['patientDiagnostics'];
        this.fnGetCorrelationDiagnostic(objectDiagnosticPatient);
        this.loadingData = true;
      }
      this.patientIncapacities = data['patientIncapacities'];
      this.totalItems = data['patientIncapacities'].length;
      this.fnGetIncapacityAttentionTypes(this.token);
      this.fnGetIncapacityType(this.token);
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
        dataCountries.forEach(element => {
          dataContry.push({ 'name': element['name']['common'], 'flag': element['flags'], 'allDataCountry': element })
        });
        this.collectionCountries = dataContry;
        this.patientData['diagnostic']['patientCountryCondition'] = this.collectionCountries[34];
      }, (error) => {
      });

      let urlApi = this.utilitiesService.fnReturnUrlApiMapDivPolColombia();
      this.utilitiesService.fnHttpGetDataJSONAPI(urlApi).then(response => {
        console.log('response: ', response);
        this.collectionDepartaments = JSON.parse(JSON.stringify(response));
        console.log('this.collectionDepartaments: ', this.collectionDepartaments);
      }, (error) => {
        console.log('error: ', error);
      });
      this.fnGetLateralities(this.token);
      console.log('this.patientData: ', this.patientData);
    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/incapadades/home');
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
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/certificado/'+ diagnosticCodeDNI);
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
      console.log('response: ', response);
      this.collectionLateralities = response['body'];
      console.log('this.collectionLateralities: ', this.collectionLateralities);
    }, (error) => {
      console.log('error: ', error);
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
    console.log('item_depto: ', item_depto);
    this.patientData['diagnostic']['patientCityCondition'] = [];
    this.collectionCities = [];
    if (item_depto['ciudades'].length > 0) {
      let dataCollectionCities = [];
      item_depto['ciudades'].forEach(element => {
        console.log('element: ', element);
        dataCollectionCities.push({ 'name': element })
      });
      console.log('dataCollectionCities: ', dataCollectionCities);
      this.collectionCities = dataCollectionCities;
    }

  }

  fnGetCorrelationDiagnostic(item_cie_10) {
    this.loadingData = false;
    console.log('item_cie_10: ', item_cie_10);
    this.applyLaterality =  item_cie_10['aplicaLateralidad'] || false;
    console.log('this.applyLaterality: ', this.applyLaterality);
    this.dataDiagnosticCorrelation = null;
    let idCIE10 = item_cie_10['iIdcie10'];
    console.log('idCIE10: ', idCIE10);
    this.incapacityService.fnHttpGetCorrelationDiagnostic(this.token, idCIE10, this.patientData['iIdpaciente']).subscribe(r => {
      this.dataDiagnosticCorrelation = JSON.parse(JSON.stringify(r.body));
      console.log('this.dataDiagnosticCorrelation: ', this.dataDiagnosticCorrelation);
      this.loadingData = true;
    }, err => {
      this.loadingData = false;
    });
  }

  fnSetPatientDaysGranted(event) {
    console.log('event: ', event);
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
    });
  }

  fnShowPreviewIncapacityCertificate(itemEmployer, i) {
    this.patientData['employer'] = itemEmployer;
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.patientData, 
      patientIncapacities: this.patientIncapacities, 
      dataDiagnosticCorrelation: this.dataDiagnosticCorrelation,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/vista-previa-certificado');
  }

  fnGenerateNewIncapacityCertificate() {
    return new Promise((resolve, reject) => {
      console.log('this.patientData: ', this.patientData);
      this.submitted = true;
  
      const dateNowUnix = moment(new Date()).unix();
      console.log('dateNowUnix: ', dateNowUnix);
      const dateNowValueOf = moment(new Date()).valueOf();
      console.log('dateNowValueOf: ', dateNowValueOf);
      const date_incapcatity = moment(moment(new Date()).add(this.patientData['diagnostic']['patientDaysGranted'], 'days')).valueOf();
      console.log('date_incapcatity: ', date_incapcatity);
  
      
      // this.dataIPS = dataIPS;
  
      let object_data = null;
      // const fechaActual = new Date();
      // const data_ips = JSON.parse(sessionStorage.getItem('ips'));
      // const data_cie10 = (this.collection_diagnosis_complete['symptom'].concat(this.collection_diagnosis_complete['signs'])).concat(this.collection_diagnosis_complete['diagnosis']);
      // // this.lateralidad
      // console.log('this.lateralidad: ', this.lateralidad);
      object_data = {
        "bProrroga": this.dataDiagnosticCorrelation['bProrroga'],
        "bsoat": this.patientData['diagnostic']['soatInsurance'],
        "cie10": [this.patientData['diagnostic']['patientDiagnostics']],
        "dtFechaCreacion": new Date(),
        "dtFechaFin": new Date(),
        "esTranscripcion": false,
        "fechaEmisionIncapacidad": new Date(),
        "iDiasAcumuladosPorroga": this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga'],
        "iDiasIncapacidad": this.patientData['diagnostic']['patientDaysGranted'],
        "iIddiagnosticoIncapacidad": this.dataDiagnosticCorrelation['iIddiagnosticoCorrelacion'],
        "iIdips": this.dataIPS['iIdips'],
        "iIdEps": this.patientData['eps']['iIdeps'],
        "iIdpaciente": this.patientData['iIdpaciente'],
        "iIdUsuarioCreador": this.dataDoctor['userId'],
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
        "presuntoOrigenIncapacidad": this.patientData['diagnostic']['incapacityType'],
        "tCodigoCorto": null,
        "tDescripcionSintomatologica": this.patientData['diagnostic']['patientConditionMedicalDescription'],
        "tipoAtencion": this.patientData['diagnostic']['attentionTypes'],
        "tipoEmision": {
          "iid": 0,
          "nombreEmision": "string"
        },
        "tLugar": this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'],
        "tLugarExpedicion": this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'],
        "tModo": this.patientData['diagnostic']['patientModeDescription'],
        "tTiempo": this.patientData['diagnostic']['dateStartPatientCondition'] + ' - ' + this.patientData['diagnostic']['timeStartPatientCondition']['hour'] + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['minute']  + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['second'],
        "uiCodigoDiagnostico": null,
        "iIDLateralidad": this.patientData['diagnostic']['laterality']['iIDLateralidad'],
        "eps": this.patientData['eps'],
        "ips": this.dataIPS,
      };
  
      const object_data_test = {
        'iIddiagnosticoIncapacidad': 0,
        'uiCodigoDiagnostico': null,
        'tCodigoCorto': '',
        'iIdpaciente': this.patientData['iIdpaciente'],
        "iIdips": this.dataIPS['iIdips'],
        "cie10": [this.patientData['diagnostic']['patientDiagnostics']],
        "tTiempo": this.patientData['diagnostic']['dateStartPatientCondition'] + ' - ' + this.patientData['diagnostic']['timeStartPatientCondition']['hour'] + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['minute']  + ':' + this.patientData['diagnostic']['timeStartPatientCondition']['second'],
        "tModo": this.patientData['diagnostic']['patientModeDescription'],
        "tLugar": this.patientData['diagnostic']['patientCountryCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientDepartamentCondition']['departamento'] + ' - ' + this.patientData['diagnostic']['patientCityCondition']['name'] + ' - ' + this.patientData['diagnostic']['patientAddressCondition'] + ' - ' + this.patientData['diagnostic']['patientAddressPlaceCondition'],
        "presuntoOrigenIncapacidad": this.patientData['diagnostic']['incapacityType'],
        'origenCalificadoIncapacidad': null,
        "tipoAtencion": this.patientData['diagnostic']['attentionTypes'],
        "tDescripcionSintomatologica": this.patientData['diagnostic']['patientConditionMedicalDescription'],
        "iDiasIncapacidad": this.patientData['diagnostic']['patientDaysGranted'],
        "iDiasAcumuladosPorroga": this.dataDiagnosticCorrelation['iDiasAcumuladosPorroga'],
        "dtFechaCreacion": new Date(),
        "dtFechaFin": new Date(),
        "bProrroga": this.dataDiagnosticCorrelation['bProrroga'],
        "bsoat": this.patientData['diagnostic']['soatInsurance'],
        "iIDLateralidad": this.patientData['diagnostic']['laterality']['iIDLateralidad'],
      };
      console.log('object_data: ', object_data);
      console.log('object_data_test: ', object_data_test);
      // return false;
      // this.submitted = true;
      this.incapacityService.fnHttpPostDiagnosticosIncapacidad(this.token, object_data_test).subscribe(response => {
        console.log('response: ', response);
        if (response.status == 200) {
          // this.patientData['diagnostic'] = {
          //   'soatInsurance': false,
          //   'timeStartPatientCondition': { 'hour': 12, 'minute': 0 },
          //   'laterality': null,
          //   'patientDaysGranted': 1,
          // };
          // this.applyLaterality = false;
          resolve(response);
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

  fnGenerateIncapacity() {
    this.collectionDataEmployers.forEach((element, key) => {
      console.log('element: ', element);
      this.fnGenerateNewIncapacityCertificate().then(response => {
        console.log('response: ', response);
        if (!response) {
          return false;
        }

        if(this.collectionDataEmployers.length == this.collectionDataEmployers.length - 1) {
          this.utilitiesService.fnNavigateByUrl('pages/incapadades/historico');
        }
      })
    });
  }

}
