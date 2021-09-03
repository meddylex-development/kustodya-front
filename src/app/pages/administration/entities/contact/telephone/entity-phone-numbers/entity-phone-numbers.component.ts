import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

import { EntityAddPhoneNumberComponent } from '../entity-add-phone-number/entity-add-phone-number.component';
import { EntityEditPhoneNumberComponent } from '../entity-edit-phone-number/entity-edit-phone-number.component';
import { EntityDeletePhoneNumberComponent } from '../entity-delete-phone-number/entity-delete-phone-number.component';
import { UserService } from '../../../../../../shared/api/services/user.service';
import { EntityService } from '../../../../../../shared/api/services/entity.service';
declare var $: any;

@Component({
  selector: 'ngx-entity-phone-numbers',
  templateUrl: './entity-phone-numbers.component.html',
  styleUrls: ['./entity-phone-numbers.component.scss'],
})
export class EntityPhoneNumbersComponent implements OnInit {

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
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        // self.entity_id = params.entity;
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
        this.data_list = JSON.parse(JSON.stringify(response['body']['telefonos']));
        this.data_list_original = JSON.parse(JSON.stringify(response['body']['telefonos']));
        this.loading_state = false;
      } else {
        this.data_list = [];
        this.loading_state = false;
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  showModalAddEntityDataPhoneNumber(obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    self.dialogService.open(EntityAddPhoneNumberComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

  showModalEditEntityDataPhoneNumber(index, obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    obj_entity['index'] = index;
    self.dialogService.open(EntityEditPhoneNumberComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

  showModalDeleteEntityDataPhoneNumber(index, obj_entity) {
    const self = this;
    obj_entity['data_entity'] = obj_entity;
    obj_entity['data_entity']['entity_id'] = self.entity_id;
    obj_entity['index'] = index;
    self.dialogService.open(EntityDeletePhoneNumberComponent, { context: obj_entity }).onClose.subscribe((res) => {
      self.fnGetDataEntityById(self.token, self.entity_id);
    });
  }

}
