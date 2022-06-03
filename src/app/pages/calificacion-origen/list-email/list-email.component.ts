/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';
import { EnumerationsService } from '../../../shared/api/services/enumerations.service';
import { BusquedaAvanzadaComponent } from '../busqueda-avanzada/busqueda-avanzada.component';
// import { EstadoIncapacidadComponent } from '../estado-incapacidad/estado-incapacidad.component';
import * as moment from 'moment';

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
  public currentSearch: boolean = false;
  public dataSearchAdvance: any = {};

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
        console.log('this.dataSession: ', this.dataSession);
        console.log('this.token: ', this.token);
        this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, '', '', '', false);
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
      }
    });
  }

  fnGetOriginQualificationListStates(current_payload) {
    // const self = this;
    // this.enumerationsService.fnHttpGetOriginQualificationListStates(current_payload).subscribe(resp_get_patients => {
    //   if (resp_get_patients.status == 200) {
    //     this.collection_data = JSON.parse(JSON.stringify(resp_get_patients.body));
    //   }
    // }, err => {
    // });
  }

  fnGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      this.originQualificationService.fnHttpGetOriginQualificationList(current_payload, current_page, search_input, status_list, start_date, end_date).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })
  }

  getPage(page: number) {
    this.currentPage = page;
    this.searchInput = (this.dataSearchAdvance['textSearch']) ? this.dataSearchAdvance['textSearch'] : '';
    let state = (this.dataSearchAdvance['state']) ? this.dataSearchAdvance['state'] : '';
    let dateStartValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
    let dateEndValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
    this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, this.currentSearch);
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
  }

  fnTextSearch(text_search) {
    this.currentSearch = false;
    if (text_search.length > 3 || text_search.length < 1) {
      let state = (this.dataSearchAdvance['state']) ? this.dataSearchAdvance['state'] : '';
      let dateStartValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
      let dateEndValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
      this.fnBuildDataOriginQualification(this.token, this.currentPage, text_search, state, dateStartValueof, dateEndValueof, true);
    } else {
      // text_search = '';
      // self.search_input = '';
      // self.fnGetOriginQualificationList(self.current_payload, self.currentPage, text_search, self.status_list);
    }
  }

  fnClearCurrentSearch() {
    this.currentSearch = false;
    this.searchInput = '';
    this.dataSearchAdvance = {
      state: 1,
      statusInfo: { name: 'Por gestionar', value: 1 },
    };
    this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, '', '', '', false);
  }

  fnShowAdvanceSearch() {
      let dataSend = {};
      dataSend['data'] = { 
        module: 'calificacion-origen', 
        title: 'Busqueda avanzada', 
        description: 'En el siguiente formulario puedes filtrar los correos electrónicos por otros criterio como rango de fechas ó estado de auditoria.', 
        textSearchInput: (this.dataSearchAdvance['textSearch']) ? this.dataSearchAdvance['textSearch'] : this.searchInput, 
        statusAudit: (this.dataSearchAdvance['state']) ? this.dataSearchAdvance['state'] : null,
        dateRange: (this.dataSearchAdvance['daterange']) ? this.dataSearchAdvance['daterange'] : '',
        statusInfo: (this.dataSearchAdvance['statusInfo']) ? this.dataSearchAdvance['statusInfo'] : {},
      };
      console.log('dataSend: ', dataSend);
      this.dialogService.open(BusquedaAvanzadaComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
        console.log('res: ', res);
        if (res) {
          this.dataSearchAdvance = res;
          this.searchInput = (res['textSearch']) ? res['textSearch'] : '';
          let state = (res['state']) ? res['state'] : '';
          let dateStartValueof = (res['daterange']) ? moment(res['daterange'][0]).valueOf() : '';
          let dateEndValueof = (res['daterange']) ? moment(res['daterange'][1]).valueOf() : '';
          // let dateStartUnix = moment(res['daterange'][0]).unix();
          // let dateEndUnix = moment(res['daterange'][1]).unix();
          this.fnBuildDataOriginQualification(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, true);
        }
      });
  }

  fnBuildDataOriginQualification(token, currentPage, searchInput, state, startDate, endDate, stateSearch) {
    this.submitted = true;
    this.fnGetOriginQualificationList(token, currentPage, searchInput, state, startDate, endDate).then((resp) => {
      if(resp) {
        this.currentSearch = stateSearch;
        console.log('resp: ', resp);
        this.listEmails = JSON.parse(JSON.stringify(resp['body']['correoOutputModel']));
        console.log('this.listEmails: ', this.listEmails);
        this.listEmailsOriginal = JSON.parse(JSON.stringify(resp['body']['correoOutputModel']));
        this.totalItems = resp['body']['paginacion']['totalItems'];
        this.numItemsPage = resp['body']['paginacion']['itemsPorPagina'];
        this.currentPage = resp['body']['paginacion']['paginaActual'];
        this.prevPage = resp['body']['paginacion']['anterior'];
        this.nextNext = resp['body']['paginacion']['siguiente'];
        this.totalPaginas = resp['body']['paginacion']['totalPaginas'];
        this.submitted = false;
      } else {
        this.submitted = false;
        this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error! Intentelo de nuevo', 'nb-alert');
      }
    });
  }

  fnRemoveSearchFilter(typeFilterSearch) {

    let searchInput;
    let state;
    let dateStart = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
    let dateEnd = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
    let stateSearch;

      

    switch (typeFilterSearch) {
      // 1 - Busqueda de texto
      case 1:
        searchInput = this.dataSearchAdvance['textSearch'] = this.searchInput = '';
        state = this.dataSearchAdvance['state'];
        // dateStart = this.dataSearchAdvance['daterange'][0];
        // dateEnd = this.dataSearchAdvance['daterange'][1];
        break;
      // 2 - Busqueda por estado
      case 2:
        searchInput = this.searchInput;
        this.dataSearchAdvance['statusInfo'] = {};
        state = this.dataSearchAdvance['state'] = 1;
        // dateStart = this.dataSearchAdvance['daterange'][0];
        // dateEnd = this.dataSearchAdvance['daterange'][1];
        break;
      // 3 - Busqueda por rango de fechas
      case 3:
        searchInput = this.searchInput;
        state = this.dataSearchAdvance['state'];
        this.dataSearchAdvance['daterange'] = '';
        dateStart = '';
        dateEnd = '';
        break;
    }

    if ((this.searchInput == '' || this.searchInput == null) && 
      (this.dataSearchAdvance['state'] == '' || this.dataSearchAdvance['state'] == null) && 
      (this.dataSearchAdvance['daterange'] == '' || this.dataSearchAdvance['daterange'] == null)) {
      stateSearch = false;
      this.currentPage = 1;
    } else {
      stateSearch = true;
    }

    console.log('searchInput: ', searchInput);
    console.log('state: ', state);
    console.log('dateStart: ', dateStart);
    console.log('dateEnd: ', dateEnd);
    console.log('stateSearch: ', stateSearch);
    console.log('this.dataSearchAdvance["statusInfo"]: ', this.dataSearchAdvance['statusInfo']);
    
    this.fnBuildDataOriginQualification(this.token, this.currentPage, searchInput, state, dateStart, dateEnd, stateSearch);
  }

  fnSelectState(dataState) {
    console.log('dataState: ', dataState);

    let searchInput = this.searchInput;
    let state;
    let dateStart = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
    let dateEnd = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
    let stateSearch = this.currentSearch;
    // this.dataSearchAdvance = {};
    switch (dataState['tabTitle']) {
      case 'Por gestionar':
        state = 1;
        this.dataSearchAdvance['statusInfo'] = { name: 'Por gestionar', value: 1 };      
        break;
      case 'Sin transcribir':
        state = 2;
        this.dataSearchAdvance['statusInfo'] = { name: 'Sin transcribir', value: 2 };
        break;
      case 'Transcrito':
        state = 3;
        this.dataSearchAdvance['statusInfo'] = { name: 'Transcrito', value: 3 };
        break;
    }
    this.dataSearchAdvance['state'] = state;

    this.fnBuildDataOriginQualification(this.token, this.currentPage, searchInput, state, dateStart, dateEnd, stateSearch);
  }

  fnViewDetailMail(item) {
    let emailId = item['id'];
    this.utilitiesService.fnSetDataShare({ 
      // patientData: this.patientData, 
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
      dataAdvanceSearch: this.dataSearchAdvance,
      emailData: item,
    }, true);
    this.utilitiesService.fnNavigateByUrl('pages/calificacion-origen/transcripcion/'+ emailId);
  }

}
