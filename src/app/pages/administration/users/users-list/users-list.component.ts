import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../shared/api/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { NbDialogService } from '@nebular/theme';

import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  @Output() flagCreateUser = new EventEmitter<number>();
  @Output() dataUser = new EventEmitter<object>();
  search_input: any = '';
  list_users: any = [];
  list_users_original: any = [];

  numItemsPage: number = null;
  // numItemsPage: number = 10;
  currentPage: number = null;
  totalItems: number = null;
  loading_state: Boolean = false;
  obj_user: any = {};
  public current_payload: string = null;
  public entity_id: string = null;
  public user_id: string = null;
  isSuperAdmin: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.entity_id = params.entity;
        self.user_id = JSON.parse(atob(self.current_payload.split(".")[1])).UserId;
        self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
        if (self.isSuperAdmin === 'true') {
          self.fnGetUsersListAdmin(self.entity_id, self.current_payload, '', 1);
        } else {
          self.fnGetUsersList(self.entity_id, self.current_payload, '', 1);
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnCreateUser(msg: number) {
    this.flagCreateUser.emit(msg);
  }

  fnGetUsersList(entity_id, current_payload, search_input, currentPage) {
    const self = this;
    self.loading_state = true;
    self.userService.fnHttpGetDataUsersByIdEntity(current_payload, 1, search_input, currentPage).subscribe(response_users => {
      if (response_users.status == 200) {
        self.list_users = JSON.parse(JSON.stringify(response_users.body.usuariosOutputModel));
        self.list_users_original = JSON.parse(JSON.stringify(response_users.body.usuariosOutputModel));
        self.totalItems = response_users.body.paginacion.totalItems;
        self.numItemsPage = response_users.body.paginacion.itemsPorPagina;
        self.currentPage = response_users.body.paginacion.paginaActual;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnGetUsersListAdmin(entity_id, current_payload, search_input, currentPage) {
    const self = this;
    self.loading_state = true;
    self.userService.fnHttpGetDataUserAdmin(entity_id, current_payload, search_input, currentPage).subscribe(response_users => {
      if (response_users.status == 200) {
        self.list_users = JSON.parse(JSON.stringify(response_users['body']['usuariosOutputModel']));
        self.list_users_original = JSON.parse(JSON.stringify(response_users['body']['usuariosOutputModel']));
        self.totalItems = response_users.body.paginacion.totalItems;
        self.numItemsPage = response_users.body.paginacion.itemsPorPagina;
        self.currentPage = response_users.body.paginacion.paginaActual;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  showModalAddUser(obj_user) {
    obj_user['data_user'] = obj_user;
    this.dialogService.open(AddUserComponent, { context: obj_user }).onClose.subscribe((res) => {
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  fnShowEditUser(user_data) {
    this.flagCreateUser.emit(3);
    this.dataUser.emit(user_data);
  }

  fnShowModalDeleteUser(user_data) {
    let obj_send = {};
    const self = this;
    if(self.user_id != user_data.id) {
      user_data['current_payload'] = self.current_payload;
      user_data['entity_id'] = self.entity_id;
      obj_send['user_data'] = user_data;
      
      self.dialogService.open(DeleteUserComponent, {context: obj_send }).onClose.subscribe((res) => {
        if (self.isSuperAdmin === 'true') {
          self.fnGetUsersListAdmin(self.entity_id, self.current_payload, '', 1);
        } else {
          // self.fnGetUsersList(self.token);
          self.fnGetUsersList(self.entity_id, self.current_payload, '', 1);
        }
        self.search_input = '';
      });
    }
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3) {
      if (self.isSuperAdmin) {
        self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      } else {
        // self.fnGetUsersList(self.token);
        self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      }
    } else if (text_search.length < 1) {
      if (self.isSuperAdmin) {
        self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      } else {
        // self.fnGetUsersList(self.token);
        self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
      }
    }
  }

  /** Funciones para Pagindo **/
  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    if (self.isSuperAdmin === 'true') {
      self.fnGetUsersListAdmin(self.entity_id, self.current_payload, self.search_input, self.currentPage);
    } else {
      self.fnGetUsersList(self.entity_id, self.current_payload, self.search_input, self.currentPage);
    }
  }

}
