import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../shared/api/services/entity.service';
import { NbDialogService } from '@nebular/theme';

import { EntityDeleteEntityComponent } from '../entity-delete-entity/entity-delete-entity.component';

@Component({
  selector: 'ngx-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
})
export class EntitiesListComponent implements OnInit {

  list_entities: any = [];
  list_entities_original: any = [];
  totalItems: any = 7;
  currentPage: any = 1;
  numItemsPage: any = 10;
  search_input: any = '';
  public current_payload: string = null;
  @Output() flagCreateEntity = new EventEmitter<object>();
  @Output() dataEntity = new EventEmitter<object>();

  loading_state: Boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
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
        self.fnGetEntitiesList(self.current_payload, self.search_input, self.currentPage);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetEntitiesList(current_payload, current_page, search_input) {
    const self = this;
    self.loading_state = true;
    self.entityService.fnHttpGetListEntities(current_payload, current_page, search_input, self.numItemsPage).subscribe(resp_get_entities => {
      if (resp_get_entities.status == 200) {
        self.list_entities = JSON.parse(JSON.stringify(resp_get_entities.body.entidadesOutputModel));
        self.list_entities_original = JSON.parse(JSON.stringify(resp_get_entities.body.entidadesOutputModel));
        self.totalItems = resp_get_entities.body.paginacion.totalItems;
        self.numItemsPage = resp_get_entities.body.paginacion.itemsPorPagina;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnShowOptionsView(msg) {
    this.flagCreateEntity.emit(msg);
  }

  fnShowEditEntities(data_entity) {
    const object_data_entity = {
      'tab_id': 3,
      'data_entity': data_entity,
    }
    this.fnShowOptionsView(object_data_entity)
  }

  fnShowAddNewEntities() {
    const object_data_entity = {
      'tab_id': 2,
      'data_entity': {id: null, nombre: null},
    }
    this.fnShowOptionsView(object_data_entity)
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3 || text_search.length > 0) {
      self.fnGetEntitiesList(self.current_payload, text_search, self.currentPage);
      // if (self.isSuperAdmin) {
      //   self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      // } else {
      //   // self.fnGetUsersList(self.token);
      //   self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      // }
    } else {
      text_search = '';
      self.fnGetEntitiesList(self.current_payload, text_search, self.currentPage);
    }
  }

  getPage(page) {

  }

  fnShowModalInactive(data_entity) {
    let obj_send = {};
    const self = this;
    obj_send['data_entity'] = data_entity;
    self.dialogService.open(EntityDeleteEntityComponent, {context: obj_send }).onClose.subscribe((res) => {
      self.fnGetEntitiesList(self.current_payload, self.search_input, self.currentPage);
    });
  }

}
