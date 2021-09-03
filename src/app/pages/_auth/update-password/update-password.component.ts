import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AccountService } from '../../../shared/api/services/account.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { NbTooltipModule } from '@nebular/theme';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'ngx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  state_update_password: any = null;
  unamePattern: any = null;
  user: any = {};
  submitted: Boolean = false;
  messages_error: any = [];
  messages_success: any = [];

  md5 = new Md5();
  token: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private utilitiesService: UtilitiesService,
    private router: Router,
  ) { }

  ngOnInit() {
    const self = this;
    self.user['new_password'] = '';
    self.user['confirm_new_password'] = '';
    self.activatedRoute.queryParams.subscribe(params => {
      const guid_user_active = params['params'];
      if (guid_user_active) {
        self.token = params['params'];
      } else {
        self.router.navigateByUrl('');
        self.utilitiesService.showToast('bottom-right', 'danger', 'Usuario invalido!', 'nb-alert');
      }
    });
  }

  updatePass(new_password: any, confirm_new_password: any) {
    const self = this;
    self.submitted = true;
    if ((new_password && confirm_new_password) && (new_password === confirm_new_password)) {
      const objectForm = {
        'tPassword': new_password,
        'tConfirmPassword': confirm_new_password,
      };
      let password = this.md5.appendStr(new_password).end();
      self.accountService.fnHttpSetUpdatePasswordUserByToken(password, self.token).subscribe(result => {
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

}
