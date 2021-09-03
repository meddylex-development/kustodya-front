import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

import { EntityAddEmailAddressComponent } from '../entity-add-email-address/entity-add-email-address.component';
import { EntityEditEmailAddressComponent } from '../entity-edit-email-address/entity-edit-email-address.component';
import { EntityDeleteEmailAddressComponent } from '../entity-delete-email-address/entity-delete-email-address.component';
import { UserService } from '../../../../../../shared/api/services/user.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-email-address',
  templateUrl: './entity-email-address.component.html',
  styleUrls: ['./entity-email-address.component.scss']
})
export class EntityEmailAddressComponent implements OnInit {

  @Input() data_user: any;
  @Input() dataEntityContact: any;
  data_object: any = {};
  data_list: any = [];
  data_list_original: any = [];
  data_user_full: any = {};
  token: any = null;
  user_id: any = null;
  entity_id: any = null;
  loading_state: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public entityService: EntityService,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;

    $(document).ready(function () {
      // $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
      // $('.menu-sidebar').removeClass('d-block').addClass('d-none');
      // $('#toggle-settings').removeClass('was-expanded').addClass('was-collapse'); // Hide right sidebar to this component
      // $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.user_id = sessionStorage.getItem('user_id');
        self.entity_id = self.dataEntityContact['id'];
        if (self.user_id) {
          self.fnGetDataEntityById(self.token, self.entity_id);
        } else {
          self.router.navigateByUrl('');
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataEntityById(token, entity_id) {
    // Instancia de conexion servicio
    this.loading_state = true;
    this.entityService.fnHttpGetDataEntityById(token, entity_id).subscribe(response => {
      if (response.status == 200) {
        this.data_user_full = JSON.parse(JSON.stringify(response['body']));
        this.data_list = JSON.parse(JSON.stringify(response['body']['correos']));
        this.data_list_original = JSON.parse(JSON.stringify(response['body']['correos']));
        this.loading_state = false;
      } else {
        this.data_list = [];
        this.loading_state = false;
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  showModalAddEntityDataEmail(obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    self.dialogService.open(EntityAddEmailAddressComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

  showModalEditEntityDataEmail(index, obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    obj_entity['index'] = index;
    this.dialogService.open(EntityEditEmailAddressComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

  showModalDeleteEntityDataEmail(index, obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    obj_entity['index'] = index;
    self.dialogService.open(EntityDeleteEmailAddressComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

}
