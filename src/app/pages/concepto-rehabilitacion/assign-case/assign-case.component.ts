import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';

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
  public collectionDoctors: any = [
    {
      "id": 121,
      "tipoIdentificacion": 9,
      "numeroIdentificacion": "1111122222",
      "primerNombre": "German",
      "segundoNombre": "Eduardo",
      "primerApellido": "Pinilla",
      "segundoApellido": "Rubiano",
      "nombreCompleto": "German Eduardo Pinilla Rubiano",
      "sexo": "1",
      "fechaNacimiento": 28800000,
      "perfil": 46,
      "esMedico": true,
      "registroMedico": "11111222223",
      "otrosTratamientos": false,
      "activo": true,
      "correo": "gpinilladev@gmail.com",
    }
  ];
  public collectionDoctorsOriginal: any = [
    {
      "id": 121,
      "tipoIdentificacion": 9,
      "numeroIdentificacion": "1111122222",
      "primerNombre": "German",
      "segundoNombre": "Eduardo",
      "primerApellido": "Pinilla",
      "segundoApellido": "Rubiano",
      "nombreCompleto": "German Eduardo Pinilla Rubiano",
      "sexo": "1",
      "fechaNacimiento": 28800000,
      "perfil": 46,
      "esMedico": true,
      "registroMedico": "11111222223",
      "otrosTratamientos": false,
      "activo": true,
      "correo": "gpinilladev@gmail.com",
    }
  ];
  public doctorAssign: any = null;
  public incapacityStatus: any = null;
  public dataAccountingBasicInfo: any = {};
  public idContabilidad: string = '';
  public dataDoctor: any = null;
  public priorityCase: number = 1;
  
  constructor(
    protected ref: NbDialogRef<AssignCaseComponent>,
    private utilitiesService: UtilitiesService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
  ) { }

  ngOnInit(): void {
    this.utilitiesService.fnAuthValidUser().then(response => {
      console.log('dataCase: ', this.dataCase);
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      console.log('this.dataDoctor: ', this.dataDoctor);
      let data = this.utilitiesService.fnGetDataShare();
      console.log('data: ', data);
      this.token = response['token'];
      console.log('this.token: ', this.token);
      this.userData = response['user'];
      console.log('this.userData: ', this.userData);
    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
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

  fnSelectDoctorAssign(data) {
    console.log('data: ', data);
  }

  fnAssignCase(doctorAssign, priorityCase) {
    console.log('doctorAssign: ', doctorAssign);
    console.log('priorityCase: ', priorityCase);
    // /api/K2ConceptoRehabilitacion/AsignarTarea
    let dataUpdate = {
      "id": this.dataCase['idpacienteporemitir'],
      "usuarioAsignadoId": doctorAssign['id'],
      "prioridad": priorityCase,
    };
    console.log('dataUpdate: ', dataUpdate);
    this.fnSetAssignCaseDoctor(this.token, dataUpdate).then((response) => {
      if (response) {
        console.log('response: ', response);
        this.utilitiesService.showToast('top-right', 'success', 'Caso asignado satisfactoriamente!');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.dismiss(false);
      }
    }).catch((err) => {
      console.log('err: ', err);
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

}
