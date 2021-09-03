import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAddSocialNetworkComponent } from '../user-add-social-network/user-add-social-network.component';
import { UserEditSocialNetworkComponent } from '../user-edit-social-network/user-edit-social-network.component';
import { UserDeleteSocialNetworkComponent } from '../user-delete-social-network/user-delete-social-network.component';
import { UserService } from '../../../../../../shared/api/services/user.service';
declare var $: any;

@Component({
  selector: 'ngx-user-social-network',
  templateUrl: './user-social-network.component.html',
  styleUrls: ['./user-social-network.component.scss'],
})
export class UserSocialNetworkComponent implements OnInit {

  @Input() data_user: any;
  data_object: any = {};
  data_list: any = [];
  data_list_original: any = [];
  data_user_full: any = {};
  token: any = null;
  user_id: any = null;
  loading_state: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
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
        if (self.user_id) {
          self.fnGetDataUserById(self.token, self.user_id);
        } else {
          self.router.navigateByUrl('');
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataUserById(token, user_id) {
    // Instancia de conexion servicio
    this.loading_state = true;
    this.userService.fnHttpGetDataUserById(token, user_id).subscribe(response => {
      if (response.status == 200) {
        this.data_user_full = JSON.parse(JSON.stringify(response['body']));
        this.data_list = JSON.parse(JSON.stringify(response['body']['redesSociales']));
        this.data_list_original = JSON.parse(JSON.stringify(response['body']['redesSociales']));
        this.loading_state = false;
      } else {
        this.data_list = [];
        this.loading_state = false;
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  showModalAddUserDataSocialNetwork(obj_user) {
    const self = this;
    obj_user['data_user'] = obj_user;
    self.dialogService.open(UserAddSocialNetworkComponent, { context: obj_user }).onClose.subscribe((res) => {
      self.fnGetDataUserById(self.token, self.user_id);
    });
  }

  showModalEditUserDataSocialNetwork(index, obj_user) {
    const self = this;
    obj_user['data_user'] = obj_user;
    obj_user['index'] = index;
    self.dialogService.open(UserEditSocialNetworkComponent, { context: obj_user }).onClose.subscribe((res) => {
      self.fnGetDataUserById(self.token, self.user_id);
    });
  }

  showModalDeleteUserDataSocialNetwork(index, obj_user) {
    const self = this;
    obj_user['data_user'] = obj_user;
    obj_user['index'] = index;
    self.dialogService.open(UserDeleteSocialNetworkComponent, { context: obj_user }).onClose.subscribe((res) => {
      self.fnGetDataUserById(self.token, self.user_id);
    });
  }

}
