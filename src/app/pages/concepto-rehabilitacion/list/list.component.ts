/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { OriginQualificationService } from '../../../shared/api/services/origin-qualification.service';
import { EnumerationsService } from '../../../shared/api/services/enumerations.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';

// import { BusquedaAvanzadaComponent } from '../busqueda-avanzada/busqueda-avanzada.component';
// import { EstadoIncapacidadComponent } from '../estado-incapacidad/estado-incapacidad.component';
import * as moment from 'moment';
import { AssignCaseComponent } from '../assign-case/assign-case.component';
import { ReAssignCaseComponent } from '../re-assign-case/re-assign-case.component';

@Component({
  selector: 'ngx-list-concept-crhb',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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
  public collectionPorAsignar: any = [];
  public collectionAsignados: any = [];
  public collectionEnProceso: any = [];
  public collectionGestionados: any = [];
  public collectionAnulados: any = [];
  public collectionNotificados: any = [];

  public dataListCollection: any = [];
  public dataListCollectionOriginal: any = [];

  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public numItemsPage: any = [];
  public prevPage: any = null;
  public nextNext: any = null;
  public totalPaginas: any = null;
  public clipBoardData: any = null;

  public paginationTabs: any = {
    'pagPorAsignar': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagAsignados': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagEnProceso': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagGestionados': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagAnulados': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagNotificados': {
      'totalItems': null,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
  }

  public checkBlockCases: boolean = false;
  public collectionCheckedCases: any = [];

  public searchInput: any = '';
  public currentSearch: boolean = false;
  public dataSearchAdvance: any = {};
  public dictamensCollection = [];

  constructor(
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private originQualificationService: OriginQualificationService,
    private enumerationsService: EnumerationsService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
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
        // this.fnBuildData(this.token, this.currentPage, this.searchInput, '', '', '', false);
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
        this.fnBuildData(this.token, this.currentPage, null, 2, null, null, null);
        this.fnBuildData(this.token, this.currentPage, null, 3, null, null, null);
        this.fnBuildData(this.token, this.currentPage, null, 4, null, null, null);
        this.fnBuildData(this.token, this.currentPage, null, 5, null, null, null);
      }
    });
  }

  fnGetDataList(current_payload, current_page, search_input, status_list, start_date, end_date) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      // this.utilitiesService.fnGetDataJson('response_casos_conceptos_CRHB.json').subscribe(respList => {
      this.conceptoRehabilitacionService.fnHttpGetListPatients(current_payload, current_page, search_input, status_list).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })
  }

  fnGetDataUserByID(token, id_user) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      this.incapacityService.fnHttpGetPacienteByID(token, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })
  }

  getPage(page: number, tab: number) {
    let state = 0;
    switch (tab) {
      case 1:
        state = 1;
        this.currentPage = this.paginationTabs['pagPorAsignar']['currentPage'] = page;
        break;
      case 2:
        state = 2;
        this.currentPage = this.paginationTabs['pagAsignados']['currentPage'] = page;
        break;
      case 3:
        state = 3;
        this.currentPage = this.paginationTabs['pagEnProceso']['currentPage'] = page;
        break;
      case 4:
        state = 4;
          this.currentPage = this.paginationTabs['pagAnulados']['currentPage'] = page;
          break;
      case 5:
        state = 5;
        this.currentPage = this.paginationTabs['pagGestionados']['currentPage'] = page;
        break;
      case 6:
        state = 6;
        this.currentPage = this.paginationTabs['pagNotificados']['currentPage'] = page;
        break;
    }
    this.searchInput = (this.dataSearchAdvance['textSearch']) ? this.dataSearchAdvance['textSearch'] : '';
    // let state = (this.dataSearchAdvance['state']) ? this.dataSearchAdvance['state'] : '';
    let dateStartValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
    let dateEndValueof = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
    this.fnBuildData(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, this.currentSearch);
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
      this.fnBuildData(this.token, this.currentPage, text_search, state, dateStartValueof, dateEndValueof, true);
    } else {
      // text_search = '';
      // self.search_input = '';
      // self.fnGetDataList(self.current_payload, self.currentPage, text_search, self.status_list);
    }
  }

  fnClearCurrentSearch() {
    this.currentSearch = false;
    this.searchInput = '';
    this.dataSearchAdvance = {
      state: 1,
      statusInfo: { name: 'Por gestionar', value: 1 },
    };
    this.fnBuildData(this.token, this.currentPage, this.searchInput, '', '', '', false);
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
      // this.dialogService.open(BusquedaAvanzadaComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
      //   console.log('res: ', res);
      //   if (res) {
      //     this.dataSearchAdvance = res;
      //     this.searchInput = (res['textSearch']) ? res['textSearch'] : '';
      //     let state = (res['state']) ? res['state'] : '';
      //     let dateStartValueof = (res['daterange']) ? moment(res['daterange'][0]).valueOf() : '';
      //     let dateEndValueof = (res['daterange']) ? moment(res['daterange'][1]).valueOf() : '';
      //     // let dateStartUnix = moment(res['daterange'][0]).unix();
      //     // let dateEndUnix = moment(res['daterange'][1]).unix();
      //     this.fnBuildData(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, true);
      //   }
      // });
  }

  fnBuildData(token, currentPage, searchInput, state, startDate, endDate, stateSearch) {
    this.submitted = true;
    this.fnGetDataList(token, currentPage, searchInput, state, startDate, endDate).then((resp) => {
      if(resp) {
        this.currentSearch = stateSearch;
        console.log('resp: ', resp);
        if (resp['status'] == 200) {
          let dataListCollection = JSON.parse(JSON.stringify(resp['body']['listaPacientes']));
          let dataListCollectionOriginal = JSON.parse(JSON.stringify(resp['body']['listaPacientes']));
          // this.totalItems = resp['body']['paginacion']['totalItems'];
          // this.numItemsPage = resp['body']['paginacion']['itemsPorPagina'];
          // this.currentPage = resp['body']['paginacion']['paginaActual'];
          // this.prevPage = resp['body']['paginacion']['anterior'];
          // this.nextNext = resp['body']['paginacion']['siguiente'];
          // this.totalPaginas = resp['body']['paginacion']['totalPaginas'];

          let collection = [];
          dataListCollection.forEach((val, key) => {
            // console.log('val: ', val);
            this.fnGetDataUserByID(token, val['idPaciente']).then((respDataUser) => {
              console.log('respDataUser: ', respDataUser);
              val['dataUser'] = respDataUser['body'];
              val['progress'] = Math.floor(Math.random() * 101);
              val['checked'] = false;
              collection.push(val);
              // console.log('collection: ', collection);
              switch (state) {
                case 1:
                    this.collectionPorAsignar = collection;
                    this.paginationTabs['pagPorAsignar'] = {
                      'totalItems': resp['body']['paginacion']['totalItems'],
                      'currentPage': 1,
                      'itemsPerPage': 10,
                      'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      'prevPage': resp['body']['paginacion']['anterior'],
                      'nextNext': resp['body']['paginacion']['siguiente'],
                      'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                    }
                    // this.collectionAsignados = collection;
                    // this.collectionEnProceso = collection;
                    // this.collectionGestionados = collection;
                    // this.collectionAnulados = collection;
                    // this.collectionNotificados = collection;
                  break;
                case 2:
                    this.collectionAsignados = collection;
                    this.paginationTabs['pagAsignados'] = {
                      'totalItems': resp['body']['paginacion']['totalItems'],
                      'currentPage': 1,
                      'itemsPerPage': 10,
                      'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      'prevPage': resp['body']['paginacion']['anterior'],
                      'nextNext': resp['body']['paginacion']['siguiente'],
                      'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                    }
                  break;
                case 3:
                    this.collectionEnProceso = collection;
                    this.paginationTabs['pagEnProceso'] = {
                      'totalItems': resp['body']['paginacion']['totalItems'],
                      'currentPage': 1,
                      'itemsPerPage': 10,
                      'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      'prevPage': resp['body']['paginacion']['anterior'],
                      'nextNext': resp['body']['paginacion']['siguiente'],
                      'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                    }
                  break;
                case 4:
                  this.collectionAnulados = collection;
                  this.paginationTabs['pagAnulados'] = {
                    'totalItems': resp['body']['paginacion']['totalItems'],
                    'currentPage': 1,
                    'itemsPerPage': 10,
                    'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                    'prevPage': resp['body']['paginacion']['anterior'],
                    'nextNext': resp['body']['paginacion']['siguiente'],
                    'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                  }
                  break;
                case 5:
                  this.collectionGestionados = collection;
                  this.paginationTabs['pagGestionados'] = {
                    'totalItems': resp['body']['paginacion']['totalItems'],
                    'currentPage': 1,
                    'itemsPerPage': 10,
                    'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                    'prevPage': resp['body']['paginacion']['anterior'],
                    'nextNext': resp['body']['paginacion']['siguiente'],
                    'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                  }
                  break;
                case 6:
                  this.collectionNotificados = collection;
                  this.paginationTabs['pagNotificados'] = {
                    'totalItems': resp['body']['paginacion']['totalItems'],
                    'currentPage': 1,
                    'itemsPerPage': 10,
                    'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                    'prevPage': resp['body']['paginacion']['anterior'],
                    'nextNext': resp['body']['paginacion']['siguiente'],
                    'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                  }
                  break;
              }
            });
            // this.fnGetDiagnosicosIncapacidadByPaciente(token, val['idPaciente']).then((respDataIncap) => {
            //   console.log('respDataIncap: ', respDataIncap);
            //   val['incapacidades'] = JSON.parse(JSON.stringify(respDataIncap['data']));
            // });
            
          });
          // this.dataListCollectionOriginal = this.dataListCollection;
          // console.log('this.dataListCollection: ', this.dataListCollection);
          this.submitted = false;
        } else {
          this.submitted = false;
        }
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
    
    this.fnBuildData(this.token, this.currentPage, searchInput, state, dateStart, dateEnd, stateSearch);
  }

  fnSelectState(dataState) {
    console.log('dataState: ', dataState);

    let searchInput = this.searchInput;
    let state;
    let dateStart = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][0]).valueOf() : '';
    let dateEnd = (this.dataSearchAdvance['daterange']) ? moment(this.dataSearchAdvance['daterange'][1]).valueOf() : '';
    let stateSearch = this.currentSearch;
    // this.dataSearchAdvance = {};
    let currentPage = null;
    switch (dataState['tabTitle']) {
      case 'Por asignar':
        state = 1;
        currentPage = this.paginationTabs['pagPorAsignar']['currentPage'];
        // this.dataSearchAdvance['statusInfo'] = { name: 'Por asignar', value: 1 };      
        break;
      case 'Asignados':
        state = 2;
        currentPage = this.paginationTabs['pagAsignados']['currentPage'];
        // this.dataSearchAdvance['statusInfo'] = { name: 'Asignados', value: 2 };
        break;
      case 'En proceso':
        state = 3;
        currentPage = this.paginationTabs['pagEnProceso']['currentPage'];
        // this.dataSearchAdvance['statusInfo'] = { name: 'En proceso', value: 3 };
        break;
      case 'Anulados':
          state = 4;
          currentPage = this.paginationTabs['pagAnulados']['currentPage'];
          // this.dataSearchAdvance['statusInfo'] = { name: 'Anulados', value: 5 };
          break;
      case 'Gestionados':
        state = 5;
        currentPage = this.paginationTabs['pagGestionados']['currentPage'];
        // this.dataSearchAdvance['statusInfo'] = { name: 'Gestionados', value: 4 };
        break;
      case 'Notificados':
        state = 6;
        currentPage = this.paginationTabs['pagNotificados']['currentPage'];
        // this.dataSearchAdvance['statusInfo'] = { name: 'Anulados', value: 5 };
        break;
    }
    // this.dataSearchAdvance['state'] = state;

    this.fnBuildData(this.token, currentPage, searchInput, state, dateStart, dateEnd, stateSearch);
  }

  fnAssignCase(item) {
    console.log('item: ', item);
    let dataSend = {};
    dataSend['dataCase'] = item
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(AssignCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      console.log('res: ', res);
    });
  }

  fnReAssignCase(item) {
    console.log('item: ', item);
    let dataSend = {};
    dataSend['dataCase'] = item
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(ReAssignCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      console.log('res: ', res);
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente(token, idPaciente) {
    // this.submitted = true;
    return new Promise((resolve, reject) => {
      this.patientIncapacities = [];
      //const idPaciente = 2;
      this.incapacityService.fnHttpGetDiagnosicosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
        if (r.status == 200) {
          this.submitted = false;
          let patientIncapacities = JSON.parse(JSON.stringify(r.body));
          console.log('patientIncapacities: ', patientIncapacities);
          
          if (patientIncapacities) {
            patientIncapacities.forEach((value, key) => {
              value.cie10.forEach((cievalue, ciekey) => {
                if (cievalue.iIdtipoCie === 1) {
                  value['cie10_diagnotic'] = cievalue;
                }
              });
              // this.patientIncapacities.push(value);
            });
            
            // console.log('this.patientIncapacities: ', this.patientIncapacities);
            // this.totalItems = this.patientIncapacities.length;
            resolve({ state: true, data: patientIncapacities });
          } else {
            resolve({ state: true, data: [] });
          }

        } else if (r.status == 206) {
          reject({ state: false, data: null });
          // this.submitted = false;
          // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
          // this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        reject({ state: false, data: null });
        // this.submitted = false;
        // this.utilitiesService.showToast('top-right', '', 'Error consultado el historial de incapacidades!');
      });
    });
  }

  fnRedirectViewPatientIncapacitiesHistory(item) {
    console.log('item: ', item);
    this.utilitiesService.fnSetDataShare({ 
      patientData: item['dataUser'], 
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/historico');
  }

  fnRandomNum(item) {
    // return Math.floor(Math.random() * 101);
    item['progress'] = Math.floor(Math.random() * 101);
  }

  fnShowCheckListCases() {
    this.checkBlockCases = (this.checkBlockCases == true) ? false : true;
  }

  fnCheckListCase(item, index) {
    console.log('item: ', item);
    if (item['checked'] == false) {
      item['checked'] = true;
      this.collectionCheckedCases[index] = item;
      console.log('this.collectionCheckedCases: ', this.collectionCheckedCases);
    } else {
      item['checked'] = false;
      this.collectionCheckedCases.splice(index, 1);
      console.log('this.collectionCheckedCases: ', this.collectionCheckedCases);
    }
  }

  fnCopyToClipboard(data_copy) {
    this.clipBoardData = data_copy;
    console.log('this.clipBoardData: ', this.clipBoardData);
    this.utilitiesService.fnCopyDataToClipboard(data_copy).then(respCopy => {
      if (!respCopy) {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      } else {
        this.utilitiesService.showToast('top-right', 'success', 'Número de documento copiado!');
      }
    });

  }

  fnStartCHRBConceptCase(item) {
    console.log('item: ', item);
    this.utilitiesService.fnSetDataShare({ 
      patientData: item['dataUser'], 
      patientConcept: item,
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/editar-concepto/' + item['idpacienteporemitir']);
  }

}
