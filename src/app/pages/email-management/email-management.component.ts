import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

import { AddEmailManagementComponent } from './add-email-management/add-email-management.component';
import { EditEmailManagementComponent } from './edit-email-management/edit-email-management.component';
import { DeleteEmailManagementComponent } from './delete-email-management/delete-email-management.component';
import { EmailManagementService } from '../../shared/api/services/email-management.service';

@Component({
  selector: 'ngx-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.scss']
})
export class EmailManagementComponent implements OnInit {

  token: any = null;
  entity: number = -1;
  cun: string = null;

  list_users: any = [];
  list_users_original_collection: any = [];
  data_object: any = {};

  constructor(
    private dialogService: NbDialogService,
    private emailManagementService: EmailManagementService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        // self.entity = params.entity;
        self.entity = JSON.parse(sessionStorage.getItem('ips'));
        // if (params.cun && params.cun != 'null') {
        //   self.cun = params.cun;
        // }
        self.fnGetAllDataUsersManagement(self.token, self.entity['iIdips']);

      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  showModalAddUserDataEmailManagement(obj_user) {
    // obj_user['id_version'] = 123456;
    // obj_user['data_user'] = obj_user;
    obj_user['id_ips'] = this.entity['iIdips'];
    this.dialogService.open(AddEmailManagementComponent, { context: obj_user }).onClose.subscribe((res) => {
      this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  showModalEditUserDataEmailManagement(obj_user) {
    // obj_user['id_version'] = 123456;
    obj_user['data_user'] = obj_user;
    obj_user['id_ips'] = this.entity['iIdips'];
    this.dialogService.open(EditEmailManagementComponent, { context: obj_user }).onClose.subscribe((res) => {
      this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  showModalDeleteUserDataEmailManagement(obj_user) {
    obj_user['id_ips'] = this.entity['iIdips'];
    obj_user['data_user'] = obj_user;

    this.dialogService.open(DeleteEmailManagementComponent, { context: obj_user }).onClose.subscribe((res) => {
      this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  fnGetAllDataUsersManagement(current_payload, id_company) {

    const object_data_send = {
      'id': id_company,
    }
    this.list_users = [];
    this.emailManagementService.fnHttpGetDataUsersManagement(current_payload, id_company).subscribe(r => {
      const data_users = r.body;
      if (r.status == 200) {
        this.list_users = JSON.parse(JSON.stringify(r.body));
        this.list_users_original_collection = JSON.parse(JSON.stringify(r.body));
      }
    }, err => {
    });
  }

}
