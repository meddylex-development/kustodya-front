import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

@Component({
  selector: 'ngx-historico-paciente',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './historico-paciente.component.html',
  styleUrls: ['./historico-paciente.component.scss']
})
export class HistoricoPacienteComponent implements OnInit {

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

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
  ) { }

  ngOnInit() {
    const token = sessionStorage.getItem('payload');
    this.token = token;
    let data = this.utilitiesService.fnGetDataShare();
    if (data) {
      this.patientData = data['patientData'];
      console.log('this.patientData: ', this.patientData);
      this.patientIncapacities = data['patientIncapacities'];
      this.totalItems = data['patientIncapacities'].length;
      this.fnGetCantidadDiagnoticosIncapacidadByPaciente(this.token);
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
    console.log('this.flipped: ', this.flipped);
    this.flipped = (this.flipped) ? false : true;
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
      //   self.submitted = false;
      //   self.listCantidadDiagnoticosIncapacidad = JSON.parse(JSON.stringify(r.body.slice(0, 10)));
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

  fnViewDagnosticCertificate(item) {
    let diagnosticCodeDNI = item['uiCodigoDiagnostico'];
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/certificado/'+ diagnosticCodeDNI);
  }

}
