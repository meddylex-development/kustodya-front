import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from "../../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-delete-administrator',
  templateUrl: './delete-administrator.component.html',
  styleUrls: ['./delete-administrator.component.scss']
})
export class DeleteAdministratorComponent implements OnInit {

  @Input() entity_admin_data;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(
    protected ref: NbDialogRef<DeleteAdministratorComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem("token");
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.current_payload = params.token;
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });
  }

  fnSetDeleteEntityAdmin(admin_data) {
    this.dismiss();
  }

  fnCancelDeleteEntityAdmin() {
    this.submitted = false;
    this.dismiss();
  }
  
  dismiss() {
    this.ref.close();
  }

}
