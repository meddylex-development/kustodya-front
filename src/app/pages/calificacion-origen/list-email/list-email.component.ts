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
  public currentSearch: boolean = false;

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
        this.submitted = true;
        this.fnGetOriginQualificationList(this.token, this.currentPage, this.searchInput, 1, null, null).then((resp) => {
          if(resp) {
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
        // alert("Hola")
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
    
    // const date_start_unix = moment(this.date_range[0]).unix();
    // const date_start_valueof = (this.date_range.length > 0) ? moment(this.date_range[0]).valueOf() : '';
    // const date_end_unix = moment(this.date_range[1]).unix();
    // const date_end_valueof = (this.date_range.length > 0) ? moment(this.date_range[1]).valueOf() : '';
    this.submitted = true;
    this.currentPage = page;
    this.fnGetOriginQualificationList(this.token, this.currentPage, this.searchInput, 1, null, null).then((resp) => {
      console.log('resp: ', resp);
      if(resp) {
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
    })
  }

  fnViewHistory() {
    this.flipped = (this.flipped) ? false : true;
  }

  fnTextSearch(text_search) {
    this.currentSearch = false;
    if (text_search.length > 3 || text_search.length < 1) {

      // const date_start_unix = moment(self.date_range[0]).unix();
      // const date_start_valueof = (self.date_range.length > 0) ? moment(self.date_range[0]).valueOf() : '';
      // const date_end_unix = moment(self.date_range[1]).unix();
      // const date_end_valueof = (self.date_range.length > 0) ? moment(self.date_range[1]).valueOf() : '';

      this.fnGetOriginQualificationList(this.token, this.currentPage, text_search, 1, null, null).then((resp) => {
        if(resp) {
          this.currentSearch = true;
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
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      // text_search = '';
      // self.search_input = '';
      // self.fnGetOriginQualificationList(self.current_payload, self.currentPage, text_search, self.status_list);
    }
  }

  fnClearCurrentSearch() {
    this.currentSearch = false;
    this.searchInput = '';
    this.submitted = true;
    this.fnGetOriginQualificationList(this.token, this.currentPage, this.searchInput, 1, null, null).then((resp) => {
      if(resp) {
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

}
