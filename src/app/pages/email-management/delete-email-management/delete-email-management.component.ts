import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { EmailManagementService } from '../../../shared/api/services/email-management.service';

@Component({
  selector: 'ngx-delete-email-management',
  templateUrl: './delete-email-management.component.html',
  styleUrls: ['./delete-email-management.component.scss']
})
export class DeleteEmailManagementComponent implements OnInit {

  @Input() data_user: any;
  current_payload: string = null;
  submitted: Boolean = false;
  token: any = null;
  user_id: any = null;

  constructor(
    protected stateService: StateService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private utilitiesService: UtilitiesService,
    protected ref: NbDialogRef<DeleteEmailManagementComponent>,
    private emailManagementService: EmailManagementService,
  ) { }

  ngOnInit() {
    // this.category_data.bAppliesComplementarityRelation = this.bAppliesComplementarityRelation;
    // this.category_data.iIDCategory = this.iIDCategory;
    // this.category_data.iIDVersion = this.iIDVersion;
    // this.category_data.tCategoryName = this.tCategoryName;
    // this.id_category = this.iIDCategory;

    // this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
    //   if (token.isValid()) {
    //     // here we receive a payload from the token and assigne it to our `user` variable
    //     this.current_payload = token.getValue();
    //   }
    // });
    const self = this;
    const payload = sessionStorage.getItem('payload');
    const user_id = sessionStorage.getItem('user_id');
    if (!payload) {
      self.router.navigateByUrl('');
    } else {
      self.token = payload;
      self.user_id = user_id;
    }
    // self.route.params.subscribe(params => {
    //   if (params.token) {
    //     self.token = params.token;
    //     // self.entity = params.entity;
    //     // if (params.cun && params.cun != 'null') {
    //     //   self.cun = params.cun;
    //     // }
    //     // self.fnGetAllDataUsersManagement(self.token, self.entity['iIdips']);

    //   } else {
    //     // self.router.navigateByUrl('');
    //   }
    // });
  }

  fnSetDeleteEmailManagementById() {
    this.submitted = true;
    this.emailManagementService.fnHttpSetDeleteDataUserManagement(this.token, this.data_user['id_ips'], this.data_user['iId']).subscribe(r => {
      if (r.status == 200) {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', 'Usuario eliminado correctamente!');
        this.dismiss();
      }
      if (r.status == 206) {
        this.submitted = false;
        // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
        this.utilitiesService.showToast('top-right', 'warning', 'Ocurio un error intentelo de nuevo', 'nb-alert');
      }
    }, err => {
    });
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelDeleteEmailManagement() {
    this.dismiss();
  }

}
