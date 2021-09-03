import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EntityService } from '../../../shared/api/services/entity.service';
import { PatientService } from '../../../shared/api/services/patient.service';
import { NbDialogService } from '@nebular/theme';

import { RehabilitationConceptDetailPreviewComponent } from '../rehabilitation-concept-detail-preview/rehabilitation-concept-detail-preview.component';

@Component({
  selector: 'ngx-rehabilitation-concept-list',
  templateUrl: './rehabilitation-concept-list.component.html',
  styleUrls: ['./rehabilitation-concept-list.component.scss'],
})
export class RehabilitationConceptListComponent implements OnInit {

  list_patients: any = [];
  list_patients_original: any = [];
  totalItems: any = 7;
  currentPage: any = 1;
  numItemsPage: any = 10;
  prevPage: any = null;
  nextNext: any = null;
  totalPaginas: any = null;
  search_input: any = '';
  public current_payload: string = null;
  @Output() flagCreateEntity = new EventEmitter<object>();
  @Output() data_object = new EventEmitter<object>();
  @Input() data_object_tab: any;

  loading_state: boolean = false;
  collection_data: any = [
    {'id': 1, 'name': 'Por emitir'},
    {'id': 2, 'name': 'Emitido'},
    {'id': 3, 'name': 'Anulado'},
  ];
  status_list: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private patientService: PatientService,
    private entityService: EntityService,
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.status_list = 1;
        self.fnGetPatientsList(self.current_payload, self.currentPage, self.search_input, self.status_list);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetPatientsList(current_payload, current_page, search_input, status_list) {
    const self = this;
    self.loading_state = true;
    self.patientService.fnHttpGetListPatients(current_payload, current_page, search_input, status_list).subscribe(resp_get_patients => {
      if (resp_get_patients.status == 200) {
        self.list_patients = JSON.parse(JSON.stringify(resp_get_patients.body['listaPacientes']));
        self.list_patients_original = JSON.parse(JSON.stringify(resp_get_patients.body['listaPacientes']));
        self.totalItems = resp_get_patients.body['paginacion']['totalItems'];
        self.numItemsPage = resp_get_patients.body['paginacion']['itemsPorPagina'];
        self.currentPage = resp_get_patients.body['paginacion']['paginaActual'];
        self.prevPage = resp_get_patients.body['paginacion']['anterior'];
        self.nextNext = resp_get_patients.body['paginacion']['siguiente'];
        self.totalPaginas = resp_get_patients.body['paginacion']['totalPaginas'];
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnShowOptionsView(msg) {
    this.flagCreateEntity.emit(msg);
  }

  fnShowConcept(data_object_patient, status_list) {
    data_object_patient['status_list'] = status_list;
    const object_data = {
      'tab_id': 3,
      'data_object': data_object_patient,
    };
    this.fnShowOptionsView(object_data);
  }

  fnShowAddNewPatients() {
    const object_data_entity = {
      'tab_id': 2,
      'data_object': {id: null, nombre: null},
    };
    this.fnShowOptionsView(object_data_entity);
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3 || text_search.length < 1) {
      self.fnGetPatientsList(self.current_payload, self.currentPage, text_search, self.status_list);
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      // text_search = '';
      // self.search_input = '';
      // self.fnGetPatientsList(self.current_payload, self.currentPage, text_search, self.status_list);
    }
  }

  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetPatientsList(self.current_payload, self.currentPage, self.search_input, self.status_list);
}

  fnShowModalPreviewDetail(data, status_list) {
    let obj_send = {};
    const self = this;
    obj_send['data'] = data;
    obj_send['status_list'] = status_list;
    self.dialogService.open(RehabilitationConceptDetailPreviewComponent, {context: obj_send }).onClose.subscribe((res) => {
      self.fnGetPatientsList(self.current_payload, self.currentPage, self.search_input, self.status_list);
    });
  }

  fnChangeStatusList(state_select) {
    const self = this;
    self.fnGetPatientsList(self.current_payload, self.currentPage, self.search_input, state_select['id']);
  }

}
