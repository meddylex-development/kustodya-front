import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-re-assign-case',
  templateUrl: './re-assign-case.component.html',
  styleUrls: ['./re-assign-case.component.scss']
})
export class ReAssignCaseComponent implements OnInit {

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
  public userAssign: any = null;
  public priorityCase: number = 1;
  public changeStatus: boolean = false
  
  constructor(
    protected ref: NbDialogRef<ReAssignCaseComponent>,
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
      // this.dataCase['usuarioAsignadoId']
      console.log('this.dataCase: ', this.dataCase);
      let objDataSend = {
        //"entidadId": 1,
        //"busqueda": 1,
        "perfil": 46,
        "pagina": 1,
      };

      this.fnGetDataUserByID(this.token, this.dataCase['usuarioAsignadoId']).then((respDataUser) => {
        console.log('respDataUser: ', respDataUser);
        if (respDataUser) {
          this.userAssign = respDataUser['body'];
          console.log('this.userAssign: ', this.userAssign);
        } else {
          this.dismiss();
        }
      });

      this.fnGetUsersEntity(this.token, 1, objDataSend).then((response) => {
        if (response) {
          let dataDoctorsFiltered = [];
          let collectionDoctors = response['body']['usuariosOutputModel'];
          collectionDoctors.forEach(element => {
            console.log('usuarioAsignadoId: ', this.dataCase['usuarioAsignadoId']);
            console.log('element: ', element['id']);
            if (this.dataCase['usuarioAsignadoId'] !== element['id']) {
              console.log("entro por aca");
              dataDoctorsFiltered.push(element);
              console.log('dataDoctorsFiltered: ', dataDoctorsFiltered);
            }
          });
          this.collectionDoctors = dataDoctorsFiltered;
          console.log('this.collectionDoctors: ', this.collectionDoctors);
          this.collectionDoctorsOriginal = response['body']['usuariosOutputModel'];
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

  fnGetDataUserByID(token, id_user) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUserById(token, id_user).subscribe(respList => {
        if (respList.status == 200) {
          resolve(respList);
        }
      }, err => {
        reject(false);
      });
    })
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

  fnReAssignCase(doctorAssign, priorityCase) {
    let dataUpdate = {
      "id": this.dataCase['idpacienteporemitir'],
      "usuarioAsignadoId": doctorAssign['id'],
      "prioridad": priorityCase,
    };
    this.fnSetReAssignCaseDoctor(this.token, dataUpdate).then((response) => {
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

  fnSetReAssignCaseDoctor(token, dataUpdate) {
    return new Promise((resolve, reject) => {
      this.conceptoRehabilitacionService.fnHttpSetReAssignCase(token, dataUpdate).subscribe((response) => {
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
