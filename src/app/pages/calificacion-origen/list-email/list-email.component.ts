/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';
import { EnumerationsService } from '../../../shared/api/services/enumerations.service';
// import { EstadoIncapacidadComponent } from '../estado-incapacidad/estado-incapacidad.component';


@Component({
  selector: 'ngx-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.scss']
})
export class ListEmailComponent implements OnInit {

  public dataSession: any = {};
  public patientData: any = null;
  public patientIncapacities: any = [];
  
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
  public listEmails: any = [];
  public listEmailsOriginal: any = [];
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public numItemsPage: any = [];
  public prevPage: any = null;
  public nextNext: any = null;
  public totalPaginas: any = null;
  public searchInput: any = '';

  constructor(
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private originQualificationService: OriginQualificationService,
    private enumerationsService: EnumerationsService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      console.log('token: ', token);
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `dataSession` variable
        this.dataSession = token.getPayload();
        this.token = token["token"];
        // this.fnGetOriginQualificationList(this.token, 1, '', this.data_object['status_list'], this.data_object['start_date'], this.data_object['end_date']);
        console.log('this.dataSession: ', this.dataSession);
        console.log('this.token: ', this.token);
        // alert("Hola")
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
      }
    });
  }

  fnGetOriginQualificationListStates(current_payload) {
    // const self = this;
    // self.enumerationsService.fnHttpGetOriginQualificationListStates(current_payload).subscribe(resp_get_patients => {
    //   if (resp_get_patients.status == 200) {
    //     self.collection_data = JSON.parse(JSON.stringify(resp_get_patients.body));
    //   }
    // }, err => {
    // });
  }

  fnGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date) {
    this.submitted = true;
    this.originQualificationService.fnHttpGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date).subscribe(respList => {
      if (respList.status == 200) {
        this.listEmails = JSON.parse(JSON.stringify(respList.body['correoOutputModel']));
        this.listEmailsOriginal = JSON.parse(JSON.stringify(respList.body['correoOutputModel']));
        this.totalItems = respList.body['paginacion']['totalItems'];
        this.numItemsPage = respList.body['paginacion']['itemsPorPagina'];
        this.currentPage = respList.body['paginacion']['paginaActual'];
        this.prevPage = respList.body['paginacion']['anterior'];
        this.nextNext = respList.body['paginacion']['siguiente'];
        this.totalPaginas = respList.body['paginacion']['totalPaginas'];
        this.submitted = false;
      }
    }, err => {
      this.submitted = false;
    });
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
  }

}
