import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccountService } from '../../../shared/api/services/account.service';
import { ActivateAccountService } from '../../../shared/api/services/activate-account.service';
import { UserService } from '../../../shared/api/services/user.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { NbTooltipModule } from '@nebular/theme';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'ngx-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  state_active_account: any = null;
  state_update_password: any = null;
  unamePattern: any = null;
  user: any = {};
  submitted: boolean = false;
  required: boolean = true;
  messages_error: any = [];
  messages_success: any = [];
  token: string = '';
  email: any = '';

  md5 = new Md5();

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private userService: UserService,
    private utilitiesService: UtilitiesService,
    private router: Router,
  ) { }

  ngOnInit() {
    const self = this;
    self.user['new_password'] = '';
    self.user['confirm_new_password'] = '';
    self.activatedRoute.queryParams.subscribe(params => {
      const guid_user_active = params['param'];
      self.token = params['param'];
      self.fnGetEmail(self.token);
      self.accountService.fnHttpSetActivateAccountUser(guid_user_active).subscribe(response => {
        self.state_active_account = {
          'color': 'success',
          'message': 'success text',
        };
      }, err => {

        if (err.status == 401) {
          self.router.navigateByUrl('');
          self.utilitiesService.showToast('bottom-right', 'danger', "Su sesión ha expirado", 'nb-alert');
        }
        self.state_active_account = {
          'color': 'danger',
          'message': 'danger text',
        };
      });
    });
  }

  updatePass(new_password: any, confirm_new_password: any) {
    const self = this;
    self.submitted = true;
    if ((new_password && confirm_new_password) && (new_password === confirm_new_password)) {
      const objectForm = {
        'email': self.email,
        'password': new_password,
        'confirmPassword': confirm_new_password,
      };
      // let password = this.md5.appendStr(new_password).end();
      // return false;
      self.userService.fnHttpSetUpdatePasswordUser(self.token, objectForm).subscribe(result => {
        let r = result;
        if (r.status === 200) {
          self.messages_success = [{
            'state': 'Success',
            'color': 'success',
            'description': 'Su clave fue actualizada correctamente',
          }];
          self.fnRedirectPage(3000);
        } else {
          self.messages_error = [{
            'state': 'Error',
            'color': 'danger',
            'description': 'New error',
          }];
          self.fnRedirectPage(3000);
        }
      }, err => {
        self.messages_error = [{
          'state': 'Error',
          'color': 'danger',
          'description': err.error,
        }];
        self.fnRedirectPage(3000);
      });
    } else {
      self.messages_error = [{
        'state': 'Error',
        'color': 'danger',
        'description': 'Las constraseñas no coinciden',
      }];
      self.fnRedirectPage(3000);
      return false;
    }

  }

  fnRedirectPage(time: number) {
    this.submitted = true;
    setTimeout(() => {
      this.router.navigate(['auth/login']);
    }, time);  // 5s
  }

  fnGetEmail(token) {
    let object_decode_token = this.utilitiesService.fnDecodePayload(token);
    if (object_decode_token['email'] != '') {
      this.email = object_decode_token['email'];
    } else {
      this.utilitiesService.showToast('top-right', 'danger', 'El link es invalido!')
    }
  }

}
