import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

@Component({
  selector: 'ngx-certificado-incapacidad',
  templateUrl: './certificado-incapacidad.component.html',
  styleUrls: ['./certificado-incapacidad.component.scss']
})
export class CertificadoIncapacidadComponent implements OnInit {

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
  public dataEmlployerPatient: any = [];

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['diagnosticCodeDNI']) {
        this.diagnosticCodeDNI = params['diagnosticCodeDNI'];
        // this.token = params.token;
        const token = sessionStorage.getItem("token");
        this.token = token;
        this.fnGetDataDiagnosticByDNI(this.token, this.diagnosticCodeDNI)
        let data = this.utilitiesService.fnGetDataShare();
        this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
        
        if (data && this.dataDoctor) {
          const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
          const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
          const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
          const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
          this.dataDoctor['especiality'] = dataDoctorEspeciality;
          this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
          this.dataDoctor['signature'] = dataDoctorSignature;
          this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));

          this.patientData = data['patientData'];
          let documentTypePatient = this.patientData['tipoDocumento']['iIdTipoIdentificacion'];
          let documentNumberPatient = this.patientData['tNumeroDocumento'];
          this.fnGetDataEmployerPatient(this.token, documentTypePatient, documentNumberPatient).then((response) => {
            if (response) {
              let dataEmlployerPatient = response['body'];
              this.dataEmlployerPatient = (dataEmlployerPatient.length > 0) ? dataEmlployerPatient : [];  
            } else {
              this.dataEmlployerPatient =  [];
            }
          });
        } else {
          this.patientData = null;
          this.patientIncapacities = null;
          this.totalItems = null;
          this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
        }
      } else {
        this.utilitiesService.fnSignOutUser().then(resp => {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        }).catch((error) => {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        })
      }
    });
  }

  fnGetDataEmployerPatient(token, type_document, document_number) {
    return new Promise((resolve, reject) => {
      let objectData = {
        'NumeroDocumento': document_number,
        'TipoDoc': type_document,
      }
      this.incapacityService.fnHttpGetDataEmployerPatient(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    })
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
      // this.dataCertificate['qrcode'] = this.utilitiesService.fnGetSite() + '/#/incapacidad/certificado-incapacidad/' +  response['body']['uiCodigoDiagnostico'];
      
      //this.dataCertificate['qrcode'] = this.utilitiesService.fnGetSite() + '/#/auth/validar-incapacidad/' +  response['body']['uiCodigoDiagnostico'];
      // http://meddylex-001-site1.itempurl.com/#/auth/validar-incapacidad/511e490b-11a9-4370-a347-246e6e65fa53
      // http://meddylex-001-site2.itempurl.com/#/auth/validar-incapacidad/123

      const fechaInicioIncapacidad = moment(response['body']['dtFechaCreacion']).valueOf();
      const fechaFinIncapacidad = moment(response['body']['dtFechaFin']).valueOf();

      this.dataCertificate['qrcode'] = 'http://meddylex-001-site2.itempurl.com/#/auth/validar-incapacidad/' + response['body']['uiCodigoDiagnostico'] + '/' + fechaInicioIncapacidad + '/' + fechaFinIncapacidad + '/' + response['body']['iDiasIncapacidad'];

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
      //   self.submitted = false;
      //   self.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
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
