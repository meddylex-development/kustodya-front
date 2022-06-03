import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { UserService } from '../../../../shared/api/services/user.service';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {

  @Input() user_data: any;
  current_payload: any = null;
  entity: number = -1;
  submitted: boolean = false;
  isSuperAdmin: any = null;

  constructor( private utilitiesService: UtilitiesService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteUserComponent>) { }

  ngOnInit() {
    const self = this;
    self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
    self.current_payload = self.utilitiesService.fnGetSessionStorage("token");
    self.entity = self.user_data['entity_id'];

    // self.route.params.subscribe(params => {
    //   if (params.token) {
    //     self.current_payload = params.token;
    //     self.entity = params.entity;
    //   } else {
    //   }
    // });
  }

  fnDeleteUser() {
    const self = this;
    if (self.isSuperAdmin === 'true') {
      self.fnSetDeleteUserSuperAdmin(self.current_payload, self.user_data['id']);
    } else {
      self.fnSetDeleteUserAdminEntity(self.current_payload, self.entity, self.user_data['id']);
    }
  }

  fnSetDeleteUserAdminEntity(current_payload, entity_id, user_id) {
    const self = this;
    self.submitted = true;
    self.userService.fnHttpSetDeleteUserAdminEntity(current_payload, entity_id, user_id).subscribe(resp_delete_profile => {
      if (resp_delete_profile.status == 200) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el usuario con exito!');
        self.dismiss();
        self.submitted = false;
      }
      if (resp_delete_profile.status == 204) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el usuario con exito!');
        self.dismiss();
        self.submitted = false;
      }
    }, err => {

    });
  }
  
  fnSetDeleteUserSuperAdmin(current_payload, user_id) {
    const self = this;
    self.submitted = true;
    self.userService.fnHttpSetDeleteUserSuperAdmin(current_payload, user_id).subscribe(resp_delete_profile => {
      if (resp_delete_profile.status == 200) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el usuario con exito!');
        self.dismiss();
        self.submitted = false;
      }
      if (resp_delete_profile.status == 204) {
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el usuario con exito!');
        self.dismiss();
        self.submitted = false;
      }
    }, err => {

    });
  }

  fnCancelDeleteUser() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
