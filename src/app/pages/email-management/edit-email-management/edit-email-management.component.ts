import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { EmailManagementService } from '../../../shared/api/services/email-management.service';

@Component({
  selector: 'ngx-edit-email-management',
  templateUrl: './edit-email-management.component.html',
  styleUrls: ['./edit-email-management.component.scss']
})
export class EditEmailManagementComponent implements OnInit {

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
    protected ref: NbDialogRef<EditEmailManagementComponent>,
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

  fnEditDataUserManagement(user_data) {
    this.submitted = true;
    const data_object = {
      'iId': user_data['iId'],
      'tPrimerNombre': user_data['tPrimerNombre'],
      'tSegundoNombre': user_data['tSegundoNombre'],
      'tPrimerApellido': user_data['tPrimerApellido'],
      'tSegundoApellido': user_data['tSegundoApellido'],
      'tEmail': user_data['tEmail'],
      'tNombreEmpresa': user_data['tNombreEmpresa'],
      'tCargo': user_data['tCargo'],
      'bActivo': user_data['bActivo'],
      'iidips': this.ips['iIdips'],
    };
    this.emailManagementService.fnHttpSetEditDataUserManagement(this.current_payload, this.ips['iIdips'], user_data['iId'], data_object).subscribe(r => {
      if (r.status == 200) {
        this.user_data = {};
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', 'Usuario actualizado satisfactoriamente!');
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
