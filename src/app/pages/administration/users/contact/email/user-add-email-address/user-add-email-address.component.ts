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
  selector: 'ngx-user-add-email-address',
  templateUrl: './user-add-email-address.component.html',
  styleUrls: ['./user-add-email-address.component.scss'],
})
export class UserAddEmailAddressComponent implements OnInit {

  @Input() data_user: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  token: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    protected ref: NbDialogRef<UserAddEmailAddressComponent>,
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
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelCreateNewEmailUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnCreateNewEmailUser(user_data) {
    const self = this;
    self.submitted = true;
    const data_user = [
      {
        'op' : 'add',
        'path' : 'Correos/-',
        'value' : {
          'UsuarioId': self.data_user['id'],
          'CorreoElectronico': user_data['email_user'],
          'Descripcion': user_data['description_email_user'],
        },
      },
    ];
    self.userService.fnHttpSetPatchDataUser(self.token, self.user_id, data_user).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Correo electrónico agregado correctamente!');
        self.dismiss();
      }
      if (r.status == 206) {
        self.submitted = false;
        let error = self.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        self.utilitiesService.showToast('top-right', 'success', 'Correo electrónico agregado correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
