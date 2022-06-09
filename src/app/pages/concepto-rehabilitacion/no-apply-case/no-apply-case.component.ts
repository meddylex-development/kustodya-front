import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-no-apply-case',
  templateUrl: './no-apply-case.component.html',
  styleUrls: ['./no-apply-case.component.scss']
})
export class NoApplyCaseComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null; 
  public patientData: any = null;
  public submitted: boolean = false;
  public dataCaseCancel: any = null;
  public cancelCaseDescription: any = null;
  public dataDoctor: any = null;
  public cancelType: any = null;
  public collectionCancelTypes: any = [
    { 'id': 1, 'name': 'CON PCL PENSIÓN' },
    { 'id': 2, 'name': 'DESAFILIADO' },
    { 'id': 3, 'name': 'DX ATEL' },
    { 'id': 4, 'name': 'NO CUMPLE DÍAS' },
    { 'id': 5, 'name': 'REVISIÓN' },
    { 'id': 6, 'name': 'SEGUIMIENTO' },
    { 'id': 7, 'name': 'SIN AFP' },
  ];
  
  constructor(
    protected ref: NbDialogRef<NoApplyCaseComponent>,
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
      console.log('this.dataCase: ', this.dataCase);

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnCancelCase(dataCaseCancel) {
    this.submitted = true;
    console.log('dataCaseCancel: ', dataCaseCancel);
    let dataUpdate = {
      "id": this.dataCase['Id'],
      "causalAnulacion": dataCaseCancel,
    };
    console.log('this.dataCase: ', this.dataCase);
    console.log('dataUpdate: ', dataUpdate);
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

  fnSelectCancelType(event) {
    console.log('event: ', event);
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
