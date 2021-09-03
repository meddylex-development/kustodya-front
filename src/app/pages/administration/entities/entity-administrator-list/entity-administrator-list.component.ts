import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { EditAdministratorComponent } from './edit-administrator/edit-administrator.component';
import { DeleteAdministratorComponent } from './delete-administrator/delete-administrator.component';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../shared/api/services/user.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-administrator-list',
  templateUrl: './entity-administrator-list.component.html',
  styleUrls: ['./entity-administrator-list.component.scss']
})
export class EntityAdministratorListComponent implements OnInit {

  @Input() dataEntityTab: any;
  search_input: any = '';
  list_users_admin: any = [];
  list_users_admin_original: any = [];

  numItemsPage: number = null;
  // numItemsPage: number = 10;
  currentPage: number = null;
  totalItems: number = null;

  loading_state: Boolean = false;
  flag_show_tabs: number = 1;

  obj_user: any = {};
  public current_payload: string = null;
  public entity_id: string = null;
  isSuperAdmin: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.entity_id = params.entity;
        self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
        if (self.isSuperAdmin === 'true') {
          self.entity_id = self.dataEntityTab['id']
          self.fnGetUsersListAdmin(self.entity_id, self.current_payload, '', 1);
        } else {
          // self.fnGetUsersList(self.token);
          // self.fnGetUsersList(self.entity_id, self.current_payload, '', 1);
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetUsersListAdmin(entity_id, current_payload, search_input, currentPage) {
    const self = this;
    self.loading_state = true;
    self.userService.fnHttpGetDataUserAdmin(entity_id, current_payload, search_input, currentPage).subscribe(response_users => {
      if (response_users.status == 200) {
        self.list_users_admin = JSON.parse(JSON.stringify(response_users['body']['usuariosOutputModel']));
        self.list_users_admin_original = JSON.parse(JSON.stringify(response_users['body']['usuariosOutputModel']));
        self.totalItems = response_users.body.paginacion.totalItems;
        self.numItemsPage = response_users.body.paginacion.itemsPorPagina;
        self.currentPage = response_users.body.paginacion.paginaActual;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3 || text_search.length > 0) {
      if (self.isSuperAdmin) {
        self.fnGetUsersListAdmin(self.entity_id, self.current_payload, text_search, 1);
      } else {
        // self.fnGetUsersList(self.token);
        // self.fnGetUsersList(self.entity_id, self.current_payload, text_search, 1);
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
      // self.fnGetUsersList(self.entity_id, self.current_payload, self.search_input, self.currentPage);
    }
  }

  fnShowModalUpdateEntityAdmin(entity_admin_data) {
    let object_send = {};
    object_send['accounting_number_data'] = entity_admin_data;
    this.dialogService.open(EditAdministratorComponent, { context: object_send }).onClose.subscribe((res) => {
      // this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
    });
  }

  fnShowModalDeleteEntityAdmin(entity_admin_data) {
    let object_send = {};
    object_send['entity_admin_data'] = entity_admin_data;
    this.dialogService.open(DeleteAdministratorComponent, { context: object_send }).onClose.subscribe((res) => {
      // this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
    });
  }

  fnGoToAddUsers() {
    debugger;
    // $('#sub_menu_a_0_0').css('background', 'red');
    $('#sub_menu_a_0_0').click();
    $(".przss-content-child-menu li:first").click();
    $(".przss-content-child-menu").first();
  }

  fnShowTabsOptionsData(flag: number) {
    this.flag_show_tabs = flag;
  }

}
