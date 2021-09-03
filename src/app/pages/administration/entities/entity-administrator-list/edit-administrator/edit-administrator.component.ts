import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from "../../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-administrator',
  templateUrl: './edit-administrator.component.html',
  styleUrls: ['./edit-administrator.component.scss']
})
export class EditAdministratorComponent implements OnInit {

  data_admin: any = {};
  collection_country: any = [];
  collection_address_type: any = [];
  submitted: boolean = false;
  required: boolean = true;


  constructor(protected ref: NbDialogRef<EditAdministratorComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private utilitiesService: UtilitiesService,) { }

  ngOnInit() {
  }

  fnUpdateAdministrator(admin_data) {

  }

  fnCancelUpdateAdministrator() {
    this.submitted = false;
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
