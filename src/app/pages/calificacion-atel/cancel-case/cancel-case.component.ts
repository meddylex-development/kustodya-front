import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-cancel-case',
  templateUrl: './cancel-case.component.html',
  styleUrls: ['./cancel-case.component.scss']
})
export class CancelCaseComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null; 
  public patientData: any = null;
  public submitted: boolean = false;
  public dataCaseCancel: any = null;
  public cancelCaseDescription: any = null;
  public dataDoctor: any = null;
  
  constructor(
    protected ref: NbDialogRef<CancelCaseComponent>,
    private utilitiesService: UtilitiesService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.utilitiesService.fnAuthValidUser().then(response => {
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      let data = this.utilitiesService.fnGetDataShare();
      this.token = response['token'];
      this.userData = response['user'];
      // this.dataCase

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnCancelCase(dataCaseCancel) {
    this.submitted = true;
    let dataUpdate = {
      "id": this.dataCase['idpacienteporemitir'],
      "causalAnulacion": dataCaseCancel,
    };
    this.fnSetCancelCaseDoctor(this.token, dataUpdate).then((response) => {
      if (response) {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', 'Caso anulado satisfactoriamente!');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.dismiss(false);
      }
    }).catch((err) => {
      this.submitted = false;
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      this.dismiss(false);
    });
    
  }

  fnSetCancelCaseDoctor(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetCancelCase(token, dataUpdate).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelData() {
    // this.submitted = false;
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
