import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EmailManagementService } from '../../../shared/api/services/email-management.service';

@Component({
  selector: 'ngx-add-email-management',
  templateUrl: './add-email-management.component.html',
  styleUrls: ['./add-email-management.component.scss']
})
export class AddEmailManagementComponent implements OnInit {

  @Input() data_user: any;
  submitted: boolean = false;
  current_payload: any = null;
  user_id: any = null;
  ips: any = null;
  user_data: any = {};

  list_options_show_complementarity_relation: any = [{ 'value': true, 'name': 'Yes' }, { 'value': false, 'name': 'No' }];

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private emailManagementService: EmailManagementService,
    protected ref: NbDialogRef<AddEmailManagementComponent>,
  ) { }

  ngOnInit() {
    this.current_payload = sessionStorage.getItem("token");
    this.user_id = sessionStorage.getItem('user_id');
    this.ips = JSON.parse(sessionStorage.getItem('ips'));
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelCreateNewEmailManagement() {
    this.submitted = false;
    this.dismiss();
  }

  fnCreateNewEmailManagement(user_data) {
    this.submitted = true;
    // const data_object = {
    //   'company_name': user_data.company_name,
    //   'email': user_data.email,
    //   'first_name': user_data.first_name,
    //   'last_name': user_data.last_name,
    //   'position': user_data.position,
    //   'second_last_name': user_data.second_last_name,
    //   'second_name': user_data.second_name,
    //   'state_user': true,
    //   'iidips': this.ips['iIdips'],
    // };
    const data_object = {
      'iId': 0,
      'tPrimerNombre': user_data.first_name,
      'tSegundoNombre': user_data.second_name,
      'tPrimerApellido': user_data.last_name,
      'tSegundoApellido': user_data.second_last_name,
      'tEmail': user_data.email,
      'tNombreEmpresa': user_data.company_name,
      'tCargo': user_data.position,
      'bActivo': true,
      'iidips': this.ips['iIdips'],
    };

    this.emailManagementService.fnHttpSetSaveNewUserManagement(this.current_payload, this.ips['iIdips'], data_object).subscribe(r => {
      if (r.status == 200) {
        this.user_data = {};
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', 'Category has been created successfully!');
        this.dismiss();
      }
      if (r.status == 206) {
        this.submitted = false;
        let error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
      }
    }, err => {
      this.submitted = false;
    });
  }

}
