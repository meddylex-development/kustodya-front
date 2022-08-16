import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import * as moment from 'moment';
import { UserService } from '../../../shared/api/services/user.service';
@Component({
  selector: 'ngx-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnInit {

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
              console.log('this.qrcodeConcept: ', this.qrcodeConcept);
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
                console.log('response: ', response);
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


          this.dataCertificate = {};
          
          // if (params['idUser']) {
          //   this.idUser = params['idUser'];
            
          //   this.dataCertificate['qrcode'] = "http://localhost:4200/#/auth/login";
            
          //   this.fnGetGetDataConcept(this.token, this.idUser).then((resp) => {
          //     if (!resp) {
                
          //     } else {
          //       try {
          //         if (resp['status'] == 200) {
          //           this.dataConceptCRHB = resp['body'] || {};
          //           // 'fechaEmision':  moment(new Date()).valueOf(),
          //           this.dataConceptCRHB['fechaEmision'] = moment(new Date()).valueOf();
          //           this.dataConceptCRHB['paciente'] = data['paciente'];
          //         }
          //       } catch (error) {
          //         this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
          //       }
          //     }
          //   }).catch((err) => {
          //   });
          //   // this.token = params.token;
          //   // const token = sessionStorage.getItem("token");
          //   // this.token = token;
          //   // this.fnGetDataDiagnosticByDNI(this.token, this.diagnosticCodeDNI)
          //   // let data = this.utilitiesService.fnGetDataShare();
          //   // this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
            
          //   // if (data && this.dataDoctor) {
          //   //   const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
          //   //   const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
          //   //   const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
          //   //   const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
          //   //   this.dataDoctor['especiality'] = dataDoctorEspeciality;
          //   //   this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
          //   //   this.dataDoctor['signature'] = dataDoctorSignature;
          //   //   this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));
    
          //   //   this.patientData = data['patientData'];
          //   // } else {
          //   //   this.patientData = null;
          //   //   this.patientIncapacities = null;
          //   //   this.totalItems = null;
          //   //   this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
          //   // }
          // } else {
            
            // this.utilitiesService.fnSignOutUser().then(resp => {
            //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            // }).catch((error) => {
            //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            // })
          // }
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

  fnZoomDocument(type_document) {
    if (type_document == 1) {
      this.zoomCartaConcepto = (this.zoomCartaConcepto) ? false : true;
    } else {
      this.zoomConceptoRehabilitacion = (this.zoomConceptoRehabilitacion) ? false : true;
    }
  }

}
