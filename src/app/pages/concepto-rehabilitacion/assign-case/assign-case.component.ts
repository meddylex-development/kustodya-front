import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-assign-case',
  templateUrl: './assign-case.component.html',
  styleUrls: ['./assign-case.component.scss']
})
export class AssignCaseComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null; 
  public patientData: any = null;
  public submitted: boolean = false;
  public state: any = {};
  public collectionDoctors: any = [];
  public collectionDoctorsOriginal: any = [];
  public doctorAssign: any = null;
  public dataDoctor: any = null;
  public priorityCase: number = 1;
  
  constructor(
    protected ref: NbDialogRef<AssignCaseComponent>,
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
      this.fnGetListDoctorsCases(this.token).then((response) => {
        console.log('response: ', response);
        if (response) {
          let dataDoctors = response['body']['TareasMedicos'];
          dataDoctors.forEach(element => {
            console.log('element: ', element);
            element['doctor'] = '(' + element['cantidad'] + ') - ' + element['numeroDocumento'] + ' - ' + element['nombres'];
            //this.collectionDoctors.push(element);
            // console.log('this.collectionDoctors: ', this.collectionDoctors);
          });
          this.collectionDoctors = dataDoctors;
          // this.collectionDoctors = response['body']['TareasMedicos'];
          this.collectionDoctorsOriginal = response['body']['TareasMedicos'];
        } else {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          // this.dismiss(false);
        }
      }).catch((err) => {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.dismiss(false);
      });

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnGetUsersEntity(token, id_entity, obj_data) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetUsersEntity(token, id_entity, obj_data).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetListDoctorsCases(token) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpGetListDoctorsCases(token).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnSelectDoctorAssign(data) {
  }

  fnAssignCase(doctorAssign, priorityCase) {
    console.log('doctorAssign: ', doctorAssign);
    let dataUpdate = {
      "id": this.dataCase['Id'],
      "usuarioAsignadoId": doctorAssign['iIDUsuario'],
      "prioridad": priorityCase,
    };
    console.log('dataUpdate: ', dataUpdate);
    this.fnSetAssignCaseDoctor(this.token, dataUpdate).then((response) => {
      if (response) {
        this.utilitiesService.showToast('top-right', 'success', 'Caso asignado satisfactoriamente!');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.dismiss(false);
      }
    }).catch((err) => {
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      this.dismiss(false);
    });
    
  }

  fnSetAssignCaseDoctor(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetAssignCase(token, dataUpdate).subscribe((response) => {
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
