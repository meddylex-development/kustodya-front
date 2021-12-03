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
  public patientIncapacities: any = [];
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;
  public submitted: boolean = false;
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
    const self = this;
    const token = sessionStorage.getItem('payload');
    self.token = token;
    let data = self.utilitiesService.fnGetDataShare();
    if (data) {
      self.patientData = data['patientData'];
      console.log('self.patientData: ', self.patientData);
      /// self.patientIncapacities = data['patientIncapacities'];
      // self.totalItems = data['patientIncapacities'].length;
      self.fnGetCantidadDiagnoticosIncapacidadByPaciente(self.token);
      // self.submitted = true;
      // console.log('iIdpaciente: ', self.patientData['iIdpaciente']);
      self.fnGetDiagnosicosIncapacidadByPaciente(self.token, self.patientData['iIdpaciente']).then((response) => {
        console.log('response: ', response);
        if (response) {
          let patientIncapacities = JSON.parse(JSON.stringify(response['patientIncapacities']));
          console.log('patientIncapacities: ', patientIncapacities);
          self.patientIncapacities = patientIncapacities;
          console.log('self.patientIncapacities: ', self.patientIncapacities);
          self.totalItems = response['totalItems'];
          console.log('self.totalItems: ', self.totalItems);
          self.submitted = false;
          self.fnGetCantidadDiagnoticosIncapacidadByPaciente(self.token);
        } else {
          self.utilitiesService.fnNavigateByUrl('pages/incapadades/home');
          self.submitted = false;
        }
      }).catch((error) => {
      });
    } else {
      self.patientData = null;
      self.patientIncapacities = [];
      self.totalItems = null;
      self.utilitiesService.fnNavigateByUrl('pages/incapadades/home');
    }
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
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
        // this.submitted = false;
      } else {
        // this.submitted = false;
        this.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error', 'nb-alert');
        setTimeout(() => {
          this.fnReturnPage();
        }, 1000);
      }
    }, err => {
      // this.submitted = false;
      this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente(token, idPaciente) {
    return new Promise((resolve, reject) => {
      // this.submitted = true;
      // this.patientIncapacities = [];
      //const idPaciente = 2;
      this.incapacityService.fnHttpGetDiagnosicosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
        if (r.status == 200) {
          let patientIncapacities = JSON.parse(JSON.stringify(r.body));
  
          patientIncapacities.forEach((value, key) => {
            value.cie10.forEach((cievalue, ciekey) => {
              if (cievalue.iIdtipoCie === 1) {
                value['cie10_diagnotic'] = cievalue;
              }
            });
            this.patientIncapacities.push(value);
          });
          
          this.totalItems = this.patientIncapacities.length;
          // this.submitted = false;
          resolve({ 'patientIncapacities': this.patientIncapacities, 'totalItems': this.totalItems });
        } else if (r.status == 206) {
          resolve(false);
          // this.submitted = false;
          const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
          this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        reject('Error');
        // this.submitted = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultado el historial de incapacidades!');
      });
    });
  }

  fnViewDagnosticCertificate(item) {
    let diagnosticCodeDNI = item['uiCodigoDiagnostico'];
    this.utilitiesService.fnNavigateByUrl('pages/incapadades/certificado/'+ diagnosticCodeDNI);
  }

}
