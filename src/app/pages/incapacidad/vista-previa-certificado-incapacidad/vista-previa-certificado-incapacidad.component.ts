import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

import * as moment from 'moment';

@Component({
  selector: 'ngx-vista-previa-certificado-incapacidad',
  templateUrl: './vista-previa-certificado-incapacidad.component.html',
  styleUrls: ['./vista-previa-certificado-incapacidad.component.scss']
})
export class VistaPreviaCertificadoIncapacidadComponent implements OnInit {

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
  public dataCertificate: any = {
    'ips': null,
  }
  public dataDoctor: any;
  public listLateralities: any = [];

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // this.token = params.token;
    // console.log('this.token: ', this.token);
    const token = sessionStorage.getItem('payload');
    this.token = token;
    let data = this.utilitiesService.fnGetDataShare();
    console.log('data: ', data);
    let dataIPS = JSON.parse(this.utilitiesService.fnGetSessionStorage('ips'));
    console.log('dataIPS: ', dataIPS);
    this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
    
    if (data && this.dataDoctor && dataIPS) {
      console.log('this.dataDoctor: ', this.dataDoctor);
      const dataDoctorEspeciality = this.dataDoctor['usuario']['ocupacion']['tNombre'];
      console.log('dataDoctorEspeciality: ', dataDoctorEspeciality);
      const dataDoctorRegistroMedico = this.dataDoctor['usuario']['ocupacion']['numeroRegistroProfesional'];
      console.log('dataDoctorRegistroMedico: ', dataDoctorRegistroMedico);
      const signature_doctor = (this.dataDoctor['usuario']['documento']['imagen']) ? 'data:image/png;base64, ' + this.dataDoctor['usuario']['documento']['imagen'] : null;
      console.log('signature_doctor: ', signature_doctor);
      const dataDoctorSignature = (signature_doctor) ? this.sanitizer.bypassSecurityTrustResourceUrl(signature_doctor) : null;
      console.log('dataDoctorSignature: ', dataDoctorSignature);
      this.dataDoctor['especiality'] = dataDoctorEspeciality;
      this.dataDoctor['medicalRegister'] = dataDoctorRegistroMedico;
      this.dataDoctor['signature'] = dataDoctorSignature;
      this.dataDoctor['dataDoctor'] = JSON.parse(sessionStorage.getItem('user_data'));
      this.patientData = data['patientData'];
      this.patientData['diagnostic']['correlation'] = data['dataDiagnosticCorrelation'];
      console.log('this.patientData: ', this.patientData);
      this.fnSetDataPreview(dataIPS, this.patientData);
    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
    }
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

  fnSetLateralityForm(id_laterality) {
    this.fnGetLateralities(this.token).then(response => {
      console.log('response: ', response);
      this.listLateralities = response;
      console.log('listLateralities: ', this.listLateralities);
      let nameLaterality = this.listLateralities.filter(d => d.iIDLateralidad == id_laterality);
      console.log('nameLaterality: ', nameLaterality);
      this.dataCertificate['nameLaterality'] = nameLaterality[0];
      // this.nameLaterality = nameLaterality[0];
      // console.log('this.nameLaterality: ', this.nameLaterality);
    }).catch(error => {
      console.log('error: ', error);
    });
  }


  fnSetDataPreview(data_ips, patient_data) {
    console.log('patient_data: ', patient_data);
    console.log('data_ips: ', data_ips);

    const date_collection_unix = moment(new Date()).unix();
    console.log('date_collection_unix: ', date_collection_unix);
    const date_collection_valueof = moment(new Date()).valueOf();
    console.log('date_collection_valueof: ', date_collection_valueof);
    const date_incapcatity = moment(moment(new Date()).add(patient_data['diagnostic']['patientDaysGranted'], 'days')).valueOf();
    console.log('date_incapcatity: ', date_incapcatity);

    let dataCertificate = {
      "bProrroga": patient_data['diagnostic']['correlation']['bProrroga'],
      "bsoat": patient_data['soatInsurance'],
      "cie10": [patient_data['diagnostic']['patientDiagnostics']],
      "dtFechaCreacion": date_collection_valueof,
      "dtFechaFin": date_incapcatity,
      "esTranscripcion": false,
      "fechaEmisionIncapacidad": date_collection_valueof,
      "iDiasAcumuladosPorroga": patient_data['diagnostic']['correlation']['iDiasAcumuladosPorroga'],
      "iDiasIncapacidad": patient_data['diagnostic']['patientDaysGranted'],
      "iIddiagnosticoIncapacidad": null,
      "iIdips": data_ips['iIdips'],
      "iIdEps": patient_data['eps']['iIdeps'],
      "iIdpaciente": patient_data['iIdpaciente'],
      "iIdUsuarioCreador": this.dataDoctor['userId'],
      "lugarExpedicion": null,
      "numeroIncapacidadIPSTranscripcion": null,
      "origenCalificadoIncapacidad": null,
      "presuntoOrigenIncapacidad": patient_data['diagnostic']['incapacityType'],
      "tCodigoCorto": null,
      "tDescripcionSintomatologica": patient_data['diagnostic']['patientConditionMedicalDescription'],
      "tipoAtencion": patient_data['diagnostic']['attentionTypes'],
      "tipoEmision": {
          "iid": 0,
          "nombreEmision": null
      },
      "tLugar": null,
      "tLugarExpedicion": null,
      "tModo": null,
      "tTiempo": null,
      "uiCodigoDiagnostico": null,
      "iIDLateralidad": patient_data['diagnostic']['iIDLateralidad'],
      "eps": patient_data['eps'],
      "ips": data_ips,
    }


    this.dataCertificate = dataCertificate;
    console.log('this.dataCertificate: ', this.dataCertificate);

  }

}
