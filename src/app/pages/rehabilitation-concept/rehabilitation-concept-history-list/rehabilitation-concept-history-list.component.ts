import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RehabilitationConceptDetailHistoryComponent } from '../rehabilitation-concept-detail-history/rehabilitation-concept-detail-history.component';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-rehabilitation-concept-history-list',
  templateUrl: './rehabilitation-concept-history-list.component.html',
  styleUrls: ['./rehabilitation-concept-history-list.component.scss'],
})
export class RehabilitationConceptHistoryListComponent implements OnInit {

  data_list: any = [];
  data_list_original: any = [];
  totalItems: any = 7;
  currentPage: any = 1;
  numItemsPage: any = 10;
  search_input: any = '';
  prevPage: any = null;
  nextNext: any = null;
  patient_id: any = null;
  public current_payload: string = null;
  @Input() data_object_tab: any;
  // @Output() flagCreateEntity = new EventEmitter<object>();
  // @Output() dataEntity = new EventEmitter<object>();
  // @Input() dataEntityTab: any;

  loading_state: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private rehabilitationConceptService: RehabilitationConceptService,
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    // self.dataEntityTab
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        // idPaciente: 2
        // idpacienteporemitir: 56
        self.patient_id = self.data_object_tab['idPaciente'];
        self.fnGetList(self.current_payload, self.search_input, self.currentPage);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetList(current_payload, search_input, current_page) {
    const self = this;
    self.loading_state = true;
    // self.data_list = [
    //   { 'id': 23423423, 'fechaEmision': 7673287387, 'cie10': 'C05', 'descripcion': 'Neoplasias malignas de la base de la boca', 'concepto': 'Favorable', 'medico': 'Jose Hernandez' },
    //   { 'id': 54645323, 'fechaEmision': 7673287387, 'cie10': 'C15', 'descripcion': 'Neoplasias malignas de esofago', 'concepto': 'Favorable', 'medico': 'Miguel Rojas' },
    //   { 'id': 97846310, 'fechaEmision': 7673287387, 'cie10': 'C76', 'descripcion': 'Neoplasias malignas de estomago', 'concepto': 'Favorable', 'medico': 'Ricardo Medina' },
    //   { 'id': 10435999, 'fechaEmision': 7673287387, 'cie10': 'C12', 'descripcion': 'Neoplasias malignas', 'concepto': 'Favorable', 'medico': 'Milena Arias' },
    // ]
    self.rehabilitationConceptService.fnHttpGetListConceptsHistoryByPatientId(self.patient_id, current_payload, current_page, search_input, self.numItemsPage).subscribe(resp_get_patients => {
      if (resp_get_patients.status == 200) {
        // self.search_input = '';
        self.data_list = JSON.parse(JSON.stringify(resp_get_patients.body['historialConceptosOutputModel']));
        self.data_list_original = JSON.parse(JSON.stringify(resp_get_patients.body['historialConceptosOutputModel']));
        self.totalItems = resp_get_patients.body['paginacion']['totalItems'];
        self.numItemsPage = resp_get_patients.body['paginacion']['itemsPorPagina'];
        self.currentPage = resp_get_patients.body['paginacion']['paginaActual'];
        self.prevPage = resp_get_patients.body['paginacion']['anterior'];
        self.nextNext = resp_get_patients.body['paginacion']['siguiente'];
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 1) {
      self.fnGetList(self.current_payload, text_search, self.currentPage);
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      text_search = '';
      self.fnGetList(self.current_payload, text_search, self.currentPage);
    }
  }

  getPage(page) {
    const self = this;
    self.currentPage = page;
    self.fnGetList(self.current_payload, self.search_input, self.currentPage);
  }

  showModalDetail(obj_user) {
    const self = this;
    obj_user['data_user'] = obj_user;
    self.dialogService.open(RehabilitationConceptDetailHistoryComponent, { context: obj_user }).onClose.subscribe((res) => {
      self.fnGetList(self.current_payload, self.search_input, self.currentPage);
    });
  }

}
