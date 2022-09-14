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
    { 'id': 3583, 'name': 'CON PCL PENSIÓN' },
    { 'id': 3584, 'name': 'DESAFILIADO' },
    { 'id': 3585, 'name': 'DX ATEL' },
    { 'id': 3586, 'name': 'NO CUMPLE DÍAS' },
    { 'id': 3587, 'name': 'REVISIÓN' },
    { 'id': 3588, 'name': 'SEGUIMIENTO' },
    { 'id': 3589, 'name': 'SIN AFP' },
  ];
  public collectionDataSelectors: any = null;
  
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

      this.fnGetDataSelectors(this.token).then(response1 => {
        if (response1) {
          this.collectionDataSelectors = response1;
          console.log('this.collectionDataSelectors: ', this.collectionDataSelectors);
          this.collectionCancelTypes = response1['CausalNoAplica'];
          // this.letterDataConcept['afpPatient'] = this.dataConceptForm['iIDAfp'];
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error!', 'nb-alert');
        } 
      });

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnGetDataSelectors(token) {
    return new Promise ((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpGetDataSelectors(token).subscribe(result => {
        if (result.status == 200) {
          let collectionList = JSON.parse(JSON.stringify(result.body));
          resolve(collectionList);
        } else {
          this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando las sintomatologias', 'nb-alert');
          reject(false);
        }
        // this.submitted = false;
      }, error => {
        this.utilitiesService.showToast('bottom-right', 'danger', error, 'nb-alert');
        reject(error);
        // this.submitted = false;
      });
    })
  }

  fnNoApplyCase(dataCaseCancel) {
    this.submitted = true;
    let dataUpdate = {
      "id": this.dataCase['Id'],
      "tCausalNoAplica": dataCaseCancel,
      "iIDCausalNoAplica": this.cancelType['id'],
    };
    this.fnSetNoApplyCaseDoctor(this.token, dataUpdate).then((response) => {
      if (response) {
        this.submitted = false;
        this.utilitiesService.showToast('top-right', 'success', 'Caso actualizado satisfactoriamente!');
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

  fnSetNoApplyCaseDoctor(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetNoApplyCase(token, dataUpdate).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSelectCancelType(event) {
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
