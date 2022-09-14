import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import * as moment from 'moment';
import { UserService } from '../../../shared/api/services/user.service';
import { BuildAddressComponent } from '../../../common/build-address/build-address.component';
import { NbDialogService } from '@nebular/theme';
import { parse } from 'querystring';

@Component({
  selector: 'ngx-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit {

  public patientData: any = null;
  public patientIncapacities: any = null;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;
  public token: any;
  public listCantidadDiagnoticosIncapacidad: any;

  public chart1: any = {
    title: 'Días de incapacidad por diagnostico CIE10',
    type: 'PieChart',
    data: [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7] 
    ],
    columnNames: ['Browser', 'Percentage'],
    options: {
      pieHole:0.4,
    },
    width: 550,
    height: 400,
  };

  public chart2: any = {
    title: 'Incapacidades emitidas por diagnostico CIE10',
    type: 'PieChart',
    data: [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7] 
    ],
    columnNames: ['Browser', 'Percentage'],
    options: {
      pieHole:0.4,
    },
    width: 550,
    height: 400,
  };
  public diagnosticCodeDNI: any;
  public dataCertificate: any;
  public dataDoctor: any;
  public listLateralities: any = [];
  public digitalSignDoctorCert1: boolean = true;
  public digitalSignDoctorCert2: boolean = true;
  public dataSession: any = {};
  public dataConceptCRHB: any = {
    'fechaEmision':  moment(new Date()).valueOf(),
  };
  public idUser: any;

  public zoomCartaConcepto: boolean = false;
  public zoomConceptoRehabilitacion: boolean = false;
  
  public submitted: boolean = false;
  public textLoading: string = '';
  public idPaciente: any = null;
  public idCaso: any = null;
  public dataConcept: any = {};
  public dataConceptForm: any = {
    'ResumenHistoriaClinica': '',
    'FinalidadTratamientos': '',
  };
  public listDiagnosticsPatient: any = [];
  public listSequelsPatient: any = [];
  public patientFullName: string = '';
  public dataEmployers: any;
  public dataMettrics: any;
  public idUserEmmiteConcept: any;
  public objectDataUser: any = null;
  public objectDataUserOriginal: any = null;
  public userFullName: string;
  public qrcodeConcept: string;


  public inputEmailPatient: boolean = false;
  public inputPhonePatient: boolean = false;
  public inputAddressPatient: boolean = false;
  
  public collectionAfp: any = [];
  public patientAfp: any = null;
  public collectionDataSelectors: any = null;
  public letterDataConcept: any = {
    // 'emailPatient': null,
  };
  public bNotificacionbyEmailAFP: boolean = false;
  public bNotificacionbyPmailAFP: boolean = false;
  public bNotificacionbyEmailPaciente: boolean = false;
  public bNotificacionbyPmailPaciente: boolean = false;

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private rehabilitationConceptService: RehabilitationConceptService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private authService: NbAuthService,
    private userService: UserService, 
    private dialogService: NbDialogService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.submitted = true;
    this.textLoading = 'Obteniendo información del concepto de rehabilitación...';
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.dataSession = token.getPayload();
        this.token = token["token"];

        this.route.params.subscribe(params => {
          this.idPaciente = params['idPaciente'];
          this.idCaso = params['idCaso'];
          let dataObject = {
            "idPaciente": this.idPaciente,
          };

          this.fnGetDataConcept(this.token, params['idCaso']).then((response6) => {
            if (response6) {
              // this.collectionMedicalConcept = response6['body'];
              this.dataConcept = response6['body'];
              this.dataConceptForm = response6['body']['Concepto'][0];
              // this.qrcodeConcept = this.utilitiesService.fnGetSite() + '/#/tes/certificado-concepto-de-rehabilitacion/123123123123';
              this.dataConceptForm['urlQRCode'] = "http://localhost:4200/#/auth/login";
              this.idUserEmmiteConcept = this.dataConceptForm['UsuarioCreacionId'];
    
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

              this.fnGetDataUser(this.token, dataObject).then((response) => {
                if (response) {
                  this.submitted = false;
                  this.textLoading = '';
                  this.patientData = response['body']['informacionPacientes'][0];
                  this.patientFullName = (`${this.patientData['primerNombre']} ${this.patientData['segundoNombre']} ${this.patientData['primerApellido']} ${this.patientData['segundoApellido']}`).trim();
                  this.dataEmployers = response['body']['empleador'];
                  this.dataMettrics = response['body']['datosTotales'];

                  // this.dataConceptForm['tEmailPaciente]
                  this.letterDataConcept['idConcepto'] = (this.dataConceptForm['iIDConcepto'] != '' && this.dataConceptForm['iIDConcepto'] != null) ? this.dataConceptForm['iIDConcepto'] : 0;
                  this.letterDataConcept['emailPatient'] = (this.dataConceptForm['tEmailPaciente'] != '' && this.dataConceptForm['tEmailPaciente'] != null) ? this.dataConceptForm['tEmailPaciente'] : this.patientData['email'];
                  this.letterDataConcept['phonePatient'] = (this.dataConceptForm['tTelefonoPaciente'] != '' && this.dataConceptForm['tTelefonoPaciente'] != null) ? this.dataConceptForm['tTelefonoPaciente'] : this.patientData['telefono'];
                  this.letterDataConcept['addressPatient'] = (this.dataConceptForm['tDireccionPaciente'] != '' && this.dataConceptForm['tDireccionPaciente'] != null) ? this.dataConceptForm['tDireccionPaciente'] : this.patientData['direccion'];
                  this.letterDataConcept['afpPatient'] = (this.dataConceptForm['iIDAfp'] != '' && this.dataConceptForm['iIDAfp'] != null) ? this.dataConceptForm['iIDAfp'] : this.patientData['IDafp'];
                  this.letterDataConcept['nombreAFPPatient'] = (this.dataConceptForm['nombreAFP'] != '' && this.dataConceptForm['nombreAFP'] != null) ? this.dataConceptForm['nombreAFP'] : 'No registra dato';
                  this.letterDataConcept['subjectLetterPatient'] = (this.dataConceptForm['tAsunto'] != '' && this.dataConceptForm['tAsunto'] != null) ? this.dataConceptForm['tAsunto'] : '';
                  this.letterDataConcept['idCity'] = (this.dataConceptForm['iIDCiudad'] != '' && this.dataConceptForm['iIDCiudad'] != null) ? this.dataConceptForm['iIDCiudad'] : 0;
                  this.letterDataConcept['bNotificacionbyEmailAFP'] = (this.dataConceptForm['bNotificacionbyEmailAFP'] != '' && this.dataConceptForm['bNotificacionbyEmailAFP'] != null) ? this.dataConceptForm['bNotificacionbyEmailAFP'] : false;
                  this.letterDataConcept['bNotificacionbyPmailAFP'] = (this.dataConceptForm['bNotificacionbyPmailAFP'] != '' && this.dataConceptForm['bNotificacionbyPmailAFP'] != null) ? this.dataConceptForm['bNotificacionbyPmailAFP'] : false;
                  this.letterDataConcept['bNotificacionbyEmailPaciente'] = (this.dataConceptForm['bNotificacionbyEmailPaciente'] != '' && this.dataConceptForm['bNotificacionbyEmailPaciente'] != null) ? this.dataConceptForm['bNotificacionbyEmailPaciente'] : false;
                  this.letterDataConcept['bNotificacionbyPmailPaciente'] = (this.dataConceptForm['bNotificacionbyPmailPaciente'] != '' && this.dataConceptForm['bNotificacionbyPmailPaciente'] != null) ? this.dataConceptForm['bNotificacionbyPmailPaciente'] : false;
                  this.letterDataConcept['iCodigoPostal'] = (this.dataConceptForm['iCodigoPostal'] != '' && this.dataConceptForm['iCodigoPostal'] != null) ? this.dataConceptForm['iCodigoPostal'] : 0;
                } else {
                  this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
                  // this.dismiss(false);
                  this.submitted = false;
                }
              }).catch((err) => {
                this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
              });

              let dataObjectEmmiter = {
                "idUsuario": this.idUserEmmiteConcept
              };
              this.fnGetDataSpecialist(this.token, dataObjectEmmiter).then((response) => {
                if (response) {
                  this.objectDataUser = response['body']['informacionUsuarios'][0];
                  this.userFullName = (`${this.objectDataUser['primerNombre']} ${this.objectDataUser['segundoNombre']} ${this.objectDataUser['primerApellido']} ${this.objectDataUser['segunsoApellido']}`).trim(); // Porque sera disque segunso jaja
                  // this.objectDataUserOriginal = response['body']['informacionUsuarios'][0];
                } else {
                  this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
                  // this.dismiss(false);
                }
              }).catch((err) => {
                this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
              });


            } else {
              this.submitted = false;
              this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            }
          });

          this.fnGetDataSelectors(this.token).then(response1 => {
            if (response1) {
              this.collectionDataSelectors = response1;
              this.collectionAfp = response1['AFP'];
              this.letterDataConcept['afpPatient'] = this.dataConceptForm['iIDAfp'];
            } else {
              this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            } 
          });


          this.dataCertificate = {};
        });

      }
    });

  }

  fnGetDataSpecialist(token, data_object) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataSpecialist(token, data_object).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
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

  // fnGetGetDataConcept(token, user_id) {
  //   return new Promise((resolve, reject) => {
  //     this.conceptoRehabilitacionService.fnHttpGetDataConcept(token, user_id).subscribe(response => {
  //       resolve(response);
  //     }, (err) => {
  //       reject(err);
  //     });
  //   });
  // }
  
  fnGetLateralities(token) {
    let collectionLateralidad = [];
    return new Promise((resolve, reject) => {
      this.incapacityService.fnHttpGetListLateralities(token).subscribe(response => {
        collectionLateralidad = response['body'];
        resolve(collectionLateralidad);
      }, (error) => {
        resolve(collectionLateralidad);
      })
    });
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
  }

  fnGetDataDiagnosticByDNI(token, diagnosticCodeDNI) {
    this.incapacityService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(token, diagnosticCodeDNI).subscribe(response => {
      this.dataCertificate = response['body'];
      this.dataCertificate['qrcode'] = this.utilitiesService.fnGetSite() + '/#/incapacidad/certificado-incapacidad/' +  response['body']['uiCodigoDiagnostico'];

      this.fnGetLateralities(this.token).then(response => {
        this.listLateralities = response;
        let nameLaterality = this.listLateralities.filter(d => d.iIDLateralidad == this.dataCertificate['iIDLateralidad']);
        this.dataCertificate['nameLaterality'] = nameLaterality[0];
        // this.nameLaterality = nameLaterality[0];
      }).catch(error => {
      });

    }, err => {
      // this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado el diagnotico!');
    });
  }

  fnGetCantidadDiagnoticosIncapacidadByPaciente(token) {
    // this.submitted = true;
    /// this.listCantidadDiagnoticosIncapacidad = [];
    let listCantidadDiagnoticosIncapacidad = [];
    let idPaciente = this.patientData['iIdpaciente'];
    // let self = this;
    this.incapacityService.fnHttpGetCantidadDiagnoticosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
      if (r.status == 200) {
        this.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
        let dataChart1 = [];
        let dataChart2 = [];
        this.listCantidadDiagnoticosIncapacidad.forEach(i => {
          let itemDiasIncapacidad = [i.tCie10, i.iDiasIncapacidad];
          // let char1_dataChart_gc.push(itemDiasIncapacidad);
          dataChart1.push(itemDiasIncapacidad);
          let itemIncapacidadesEmitidas = [i.tCie10, i.iIncapacidadesEmitidas];
          dataChart2.push(itemIncapacidadesEmitidas);
          // this.char2_dataChart_gc.push(itemIncapacidadesEmitidas);
        });
        this.chart1.data = dataChart1;
        this.chart2.data = dataChart2;

      } else {
        
      }
      // if (r.status == 200) {
      //   this.submitted = false;
      //   this.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
      //   self.listCantidadDiagnoticosIncapacidad.forEach(i => {
      //     let itemDiasIncapacidad = [i.tCie10, i.iDiasIncapacidad];
      //     self.char1_dataChart_gc.push(itemDiasIncapacidad);
      //     let itemIncapacidadesEmitidas = [i.tCie10, i.iIncapacidadesEmitidas];
      //     self.char2_dataChart_gc.push(itemIncapacidadesEmitidas);
      //   });
      // }
      // else if (r.status == 206) {
      //   this.submitted = false;
      //   const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
      //   this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      // }
    }, err => {
      // this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnShowModalAddAddress() {
    let dataSend = {};
    dataSend['data'] = this.letterDataConcept;
    dataSend['typeAddress'] = 1;
    this.dialogService.open(BuildAddressComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
      if (res) {
        this.letterDataConcept['dataAddress'] = res;
        this.letterDataConcept['addressPatient'] = ((res['address'] + ', ' + res['aditionalDataAddress'] + ' - ' + res['cityInfo']['NOMBREMUNICIPIO'] + ', ' + res['deptoInfo']['NOMBREDEPTO'] + ', ' + res['countryInfo']['NOMBREPAIS']).toUpperCase()).trim();
        // this.letterDataConcept['idCity'] = parseInt(res['cityInfo']['IDMUNICIPIO']);
        this.letterDataConcept['idCity'] = parseInt(res['poblationInfo']['IDDIVIPOLA']);
        this.letterDataConcept['postalCode'] = parseInt(res['postalCode']);
      }
    });
  }

  fnShowPreviewLetterCRHB() {
    this.fnUpdateLetterCRHB();
    this.router.navigate(['/pages/concepto-de-rehabilitacion/certificado-emitido/', this.idCaso, this.dataConceptForm['PacienteId']], { skipLocationChange: false });
  }

  fnUpdateLetterCRHB() {
    this.submitted = true;
    this.textLoading = 'Guardando información de la carta concepto...';
     // {
    //   "idConcepto": 0,
    //   "tAsunto": "string",
    //   "tDireccionPaciente": "string",
    //   "iCodigoPostal": 0,
    //   "tTelefonoPaciente": "string",
    //   "iIDCiudad": 0,
    //   "tEmailPaciente": "string",
    //   "bNotificacionbyEmailAFP": true,
    //   "bNotificacionbyPmailAFP": true,
    //   "bNotificacionbyEmailPaciente": true,
    //   "bNotificacionbyPmailPaciente": true
    // }
    let dataObjectSend = {
      "idConcepto": this.dataConceptForm['iIDConcepto'],
      "tAsunto": (this.letterDataConcept['subjectLetterPatient'] != '' && this.letterDataConcept['subjectLetterPatient'] != null) ? this.letterDataConcept['subjectLetterPatient'] : '',
      "tDireccionPaciente": (this.letterDataConcept['addressPatient'] != '' && this.letterDataConcept['addressPatient'] != null) ? this.letterDataConcept['addressPatient'] : '',
      "iCodigoPostal": (this.letterDataConcept['postalCode'] != '' && this.letterDataConcept['postalCode'] != null) ? this.letterDataConcept['postalCode'] : 0,
      "tTelefonoPaciente": (this.letterDataConcept['phonePatient'] != '' && this.letterDataConcept['phonePatient'] != null) ? this.letterDataConcept['phonePatient'] : '',
      "iIDCiudad": (this.letterDataConcept['idCity'] != '' && this.letterDataConcept['idCity'] != null) ? this.letterDataConcept['idCity'] : 0,
      "tEmailPaciente": (this.letterDataConcept['emailPatient'] != '' && this.letterDataConcept['emailPatient'] != null) ? this.letterDataConcept['emailPatient'] : '',
      "bNotificacionbyEmailAFP": (this.letterDataConcept['bNotificacionbyEmailAFP'] != '' && this.letterDataConcept['bNotificacionbyEmailAFP'] != null) ? this.letterDataConcept['bNotificacionbyEmailAFP'] : false,
      "bNotificacionbyPmailAFP": (this.letterDataConcept['bNotificacionbyPmailAFP'] != '' && this.letterDataConcept['bNotificacionbyPmailAFP'] != null) ? this.letterDataConcept['bNotificacionbyPmailAFP'] : false,
      "bNotificacionbyEmailPaciente": (this.letterDataConcept['bNotificacionbyEmailPaciente'] != '' && this.letterDataConcept['bNotificacionbyEmailPaciente'] != null) ? this.letterDataConcept['bNotificacionbyEmailPaciente'] : false,
      "bNotificacionbyPmailPaciente": (this.letterDataConcept['bNotificacionbyPmailPaciente'] != '' && this.letterDataConcept['bNotificacionbyPmailPaciente'] != null) ? this.letterDataConcept['bNotificacionbyPmailPaciente'] : false,
      // "idAfp": (this.letterDataConcept['afpPatient'] != '' && this.letterDataConcept['afpPatient'] != null) ? this.letterDataConcept['afpPatient'] : 0,
      // "iCodigoPostal": (this.letterDataConcept['iCodigoPostal'] != '' && this.letterDataConcept['iCodigoPostal'] != null) ? this.letterDataConcept['iCodigoPostal'] : '',
      // "iIDCiudad": 808,
      // "fechaNotificacion": (new Date()).toString(),
      // "fechaNotificacion": "2022-01-01",
      // "medioNotificacion": 0
    };
    console.log('dataObjectSend: ', dataObjectSend);
    // debugger;
    // this.letterDataConcept
    // this.dataConceptForm['tEmailPaciente']
    this.fnSetUpdateLetterConceptCase(this.token, dataObjectSend).then((response) => {
      if (response) {
        this.utilitiesService.showToast('top-right', 'success', 'La carta concepto ha sido guardada satisfactoriamente!');
        this.submitted = false;
        this.textLoading = '';
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

  fnSetUpdateLetterConceptCase(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetUpdateLetterConcept(token, dataUpdate).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
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

  fnSelecPatientAfp($event: Event): void {
  }

  fnShowConfigSendMail(): void {

  }

  // fnEmmitLetterCRHB() {

  // }

}
