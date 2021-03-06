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
@Component({
  selector: 'ngx-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewAtelComponent implements OnInit {

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

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private rehabilitationConceptService: RehabilitationConceptService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private authService: NbAuthService,
  ) { }

  ngOnInit() {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.dataSession = token.getPayload();
        this.token = token["token"];
        console.log('this.token: ', this.token);
        // let data = this.utilitiesService.fnGetDataShare();
        let data = JSON.parse(this.utilitiesService.fnGetSessionStorage('data-concept'));
        console.log('data: ', data);

        this.route.params.subscribe(params => {
          console.log('params: ', params);
          this.dataCertificate = {};
          
          if (params['idUser']) {
            this.idUser = params['idUser'];
            console.log('this.idUser: ', this.idUser);
            
            this.dataCertificate['qrcode'] = "http://localhost:4200/#/auth/login";
            console.log('this.dataCertificate: ', this.dataCertificate);
            
            this.fnGetGetDataConcept(this.token, this.idUser).then((resp) => {
              console.log('resp: ', resp);
              if (!resp) {
                
              } else {
                try {
                  if (resp['status'] == 200) {
                    this.dataConceptCRHB = resp['body'] || {};
                    // 'fechaEmision':  moment(new Date()).valueOf(),
                    this.dataConceptCRHB['fechaEmision'] = moment(new Date()).valueOf();
                    this.dataConceptCRHB['paciente'] = data['paciente'];
                    console.log('this.dataConceptCRHB: ', this.dataConceptCRHB);
                  }
                } catch (error) {
                  this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
                }
              }
            }).catch((err) => {
              console.log('err: ', err);
            });
            // this.token = params.token;
            // console.log('this.token: ', this.token);
            // const token = sessionStorage.getItem("token");
            // this.token = token;
            // this.fnGetDataDiagnosticByDNI(this.token, this.diagnosticCodeDNI)
            // let data = this.utilitiesService.fnGetDataShare();
            // this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
            
            // if (data && this.dataDoctor) {
            //   console.log('this.dataDoctor: ', this.dataDoctor);
            //   const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
            //   console.log('dataDoctorEspeciality: ', dataDoctorEspeciality);
            //   const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
            //   console.log('dataDoctorRegistroMedico: ', dataDoctorRegistroMedico);
            //   const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
            //   console.log('signature_doctor: ', signature_doctor);
            //   const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
            //   console.log('dataDoctorSignature: ', dataDoctorSignature);
            //   this.dataDoctor['especiality'] = dataDoctorEspeciality;
            //   this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
            //   this.dataDoctor['signature'] = dataDoctorSignature;
            //   this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));
    
            //   this.patientData = data['patientData'];
            //   console.log('this.patientData: ', this.patientData);
            // } else {
            //   this.patientData = null;
            //   this.patientIncapacities = null;
            //   this.totalItems = null;
            //   this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
            // }
          } else {
            
            // this.utilitiesService.fnSignOutUser().then(resp => {
            //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            // }).catch((error) => {
            //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            // })
          }
        });

      }
    });

  }

  fnGetGetDataConcept(token, user_id) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpGetDataConcept(token, user_id).subscribe(response => {
        resolve(response);
      }, (err) => {
        console.log('err: ', err);
        reject(err);
      });
    });
  }






  fnGetLateralities(token) {
    let collectionLateralidad = [];
    return new Promise((resolve, reject) => {
      this.incapacityService.fnHttpGetListLateralities(token).subscribe(response => {
        console.log('response: ', response);
        collectionLateralidad = response['body'];
        console.log('collectionLateralidad: ', collectionLateralidad);
        resolve(collectionLateralidad);
      }, (error) => {
        console.log('error: ', error);
        resolve(collectionLateralidad);
      })
    });
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    console.log('this.flipped: ', this.flipped);
    this.flipped = (this.flipped) ? false : true;
  }

  fnGetDataDiagnosticByDNI(token, diagnosticCodeDNI) {
    this.incapacityService.fnHttpGetDiagnosicosIncapacidadByCodigoDiagnostico(token, diagnosticCodeDNI).subscribe(response => {
      console.log('response: ', response);
      this.dataCertificate = response['body'];
      this.dataCertificate['qrcode'] = this.utilitiesService.fnGetSite() + '/#/incapacidad/certificado-incapacidad/' +  response['body']['uiCodigoDiagnostico'];

      this.fnGetLateralities(this.token).then(response => {
        console.log('response: ', response);
        this.listLateralities = response;
        console.log('listLateralities: ', this.listLateralities);
        let nameLaterality = this.listLateralities.filter(d => d.iIDLateralidad == this.dataCertificate['iIDLateralidad']);
        console.log('nameLaterality: ', nameLaterality);
        this.dataCertificate['nameLaterality'] = nameLaterality[0];
        // this.nameLaterality = nameLaterality[0];
        // console.log('this.nameLaterality: ', this.nameLaterality);
      }).catch(error => {
        console.log('error: ', error);
      });

      console.log('this.dataCertificate: ', this.dataCertificate);
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
    console.log('idPaciente: ', idPaciente);
    // let self = this;
    this.incapacityService.fnHttpGetCantidadDiagnoticosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
      console.log('r: ', r);
      if (r.status == 200) {
        this.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
        console.log('this.listCantidadDiagnoticosIncapacidad: ', this.listCantidadDiagnoticosIncapacidad);
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
        console.log('dataChart1: ', dataChart1);
        console.log('dataChart2: ', dataChart2);
        this.chart1.data = dataChart1;
        this.chart2.data = dataChart2;

      } else {
        
      }
      // if (r.status == 200) {
      //   this.submitted = false;
      //   this.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
      //   console.log('self.listCantidadDiagnoticosIncapacidad: ', self.listCantidadDiagnoticosIncapacidad);
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
