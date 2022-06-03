import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.scss']
})
export class PatientInformationComponent implements OnInit {

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
  public btnInfo: number = 1;
  
  constructor(
    protected ref: NbDialogRef<PatientInformationComponent>,
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
      // let objDataSend = {
      //   //"entidadId": 1,
      //   //"busqueda": 1,
      //   "perfil": 46,
      //   "pagina": 1,
      // };
      // this.fnGetUsersEntity(this.token, 1, objDataSend).then((response) => {
      //   if (response) {
      //     this.collectionDoctors = response['body']['usuariosOutputModel'];
      //     this.collectionDoctorsOriginal = response['body']['usuariosOutputModel'];
      //   } else {
      //     this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      //     // this.dismiss(false);
      //   }
      // }).catch((err) => {
      //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      //   this.dismiss(false);
      // });

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

  fnSelectDoctorAssign(data) {
  }

  fnAssignCase(doctorAssign, priorityCase) {
    let dataUpdate = {
      "id": this.dataCase['idpacienteporemitir'],
      "usuarioAsignadoId": doctorAssign['id'],
      "prioridad": priorityCase,
    };
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
