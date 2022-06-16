import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';

@Component({
  selector: 'ngx-specialist-information',
  templateUrl: './specialist-information.component.html',
  styleUrls: ['./specialist-information.component.scss']
})
export class SpecialistInformationComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null;
  public patientData: any = null;
  public submitted: boolean = false;
  public state: any = {};
  public objectDataUser: any = null;
  public objectDataUserOriginal: any = null;
  public doctorAssign: any = null;
  public dataDoctor: any = null;
  public priorityCase: number = 1;
  public btnInfo: number = 1;
  public loading: boolean = false;
  public textSpinner: string = "Cargando...";
  
  constructor(
    protected ref: NbDialogRef<SpecialistInformationComponent>,
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
      this.loading = true;
      let dataObject = {
        "idUsuario": this.dataCase['idMedicoAsignado']
      };
      this.fnGetDataSpecialist(this.token, dataObject).then((response) => {
        console.log('response: ', response);
        if (response) {
          this.objectDataUser = response['body']['informacionUsuarios'][0];
          console.log('this.objectDataUser: ', this.objectDataUser);
          this.objectDataUserOriginal = response['body']['informacionUsuarios'][0];
          this.loading = false;
        } else {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          this.loading = false;
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

  GetDataUserById(token, id_user) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUserById(token, id_user).subscribe((response) => {
        if (response['status'] == 200) {
          resolve(response);
        } else {
          reject(false);
        }
      });
    });
  }

  fnGetDataSpecialist(token, data_object) {
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataSpecialist(token, data_object).subscribe((response) => {
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
