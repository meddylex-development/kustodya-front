import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../../../shared/api/services/user.service';
declare var $: any;

@Component({
  selector: 'ngx-user-delete-social-network',
  templateUrl: './user-delete-social-network.component.html',
  styleUrls: ['./user-delete-social-network.component.scss'],
})
export class UserDeleteSocialNetworkComponent implements OnInit {

  @Input() data_user: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  index: any = null;
  token: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    protected ref: NbDialogRef<UserDeleteSocialNetworkComponent>,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem("token");
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
      self.index = self.data_user['index'];
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelDeleteSocialNetworkUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnDeleteSocialNetworkUser(user_data) {
    const self = this;
    self.submitted = true;
    const data_user = [
      {
        'op' : 'remove',
        'path' : 'RedesSociales/' + self.index,
      },
    ];
    self.userService.fnHttpSetPatchDataUser(self.token, self.user_id, data_user).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Red social eliminada correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Red social eliminada correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
