import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-certificado-emitido',
  templateUrl: './certificado-emitido.component.html',
  styleUrls: ['./certificado-emitido.component.scss']
})
export class CertificadoEmitidoComponent implements OnInit {

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
  public dataConceptCRHB: any = {};
  public idUser: any;

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private rehabilitationConceptService: RehabilitationConceptService,
    private authService: NbAuthService,
  ) { }

  ngOnInit() {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.dataSession = token.getPayload();
        this.token = token["token"];
        let data = this.utilitiesService.fnGetDataShare();

        this.route.params.subscribe(params => {
          this.dataCertificate = {};
          
          if (params['idUser']) {
            this.idUser = params['idUser'];
            
            this.dataCertificate['qrcode'] = "http://localhost:4200/#/auth/login";
            
            this.fnGetDataPatientById(this.token, this.idUser).then((resp) => {
              if (!resp) {
                
              } else {
                try {
                  if (resp['status'] == 200) {
                    this.dataConceptCRHB = resp['body'] || {};
                  }
                } catch (error) {
                  this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
                }
              }
            }).catch((err) => {
            });
            // this.token = params.token;
            // const token = sessionStorage.getItem("token");
            // this.token = token;
            // this.fnGetDataDiagnosticByDNI(this.token, this.diagnosticCodeDNI)
            // let data = this.utilitiesService.fnGetDataShare();
            // this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
            
            // if (data && this.dataDoctor) {
            //   const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
            //   const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
            //   const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
            //   const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
            //   this.dataDoctor['especiality'] = dataDoctorEspeciality;
            //   this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
            //   this.dataDoctor['signature'] = dataDoctorSignature;
            //   this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));
    
            //   this.patientData = data['patientData'];
            // } else {
            //   this.patientData = null;
            //   this.patientIncapacities = null;
            //   this.totalItems = null;
            //   this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
            // }
          } else {
            
            this.utilitiesService.fnSignOutUser().then(resp => {
              this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            }).catch((error) => {
              this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
            })
          }
        });

      }
    });

  }

  fnGetDataPatientById(token, user_id) {
    return new Promise((resolve, reject) => {
      this.rehabilitationConceptService.fnHttpGetDataPatientById(token, user_id).subscribe(response => {
        resolve(response);
      }, (err) => {
        reject(err);
      });
    });
  }






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

}
