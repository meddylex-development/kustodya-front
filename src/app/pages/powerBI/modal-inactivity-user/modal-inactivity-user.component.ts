import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../../@core/utils';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ReportsService } from '../../../shared/api/services/reports.service';

@Component({
  selector: 'ngx-modal-inactivity-user',
  templateUrl: './modal-inactivity-user.component.html',
  styleUrls: ['./modal-inactivity-user.component.scss'],
})
export class ModalInactivityUserComponent implements OnInit {

  @Input() data_alert: any;
  current_payload: string = null;
  submitted: Boolean = false;
  token: any = null;
  user_id: any = null;

  constructor(
    protected stateService: StateService,
    public router: Router,
    private utilitiesService: UtilitiesService,
    private reportsService: ReportsService,
    protected ref: NbDialogRef<ModalInactivityUserComponent>,
  ) { }

  ngOnInit() {
    const self = this;
    // self.data_alert
    const payload = sessionStorage.getItem("token");
    const user_id = sessionStorage.getItem('user_id');
    if (!payload) {
      // self.router.navigateByUrl('');
    } else {
      self.token = payload;
      self.user_id = user_id;
    }
  }

  fnSendConfirmRegisterUseReport() {
    // this.data_search
    const self = this;
    self.submitted = true;
    self.fnSetRegisterUseReport(function(resp) {
      if (resp.status == 200) {
        self.submitted = false;
      } else {
        self.submitted = false;
      }
    });
  }

  fnSetRegisterUseReport(callback) {
    // Instancia de conexion servicio
    this.reportsService.fnHttpRegisterUseReport(this.token).subscribe(response => {
        callback(response);
    }, err => {
        callback(err);
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelViewShowReport() {
    this.dismiss();
  }

}
