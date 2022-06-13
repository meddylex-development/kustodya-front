import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import * as moment from 'moment';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { ConceptoRehabilitacionService } from '../../../shared/api/services/concepto-rehabilitacion.service';
import { UserService } from '../../../shared/api/services/user.service';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() dataCase: any;
  public token: string = '';
  public userData: any = null; 
  public patientData: any = null;
  public submitted: boolean = false;
  public state: any = {};
  public collectionDoctors: any = [];
  public collectionDoctorsOriginal: any = [];
  public documentTypePatient: any = null;
  public documentNumberPatient: any = '63324967';
  public dataDoctor: any = null;
  public priorityCase: number = 1;
  public collectionDocumentTypes:any = [];
  public loading: boolean = false;
  public searchStatus: number = 0;
  public textSpinner: string = "Cargando...";

  
  constructor(
    protected ref: NbDialogRef<AddComponent>,
    private utilitiesService: UtilitiesService,
    private conceptoRehabilitacionService: ConceptoRehabilitacionService,
    private userService: UserService,
    private incapacityService: IncapacityService,
  ) { }

  ngOnInit(): void {
    this.utilitiesService.fnAuthValidUser().then(response => {
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      this.token = response['token'];
      this.userData = response['user'];
      // this.dataCase
      this.loading = true;
      this.fnGetDocumentTypes(this.token).then((response) => {
        if (response) {
          this.collectionDocumentTypes = response["body"];
          this.loading = false;
        } else {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          this.loading = false;
          // this.dismiss(false);
        }
      }).catch((err) => {
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.loading = false;
        this.dismiss(false);
      });

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnGetDocumentTypes(token) {
    return new Promise((resolve, reject) => {
      this.incapacityService.fnHttpGetTiposIdentificacion(token).subscribe((result) => {
        if (result.status == 200) {
          // this.collectionDocumentTypes = result.body;//.slice(1, 100);
          // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
          // this.collectionDocumentTypes.unshift(new_item);
          // this.documentTypePatient = this.collectionDocumentTypes[0];
          resolve(result);
        } else {
          // this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
          reject(false);
        }
        // this.submitted = false;
      }, error => {
        // this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error', 'nb-alert');
        reject(false);
        // this.submitted = false;
      });
    });
  }

  fnSelectDocumentType(event) {
    console.log('event: ', event);
    this.searchStatus = 0;

  }

  fnSetCreateNewCase(token, data_object) {
    return new Promise ((resolve,reject) => {
      this.conceptoRehabilitacionService.fnHttpSetCreateNewCase(token, data_object).subscribe(r => {
        if (r.status == 200) {
          if (r.body != null) {
            resolve(r);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
      });
    });
  }

  fnSearchPatient(documentTypePatient, documentNumberPatient) {
    this.utilitiesService.fnSetDataShare(null);
    this.loading = true;
    this.textSpinner = "Buscando paciente...";
    if (this.documentNumberPatient != undefined &&
      this.documentNumberPatient != "" &&
      this.documentTypePatient != undefined &&
      this.documentTypePatient != "") {
        this.fnGetPatientByDocumentNumber(this.token, this.documentNumberPatient, this.documentTypePatient).then((response) => {
          console.log('response: ', response);
          if (response) {
            this.loading = false;
            this.patientData = response["body"];
            this.searchStatus = 1;
            this.textSpinner = "";
            // this.utilitiesService.showToast('top-right', 'success', 'Caso asignado satisfactoriamente!');
            // this.dismiss(true);
          } else {
            this.loading = false;
            this.searchStatus = 2;
            this.textSpinner = "";
            // this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
            // this.dismiss(false);
          }
        }).catch((err) => {
          this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
          this.dismiss(false);
        });
    }
    
  }

  fnGetPatientByDocumentNumber(token, documentNumberPatient, documentTypePatient) {
    return new Promise ((resolve,reject) => {
      this.incapacityService.fnHttpGetPacienteByNumeroDocumento(token, documentNumberPatient.trim(), documentTypePatient).subscribe(r => {
        if (r.status == 200) {
          if (r.body != null) {
            resolve(r);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
      });
    });
  }

  fnCreateNewCase(patientData) {
    console.log('patientData: ', patientData);
    this.loading = true;
    this.textSpinner = "Creando nuevo caso";
    let dataObject = {
      "pacienteId": patientData['iIdpaciente'],
      "prioridad": this.priorityCase,
    };
    this.fnSetCreateNewCase(this.token, dataObject).then((response) => {
      console.log('response: ', response);
      if(response) {
        this.loading = false;
        this.utilitiesService.showToast('top-right', 'success', 'Caso ha sido creado satisfactoriamente!');
        this.dismiss(true);
        this.textSpinner = "";
      } else {
        this.loading = false;
        this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
        this.dismiss(false);
        this.textSpinner = "";
      }
    }).catch((err) => {
      console.log('err: ', err);
      this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      this.dismiss(false);
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
