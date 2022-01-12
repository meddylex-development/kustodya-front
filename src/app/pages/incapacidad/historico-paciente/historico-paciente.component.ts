import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { EstadoIncapacidadComponent } from '../estado-incapacidad/estado-incapacidad.component';

@Component({
  selector: 'ngx-historico-paciente',
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
      // ['Firefox', 45.0],
      // ['IE', 26.8],
      // ['Chrome', 12.8],
      // ['Safari', 8.5],
      // ['Opera', 6.2],
      // ['Others', 0.7] 
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
      // ['Firefox', 45.0],
      // ['IE', 26.8],
      // ['Chrome', 12.8],
      // ['Safari', 8.5],
      // ['Opera', 6.2],
      // ['Others', 0.7] 
    ],
    columnNames: ['Browser', 'Percentage'],
    options: {
      pieHole:0.4,
    },
    width: 550,
    height: 400,
  };

  public statusListIncapacity: any = [
    { 'id': 1, 'name': 'Emitida' },
    { 'id': 2, 'name': 'Transcrita' },
    { 'id': 3, 'name': 'Liberada' },
    { 'id': 4, 'name': 'Cobrada' },
    { 'id': 5, 'name': 'Rechazada' },
    { 'id': 6, 'name': 'Aprobada' },
    { 'id': 7, 'name': 'Pagada' },
  ];

  constructor(
    private dialogService: NbDialogService,
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
  ) { }

  ngOnInit() {
    // const self = this;
    const token = sessionStorage.getItem('payload');
    this.token = token;
    let data = this.utilitiesService.fnGetDataShare();
    // console.log('data: ', data);
    if (data) {
      this.submitted = true;
      this.patientData = data['patientData'];
      console.log('this.patientData: ', this.patientData);
      /// this.patientIncapacities = data['patientIncapacities'];
      // this.totalItems = data['patientIncapacities'].length;
      // this.fnGetCantidadDiagnoticosIncapacidadByPaciente(this.token);
      // this.submitted = true;
      // console.log('iIdpaciente: ', this.patientData['iIdpaciente']);
      this.fnGetDiagnosicosIncapacidadByPaciente(this.token, this.patientData['iIdpaciente']).then((response) => {
        console.log('response: ', response);
        if (response) {
          let patientIncapacities = response['patientIncapacities'];
          console.log('patientIncapacities: ', patientIncapacities);
          this.patientIncapacities = patientIncapacities;
          console.log('this.patientIncapacities: ', this.patientIncapacities);
          this.totalItems = response['totalItems'];
          console.log('this.totalItems: ', this.totalItems);
          this.submitted = false;
          // this.fnGetCantidadDiagnoticosIncapacidadByPaciente(this.token);
        } else {
          this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
          this.submitted = false;
        }
      }).catch((error) => {
      });
    } else {
      this.patientData = null;
      this.patientIncapacities = [];
      this.totalItems = null;
      this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
    }
  }

  fnReturnPage(): void {
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
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
      this.incapacityService.fnHttpGetIncapacidadesPaciente(token, idPaciente).subscribe(r => {
        if (r.status == 200) {
          let patientIncapacities = JSON.parse(JSON.stringify(r.body));
          let collection = [];
          patientIncapacities.forEach((value, key) => {
            if(value['maxestado'] == null || value['maxestado'] == '') {
              value['maxestado'] = 1;
            }
            // collection.push(value);
          });
          
          let totalItems = patientIncapacities.length;
          // this.submitted = false;
          resolve({ 'patientIncapacities': patientIncapacities, 'totalItems': totalItems });
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
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/certificado/'+ diagnosticCodeDNI);
  }

  fnViewAccountingRegistry(item) {
    let diagnosticCodeDNI = item['uiCodigoDiagnostico'];
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/registro-contable/'+ diagnosticCodeDNI);
  }

  fnShowModalChangeStatusIncapacity(item) {
    console.log('item: ', item);
    let dataSend = {};
    dataSend['dataIncapacity'] = item;
    this.dialogService.open(EstadoIncapacidadComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      console.log('res: ', res);
      if (res) {
        this.fnGetDiagnosicosIncapacidadByPaciente(this.token, this.patientData['iIdpaciente']).then((response) => {
          console.log('response: ', response);
          if (response) {
            let patientIncapacities = response['patientIncapacities'];
            console.log('patientIncapacities: ', patientIncapacities);
            this.patientIncapacities = patientIncapacities;
            console.log('this.patientIncapacities: ', this.patientIncapacities);
            this.totalItems = response['totalItems'];
            console.log('this.totalItems: ', this.totalItems);
            this.submitted = false;
            // this.fnGetCantidadDiagnoticosIncapacidadByPaciente(this.token);
          } else {
            this.utilitiesService.fnNavigateByUrl('pages/incapacidad/home');
            this.submitted = false;
          }
        }).catch((error) => {
        });
      }
    });
  }

}
