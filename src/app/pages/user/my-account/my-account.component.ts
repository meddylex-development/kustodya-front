import { Component, OnInit, Injectable, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';

import { MyAccountService } from '../../../shared/api/services/my-account.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { SignOutService } from '../../../shared/api/services/sign-out.service';
import { HeaderComponent } from '../../../@theme/components/header/header.component';
declare var $: any;

@Component({
  selector: 'ngx-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  option_menu: any = 1;
  current_payload: string = null;
  state: boolean = true;
  state_password: boolean = false;
  submited_state: boolean = false;
  submited_state_password: boolean = false;
  personal_info: any = {};
  change_password: any = {};
  personal_info_original: any = {};
  messages_success: any = [];
  messages_error: any = [];
  constructor(
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private myAccountService: MyAccountService,
    // private headerComponent: HeaderComponent,
    private signOutService: SignOutService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {

    $(document).ready(function() {
      $('.menu-sidebar').addClass('d-none');
      // $('.menu-sidebar').removeClass('expanded').addClass('compacted');
    });

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        this.current_payload = token.getValue();
        if (this.current_payload) {
          // let data_id_company = sessionStorage.getItem('id_company');
          // this.fnGetPersonalInformation(this.current_payload);
        } else {
          return false;
        }
      }
    });
  }

  fnGetPersonalInformation(current_payload?) {
    const self = this;

    self.myAccountService.fnHttpGetPersonalIformation(current_payload).subscribe(r => {
      if (r.status == 200) {
        const data_personal_info = JSON.parse(JSON.stringify(r.body));
        this.personal_info_original = JSON.parse(JSON.stringify(r.body));
        this.personal_info = r.body;
      }
    }, err => {
    });
  }

  fnActivateEditState(state?) {
    this.state = (this.state === true) ? false : true;
  }
  
  fnActivateEditStatePassword(state_password?) {
    this.state_password = (this.state_password === true) ? false : true;
  }

  fnUpdateDataPersonalInformation(personal_info) {
    const self = this;
    self.submited_state = true;

    const objectForm = {
      'tFirstName': personal_info.tFirstName,
      'tLastName': personal_info.tLastName,
      'tEmail': personal_info.tEmail,
    };
    self.myAccountService.fnHttpSetUpdateMyAccountDataUser(objectForm).subscribe(r => {
      if (r.status === 200) {
        // self.headerComponent.fnSetDataUser(personal_info.tFirstName + ' ' + personal_info.tLastName);
        // HeaderComponent.prototype.fnSetDataUser(personal_info.tFirstName + ' ' + personal_info.tLastName);
        self.submited_state = false;
        self.fnActivateEditState();
        self.fnGetPersonalInformation(this.current_payload);
        self.messages_success = [{
          'state': 'Success',
          'color': 'success',
          'description': 'Your password has been reset successfully',
        }];
      } else {
        self.submited_state = false;
        self.messages_error = [{
          'state': 'Error',
          'color': 'danger',
          'description': 'New error',
        }];
      }
    }, err => {
      self.submited_state = false;
      self.messages_error = [{
        'state': 'Error',
        'color': 'danger',
        'description': 'New error',
      }];
    });
  }

  fnCancelEditPersonalInformation() {
    this.personal_info = JSON.parse(JSON.stringify(this.personal_info_original));
    this.state = true;
  }

  fnUpdatePasswordUser(change_password) {
    const self = this;
    self.submited_state_password = true;
    self.state_password = true;

    const objectForm = {
      'tCurrentPassword': change_password.tCurrentPassword,
      'tPassword': change_password.tPassword,
      'tConfirmPassword': change_password.tConfirmPassword,
    };
    self.myAccountService.fnHttpSetUpdatePasswordUser(objectForm).subscribe(r => {
      if (r.status === 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Password has been update successfully!', 'nb-checkmark');
        this.utilitiesService.fnDestroySessionData( function(res_clean_session) {
        });
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 3000);  // 5s

        self.change_password = {};
        self.submited_state_password = false;
        self.state_password = false;
        // self.fnActivateEditState();
        // self.fnGetPersonalInformation(this.current_payload);

        self.messages_success = [{
          'state': 'Success',
          'color': 'success',
          'description': 'Your password has been reset successfully',
        }];
      }

      if (r.status == 206) {
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.change_password = {};
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        self.submited_state_password = false;
        self.state_password = false;
        self.messages_error = [{
          'state': 'Error',
          'color': 'danger',
          'description': 'New error',
        }];
      }
      // else {
      //   self.submited_state_password = false;
      //   self.state_password = false;
      //   self.messages_error = [{
      //     'state': 'Error',
      //     'color': 'danger',
      //     'description': 'New error',
      //   }];
      // }
    }, err => {
      self.submited_state_password = false;
      self.state_password = false;
      self.messages_error = [{
        'state': 'Error',
        'color': 'danger',
        'description': 'New error',
      }];
    });
  }

  fnCancelEditChangePassword() {
    this.change_password = {};
    // this.state_password = true;
  }

}
