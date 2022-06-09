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
import { ProfilesService } from '../../../shared/api/services/profiles.service';
import { UserService } from '../../../shared/api/services/user.service';
import { PatientInformationComponent } from '../patient-information/patient-information.component';
import { SpecialistInformationComponent } from '../specialist-information/specialist-information.component';
import { CancelCaseComponent } from '../cancel-case/cancel-case.component';
import { AddComponent } from '../add/add.component';
import { NoApplyCaseComponent } from '../no-apply-case/no-apply-case.component';

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
      'totalItems': 0,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagAsignados': {
      'totalItems': 0,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagEnProceso': {
      'totalItems': 0,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagGestionados': {
      'totalItems': 0,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagAnulados': {
      'totalItems': 0,
      'currentPage': 1,
      'itemsPerPage': 10,
      'numItemsPage': [],
      'prevPage': null,
      'nextNext': null,
      'totalPaginas': null,
    },
    'pagNotificados': {
      'totalItems': 0,
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
  public profileUser: any = '';
  public userIdSession: any = '';
  public tabId: number = 1;
  public dataStatusBadges: any = null;

  constructor(
    private authService: NbAuthService,
    private dialogService: NbDialogService,
    private location: Location,
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private originQualificationService: OriginQualificationService,
    private enumerationsService: EnumerationsService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private profilesService: ProfilesService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {

        // here we receive a payload from the token and assigne it to our `dataSession` variable
        this.dataSession = token.getPayload();
        this.token = token["token"];
        let data = this.utilitiesService.fnGetDataShare();
        
        this.fnGetInfoProfileById(token, this.dataSession['IdProfile']).then((respDataProfile) => {
          if (respDataProfile) {
            if (data) {
              this.tabId = data['tab'];
            } else {
              this.tabId = (respDataProfile['body']['nombre'] == "Emisor Concepto") ? 2 : ((respDataProfile['body']['nombre'] == "Administrador Concepto") || (this.dataSession['EsSuperAdmin'] == "True")) ? 1 : null;
            }
            this.profileUser = (respDataProfile['body']['nombre'] == "Emisor Concepto") ? 2 : ((respDataProfile['body']['nombre'] == "Administrador Concepto") || (this.dataSession['EsSuperAdmin'] == "True")) ? 1 : null;
            this.userIdSession = (this.dataSession['EsSuperAdmin'] == "True")? 112 : this.dataSession['UserId'];

            // this.fnBuildData(this.token, this.currentPage, null, 2, null, null, null, this.profileUser, this.userIdSession);
            // this.fnBuildData(this.token, this.currentPage, null, 3, null, null, null, this.profileUser, this.userIdSession);
            // this.fnBuildData(this.token, this.currentPage, null, 4, null, null, null, this.profileUser, this.userIdSession);
            // this.fnBuildData(this.token, this.currentPage, null, 5, null, null, null, this.profileUser, this.userIdSession);

          } else {
            
          }
        }).catch((err) => {
        });

        // this.fnBuildData(this.token, this.currentPage, this.searchInput, '', '', '', false, this.profileUser, this.userIdSession);
        // this.user['name'] = this.user['User']['tFirstName'] + ' ' + this.user['User']['tLastName'];
        
      }
    });
  }

  fnGetDataList(current_payload, current_page, search_input, status_list, start_date, end_date, type_user, id_user) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      // this.utilitiesService.fnGetDataJson('response_casos_conceptos_CRHB.json').subscribe(respList => {
      this.conceptoRehabilitacionService.fnHttpGetListPatients(current_payload, current_page, search_input, status_list, type_user, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
        this.submitted = false;
      });
    })
  }

  fnGetDataListTask(current_payload, current_page, search_input, status_list, type_user, id_user, items_per_page) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      // this.utilitiesService.fnGetDataJson('response_casos_conceptos_CRHB.json').subscribe(respList => {
      this.conceptoRehabilitacionService.fnHttpGetListTask(current_payload, current_page, search_input, status_list, type_user, id_user, items_per_page).subscribe(respList => {
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
      this.incapacityService.fnHttpGetPacienteByID(token, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
      });
    })
  }

  fnGetInfoProfileById(token, id_profile) {
    return new Promise((resolve, reject) => {
      this.submitted = true;
      this.profilesService.fnHttpGetInfoProfileById(token, id_profile).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
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
    this.fnBuildData(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, this.currentSearch, this.profileUser, this.userIdSession);
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
      this.fnBuildData(this.token, this.currentPage, text_search, state, dateStartValueof, dateEndValueof, true, this.profileUser, this.userIdSession);
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
    this.fnBuildData(this.token, this.currentPage, this.searchInput, '', '', '', false, this.profileUser, this.userIdSession);
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
      // this.dialogService.open(BusquedaAvanzadaComponent, { context: dataSend, hasScroll: true }).onClose.subscribe((res) => {
      //   if (res) {
      //     this.dataSearchAdvance = res;
      //     this.searchInput = (res['textSearch']) ? res['textSearch'] : '';
      //     let state = (res['state']) ? res['state'] : '';
      //     let dateStartValueof = (res['daterange']) ? moment(res['daterange'][0]).valueOf() : '';
      //     let dateEndValueof = (res['daterange']) ? moment(res['daterange'][1]).valueOf() : '';
      //     // let dateStartUnix = moment(res['daterange'][0]).unix();
      //     // let dateEndUnix = moment(res['daterange'][1]).unix();
      //     this.fnBuildData(this.token, this.currentPage, this.searchInput, state, dateStartValueof, dateEndValueof, true, this.profileUser, this.userIdSession);
      //   }
      // });
  }

  fnBuildData(token, currentPage, searchInput, state, startDate, endDate, stateSearch, typeUser, idUser) {
    this.submitted = true;
    // this.fnGetDataList(token, currentPage, searchInput, state, startDate, endDate, typeUser, idUser).then((resp) => {
    this.fnGetDataListTask(token, currentPage, searchInput, state, typeUser, idUser, this.itemsPerPage).then((resp) => {
      console.log('resp: ', resp);
      if(resp) {
        this.currentSearch = stateSearch;
        if (resp['status'] == 200) {
          let dataListCollection = JSON.parse(JSON.stringify(resp['body']['listadoPacientes']));
          console.log('dataListCollection: ', dataListCollection);
          let dataListCollectionOriginal = JSON.parse(JSON.stringify(resp['body']['listadoPacientes']));

          let dataStatusBadges = JSON.parse(JSON.stringify(resp['body']['registrosEstados']));
          console.log('dataStatusBadges: ', dataStatusBadges);
          this.dataStatusBadges = {};
          dataStatusBadges.forEach(element => {
            console.log('element: ', element);
            switch (element.estado) {
              case 1:
                this.dataStatusBadges['PorAsignar'] = (element.registros) ? element.registros : 0;
                break;
              case 2:
                this.dataStatusBadges['Asignados'] = (element.registros) ? element.registros : 0;
                break;
              case 3:
                this.dataStatusBadges['EnProceso'] = (element.registros) ? element.registros : 0;
                break;
              case 4:
                this.dataStatusBadges['Anulados'] = (element.registros) ? element.registros : 0;
                break;
              case 5:
                this.dataStatusBadges['Emitidos'] = (element.registros) ? element.registros : 0;
                break;
              case 6:
                this.dataStatusBadges['Notificados'] = (element.registros) ? element.registros : 0;
                break;
            }
          });
          console.log('dataStatusBadges: ', dataStatusBadges);
          // this.dataStatusBadges = dataStatusBadges;
          console.log('this.dataStatusBadges: ', this.dataStatusBadges);
          // return false;
          // this.totalItems = resp['body']['paginacion']['totalItems'];
          // this.numItemsPage = resp['body']['paginacion']['itemsPorPagina'];
          // this.currentPage = resp['body']['paginacion']['paginaActual'];
          // this.prevPage = resp['body']['paginacion']['anterior'];
          // this.nextNext = resp['body']['paginacion']['siguiente'];
          // this.totalPaginas = resp['body']['paginacion']['totalPaginas'];

          let collection = [];
          dataListCollection.forEach((val, key) => {
            //this.fnGetDataUserByID(token, val['idPaciente']).then((respDataUser) => {
              // val['dataUser'] = respDataUser['body'];
              // val['progress'] = Math.floor(Math.random() * 101);
              val['checked'] = false;
              // return this.fnGetDataDoctorByID(token, val['usuarioAsignadoId']);
              collection.push(val);
              switch (state) {
                case 1:
                    this.collectionPorAsignar = collection;
                    this.paginationTabs['pagPorAsignar'] = {
                      'totalItems': resp['body']['paginacion'][0]['totalItems'],
                      'currentPage': currentPage,
                      'itemsPerPage': this.itemsPerPage,
                      'numItemsPage': this.itemsPerPage,
                      'prevPage': resp['body']['paginacion'][0]['anterior'],
                      'nextNext': resp['body']['paginacion'][0]['siguiente'],
                      'totalPaginas': resp['body']['paginacion'][0]['totalpaginas'],
                      // 'totalItems': resp['body']['paginacion']['totalItems'],
                      // 'currentPage': currentPage,
                      // 'itemsPerPage': 10,
                      // 'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      // 'prevPage': resp['body']['paginacion']['anterior'],
                      // 'nextNext': resp['body']['paginacion']['siguiente'],
                      // 'totalPaginas': resp['body']['paginacion']['totalPaginas'],
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
                      'totalItems': resp['body']['paginacion'][0]['totalItems'],
                      'currentPage': currentPage,
                      'itemsPerPage': this.itemsPerPage,
                      'numItemsPage': this.itemsPerPage,
                      'prevPage': resp['body']['paginacion'][0]['anterior'],
                      'nextNext': resp['body']['paginacion'][0]['siguiente'],
                      'totalPaginas': resp['body']['paginacion'][0]['totalpaginas'],
                      // 'totalItems': resp['body']['paginacion']['totalItems'],
                      // 'currentPage': currentPage,
                      // 'itemsPerPage': 10,
                      // 'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      // 'prevPage': resp['body']['paginacion']['anterior'],
                      // 'nextNext': resp['body']['paginacion']['siguiente'],
                      // 'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                    }
                  break;
                case 3:
                    this.collectionEnProceso = collection;
                    this.paginationTabs['pagEnProceso'] = {
                      'totalItems': resp['body']['paginacion'][0]['totalItems'],
                      'currentPage': currentPage,
                      'itemsPerPage': this.itemsPerPage,
                      'numItemsPage': this.itemsPerPage,
                      'prevPage': resp['body']['paginacion'][0]['anterior'],
                      'nextNext': resp['body']['paginacion'][0]['siguiente'],
                      'totalPaginas': resp['body']['paginacion'][0]['totalpaginas'],
                      // 'totalItems': resp['body']['paginacion']['totalItems'],
                      // 'currentPage': currentPage,
                      // 'itemsPerPage': 10,
                      // 'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                      // 'prevPage': resp['body']['paginacion']['anterior'],
                      // 'nextNext': resp['body']['paginacion']['siguiente'],
                      // 'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                    }
                  break;
                case 4:
                  this.collectionAnulados = collection;
                  this.paginationTabs['pagAnulados'] = {
                    'totalItems': resp['body']['paginacion']['totalItems'],
                    'currentPage': currentPage,
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
                    'currentPage': currentPage,
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
                    'currentPage': currentPage,
                    'itemsPerPage': 10,
                    'numItemsPage': resp['body']['paginacion']['itemsPorPagina'],
                    'prevPage': resp['body']['paginacion']['anterior'],
                    'nextNext': resp['body']['paginacion']['siguiente'],
                    'totalPaginas': resp['body']['paginacion']['totalPaginas'],
                  }
                  break;
              }
            // });
            // .then((respDataDoc) => {
            //   if (respDataDoc) {
            //     val['dataDoctor'] = respDataDoc['body'];
            //     this.submitted = false;
            //   }
            // });
            // this.fnGetDataDoctorByID(token, val['usuarioAsignadoId']).then((respDataDoctor) => {
            //   val['dataDoctor'] = respDataDoctor['body'];
            // });
          });

          // this.dataListCollectionOriginal = this.dataListCollection;
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

  fnGetDataDoctorByID(token, id_user) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUserById(token, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
      });
    })
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

    
    this.fnBuildData(this.token, this.currentPage, searchInput, state, dateStart, dateEnd, stateSearch, this.profileUser, this.userIdSession);
  }

  fnSelectState(dataState) {

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
      case 'Emitidos':
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

    this.fnBuildData(this.token, currentPage, searchInput, state, dateStart, dateEnd, stateSearch, this.profileUser, this.userIdSession);
  }

  fnShowAddNewCase() {
    let dataSend = {};
    dataSend['dataCase'] = "";
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(AddComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionPorAsignar = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }

  fnAssignCase(item) {
    let dataSend = {};
    dataSend['dataCase'] = item;
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(AssignCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionPorAsignar = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }

  fnCancelCase(item) {
    let dataSend = {};
    dataSend['dataCase'] = item;
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(CancelCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionPorAsignar = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }

  fnNoApplyCase(item) {
    let dataSend = {};
    dataSend['dataCase'] = item;
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(NoApplyCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionPorAsignar = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }

  fnReAssignCase(item) {
    let dataSend = {};
    dataSend['dataCase'] = item
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(ReAssignCaseComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionAsignados = [];
        this.fnBuildData(this.token, this.currentPage, null, 2, null, null, null, this.profileUser, this.userIdSession);
      }
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
          
          if (patientIncapacities) {
            patientIncapacities.forEach((value, key) => {
              value.cie10.forEach((cievalue, ciekey) => {
                if (cievalue.iIdtipoCie === 1) {
                  value['cie10_diagnotic'] = cievalue;
                }
              });
              // this.patientIncapacities.push(value);
            });
            
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

  fnRedirectViewPatientIncapacitiesHistory(item, tabId) {
    console.log('item: ', item);
    item['iIdpaciente'] = item['PacienteId']
    this.utilitiesService.fnSetDataShare({ 
      patientData: item, 
      tab: tabId,
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/historico');
  }

  
  fnShowPatientInformation(item) {
    let dataSend = {};
    dataSend['dataCase'] = item
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(PatientInformationComponent, { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionAsignados = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }
  
  fnShowSpecialistInformation(item) {
    let dataSend = {};
    dataSend['dataCase'] = item
    // let idDictamen = item['idDictamen'];
    // this.utilitiesService.fnSetDataShare({ 
    //   dataDictamen: item,
    // }, true);
    // this.utilitiesService.fnNavigateByUrl('pages/dictamen-pericial/auditar-caso/'+ idDictamen);
    this.dialogService.open(SpecialistInformationComponent , { context: dataSend, hasScroll: false }).onClose.subscribe((res) => {
      if (res) {
        this.collectionAsignados = [];
        this.fnBuildData(this.token, this.currentPage, null, 1, null, null, null, this.profileUser, this.userIdSession);
      }
    });
  }

  fnRandomNum(item) {
    // return Math.floor(Math.random() * 101);
    item['progress'] = Math.floor(Math.random() * 101);
  }

  fnShowCheckListCases() {
    this.checkBlockCases = (this.checkBlockCases == true) ? false : true;
  }

  fnCheckListCase(item, index) {
    if (item['checked'] == false) {
      item['checked'] = true;
      this.collectionCheckedCases[index] = item;
    } else {
      item['checked'] = false;
      this.collectionCheckedCases.splice(index, 1);
    }
  }

  fnCopyToClipboard(data_copy) {
    this.clipBoardData = data_copy;
    this.utilitiesService.fnCopyDataToClipboard(data_copy).then(respCopy => {
      if (!respCopy) {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      } else {
        this.utilitiesService.showToast('top-right', 'success', 'Número de documento copiado!');
      }
    });

  }

  fnStartCHRBConceptCase(item, tab_id) {
    this.utilitiesService.fnSetDataShare({ 
      patientData: item, 
      patientConcept: item,
      tab: tab_id,
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/editar-concepto/' + item['Id']);
  }

  fnShowPreviewCRHB(item, tab_id) {
    // this.patientData = data['patientData'];
    // this.patientConcept = data['patientConcept'];

    this.submitted = true;
    let dataObjectSend = {
      "paciente": (this.patientData) ? this.patientData : {},
      "datosConcepto": item,
    };
    this.utilitiesService.fnSetDataShare({ 
      paciente: item['dataUser'], 
      datosConcepto: item,
      tab: tab_id,
      // patientIncapacities: this.patientIncapacities, 
      // collectionDocumentTypes: this.collectionDocumentTypes, 
      // documentNumberPatient: this.documentNumberPatient, 
      // documentTypePatient: this.documentTypePatient, 
      // documentTypeSelected: this.documentTypeSelected,
      // dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnSetSessionStorage('data-concept', JSON.stringify(dataObjectSend));
    this.utilitiesService.fnNavigateByUrl('pages/concepto-de-rehabilitacion/certificado-crhb/' + item['idpacienteporemitir']);
  }



}
