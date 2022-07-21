import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { UserService } from '../../../shared/api/services/user.service';
import { RethusService } from '../../../shared/api/services/rethus.service';
import { AyudaComponent } from '../ayuda/ayuda.component';
declare var $: any;

@Component({
  selector: 'ngx-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  public collectionDocumentTypes:any = [
    // { 'id': 1, 'nombre': 'Cedula de ciudadania' },
    // { 'id': 2, 'nombre': 'Cedula de extrangeria' },
    // { 'id': 3, 'nombre': 'NIT' },
    // { 'id': 4, 'nombre': 'Pasaporte' },
    // { 'id': 5, 'nombre': 'Tarjeta de idenditas' },
  ];

  public documentTypePatient: any = null;
  public documentNumberPatient: any = '63324967';
  // public documentTypePatient: any = null;
  // public documentNumberPatient: any = '';
  public token: any;
  public patientData: any = null;
  // public search: boolean = false;
  public loading: boolean = false;
  public showTitleSearch: boolean = false;
  public documentTypeSelected: any = '';
  public html: any = '';
  public totalItems: any = 0;
  public patientIncapacities: any = '';
  public dataDoctor: any = '';
  public flagShowAlertUser: boolean = false;
  public dataUserSpecialist: any = '';
  public errors: string[] = [];
  public dataMetrics: any = null;
  public dataUserPatient: any = null;
  public dataEmlployerPatient: any = null;
  public userData: any = null;

  public objectDataUser: any = null;
  public flagSpinner: boolean = false;
  public textSpinner: string = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private userService: UserService, 
    private rethusService: RethusService, 
    private authService: NbAuthService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    /* **** START - JQuery definition **** */
    $(document).ready(function () {
      // $('.btn-show-search-form').click(); // Emulate click display right sidebar to hide
    });
    /* **** END - JQuery definition **** */
    this.flagSpinner = true;
    this.textSpinner = "Cargando...";
    this.utilitiesService.fnAuthValidUser().then(response => {
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      let data = this.utilitiesService.fnGetDataShare();
      this.token = response['token'];
      this.userData = response['user'];

      this.collectionDocumentTypes = null;
      this.patientData = null;
      this.documentTypeSelected = null;
      this.patientIncapacities = null;
      this.totalItems = 0;
      // this.fnClearFormSearchPatient();
      this.fnGetDocumentTypes(this.token);
      const user_id = this.userData['UserId'];

      let dataObject = {
        "idUsuario": user_id,
      };
      this.fnGetDataSpecialist(this.token, dataObject).then((response) => {
        if (response) {
          this.objectDataUser = response['body']['informacionUsuarios'][0];
          this.flagSpinner = false;
          this.textSpinner = "";
          let numeroIdentificacion = this.objectDataUser['numeroDocumento'];
          this.fnValidUserRethus(this.token, numeroIdentificacion);
        } else {
          this.flagShowAlertUser = true;
          this.dataUserSpecialist = null
        }
      }).catch((err) => {
        this.flagShowAlertUser = true;
        this.dataUserSpecialist = null
      });

    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      });
    });
  }

  fnShowContent(nameClass) {
    $('.' + nameClass).slideToggle();
  }

  fnSearchPatient($event) {
    this.utilitiesService.fnSetDataShare(null);
    // this.totalItems = 0;
    // return false;
    this.flagSpinner = true;
    this.textSpinner = "Buscando información paciente...";
    if (this.documentNumberPatient != undefined &&
      this.documentNumberPatient != "" &&
      this.documentTypePatient != undefined &&
      this.documentTypePatient != "") {

        this.fnGetDataPatientMetrics(this.token, this.documentTypePatient, this.documentNumberPatient).then((response) => {
          if (response) {
            let dataMetrics = response['body'];
            this.dataMetrics = (dataMetrics.length > 0) ? dataMetrics[0] : null;  
          } else {
            this.dataMetrics =  null;
          }
        });
        this.fnGetDataUserPatient(this.token, this.documentTypePatient, this.documentNumberPatient).then((response) => {
          if (response) {
            let dataUserPatient = response['body'];
            this.dataUserPatient = (dataUserPatient.length > 0) ? dataUserPatient[0] : null;
            this.dataUserPatient['arl'] = {
              "tNombre": this.dataUserPatient['arl'],
              "tipoAfiliacionArl": {
                "tNombre": "Cotizante activo",
              }
            };
            this.dataUserPatient['afp'] = {
              "tNombre": this.dataUserPatient['afp'],
              "tipoAfiliacionFondoPensiones": {
                "tNombre": "Cotizante activo",
              }
            };
            this.flagSpinner = false;
            this.textSpinner = "";
          } else {
            this.dataUserPatient =  null;
            this.flagSpinner = false;
            this.textSpinner = "";
          }
        });
        this.fnGetDataEmployerPatient(this.token, this.documentTypePatient, this.documentNumberPatient).then((response) => {
          if (response) {
            let dataEmlployerPatient = response['body'];
            this.dataEmlployerPatient = (dataEmlployerPatient.length > 0) ? dataEmlployerPatient : [];  
          } else {
            this.dataEmlployerPatient =  [];
          }
        });

        // this.fnGetPatientByDocumentNumber(this.token, this.documentNumberPatient, this.documentTypePatient).then((resp) => {
        //   if(resp) {
        //     this.patientData = resp;
        //     this.patientData['arl'] = {
        //       "tNombre": this.dataUserPatient['arl'],
        //       "tipoAfiliacionArl": {
        //         "tNombre": "Cotizante activo",
        //       }
        //     };
        //     this.patientData['afp'] = {
        //       "tNombre": this.dataUserPatient['afp'],
        //       "tipoAfiliacionFondoPensiones": {
        //         "tNombre": "Cotizante activo",
        //       }
        //     };
        //     this.flagSpinner = false;
        //     this.textSpinner = "";
        //     // this.patientData;
        //     // this.fnGetDiagnosicosIncapacidadByPaciente(this.token, this.patientData['iIdpaciente']).then((response) => {
        //     //   if (response) {
        //     //     this.flagSpinner = false;
        //     //     this.textSpinner = "";
        //     //     this.patientIncapacities = response['patientIncapacities'];
        //     //     this.totalItems = response['totalItems'];
        //     //     this.utilitiesService.fnSetDataShare({ 
        //     //       patientData: this.patientData, 
        //     //       patientIncapacities: this.patientIncapacities, 
        //     //       collectionDocumentTypes: this.collectionDocumentTypes, 
        //     //       documentNumberPatient: this.documentNumberPatient, 
        //     //       documentTypePatient: this.documentTypePatient, 
        //     //       documentTypeSelected: this.documentTypeSelected,
        //     //     });
        //     //   } else {
        //     //     this.patientIncapacities = [];
        //     //     this.totalItems = 0;
        //     //   }
        //     // });
        //   } else {
        //     this.patientData = null;
        //     this.flagSpinner = false;
        //     this.textSpinner = "";
        //   }
        // }).catch((error) => {
        //   this.patientData = [];
        // });

    } else {
      this.flagSpinner = false;
      this.textSpinner = "";
    }
  }

  fnGetDataPatientMetrics(token, type_document, document_number) {
    return new Promise((resolve, reject) => {
      let objectData = {
        'NumeroDocumento': document_number,
        'TipoDoc': type_document,
      }
      this.incapacityService.fnHttpGetDataUser(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    })
  }

  fnGetDataUserPatient(token, type_document, document_number) {
    return new Promise((resolve, reject) => {
      let objectData = {
        'NumeroDocumento': document_number,
        'TipoDoc': type_document,
      }
      this.incapacityService.fnHttpGetDataUserPatient(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    })
  }

  fnGetDataEmployerPatient(token, type_document, document_number) {
    return new Promise((resolve, reject) => {
      let objectData = {
        'NumeroDocumento': document_number,
        'TipoDoc': type_document,
      }
      this.incapacityService.fnHttpGetDataEmployerPatient(token, objectData).subscribe(response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          resolve(false);
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    })
  }

  fnGetPatientByDocumentNumber(token, documentNumberPatient, documentTypePatient) {
    return new Promise ((resolve,reject) => {
      // const self = this;
      this.patientData = null;
      this.incapacityService.fnHttpGetPacienteByNumeroDocumento(token, documentNumberPatient.trim(), documentTypePatient).subscribe(r => {
        if (r.status == 200) {
          if (r.body != null) {
            this.utilitiesService.showToast('bottom-right', 'success', 'Se han encontrado los datos del paciente', '');
            this.fnShowContent('search-form');
            // $('.content-patient-info').slideToggle();;
            // this.search = false;
            this.showTitleSearch = true;
            this.patientData = JSON.parse(JSON.stringify(r.body));
            resolve(this.patientData);
          } else {
            resolve(false);
            // this.search = false;
            this.documentNumberPatient = '';
            this.documentTypePatient = null;
            this.utilitiesService.showToast('bottom-right', 'danger', 'No se encuentra el número de documento!"', 'nb-alert');
          }
        }
        if (r.status == 206) {
          resolve(false);
          // this.search = false;
          this.documentNumberPatient = '';
          this.documentTypePatient = null;
          // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
          // this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        reject(false);
        // this.search = false;
        this.utilitiesService.showToast('top-right', '', 'Error consultando el paciente!');
      });
    });
  }

  fnGetDiagnosicosIncapacidadByPaciente(token, idPaciente) {
    return new Promise((resolve, reject) => {
      let patientIncapacities;
      let totalItems = 0;
      this.incapacityService.fnHttpGetDiagnosicosIncapacidadByPaciente(token, idPaciente).subscribe(r => {
        if (r.status == 200) {
          patientIncapacities = JSON.parse(JSON.stringify(r.body));
          if (patientIncapacities) {
            patientIncapacities.forEach((value, key) => {
              value.cie10.forEach((cievalue, ciekey) => {
                if (cievalue.iIdtipoCie === 1) {
                  value['cie10_diagnotic'] = cievalue;
                }
              });
            });
          } else {
            patientIncapacities = [];
          }
          totalItems = (patientIncapacities) ? patientIncapacities.length : 0;
          resolve({'patientIncapacities': patientIncapacities, 'totalItems': totalItems });
        } else if (r.status == 206) {
          // this.search = false;
          resolve(false);
          // const error = this.utilitiesService.fnSetErrors(r.body.codMessage)[0];
          // this.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        }
      }, err => {
        reject(false);
        //this.search = false;
        // this.utilitiesService.showToast('top-right', '', 'Error consultado el historial de incapacidades!');
      });
    });
  }

  fnGetDocumentTypes(token) {
    // this.errors = [];
    // this.search = true;
    this.incapacityService.fnHttpGetTiposIdentificacion(token).subscribe((result) => {
      // this.submitted = false;
      if (result.status == 200) {
        this.collectionDocumentTypes = result.body;//.slice(1, 100);
        // let new_item: any = { iIdOrigenIncapacidad: -1, tOrigenIncapacidad: '' };
        // this.collectionDocumentTypes.unshift(new_item);
        // this.documentTypePatient = this.collectionDocumentTypes[0];
      } else {
        this.utilitiesService.showToast('bottom-right', 'danger', 'Se presento un error consultando los tipos de identificación', 'nb-alert');
      }
      // this.submitted = false;
    }, error => {
      this.utilitiesService.showToast('bottom-right', 'danger', 'Ocurrio un error', 'nb-alert');
      // this.submitted = false;
    });
  }

  fnSelectDocumentType($event) {
    this.documentTypeSelected = $event;
  }
  
  fnClearFormSearchPatient() {
    this.flagSpinner = false;
    this.textSpinner = "";
    this.documentNumberPatient = '';
    this.documentTypePatient = null;
    this.patientData = null;
    this.utilitiesService.fnSetDataShare(null);
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    // this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
    let dataSend = {};
    dataSend['data'] = { module: moduleName, column: columnName, title:title, description: description };
    this.dialogService.open(AyudaComponent, { context: dataSend }).onClose.subscribe((res) => {
    });
  }

  fnRedirectViewPatientIncapacitiesHistory() {
    this.dataUserPatient['iIdpaciente'] = this.dataUserPatient['iIDPaciente'];
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.dataUserPatient, 
      patientIncapacities: this.patientIncapacities, 
      collectionDocumentTypes: this.collectionDocumentTypes, 
      documentNumberPatient: this.documentNumberPatient, 
      documentTypePatient: this.documentTypePatient, 
      documentTypeSelected: this.documentTypeSelected,
      dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/historico');
  }

  fnRedirectGeneratePatientIncapacity() {
    this.dataUserPatient['iIdpaciente'] = this.dataUserPatient['iIDPaciente'];
    this.utilitiesService.fnSetDataShare({ 
      patientData: this.dataUserPatient, 
      patientIncapacities: this.patientIncapacities, 
      collectionDocumentTypes: this.collectionDocumentTypes, 
      documentNumberPatient: this.documentNumberPatient, 
      documentTypePatient: this.documentTypePatient, 
      documentTypeSelected: this.documentTypeSelected,
      dataUserSpecialist: this.dataUserSpecialist,
    });
    this.utilitiesService.fnNavigateByUrl('pages/incapacidad/generar-certificado/' + this.dataUserPatient['iIDPaciente']);
  }

  fnGetDoctorRethusByDNI(token, document_type, document_number) {
    // Instancia de conexion servicio
    return new Promise((resolve, reject) => {
      this.rethusService.fnHttpGetListDoctorsRethusByDNI(token, document_type, document_number, '', '').subscribe(response => {
          resolve(response);
      }, err => {
          reject(err);
      });
    });
  }

  fnGetDataUserById(token, user_id) {
    // Instancia de conexion servicio
    // this.loading_state = true;
    return new Promise((resolve, reject) => {
      this.userService.fnHttpGetDataUserById(token, user_id).subscribe(response => {
        if (response.status == 200) {
          let data_user_full = JSON.parse(JSON.stringify(response['body']));
          let data_list = JSON.parse(JSON.stringify(response['body']['correos']));
          let data_list_original = JSON.parse(JSON.stringify(response['body']['correos']));
          // this.loading_state = false;
          resolve(data_user_full);
        } else {
          let data_list = [];
          resolve(false);
          // this.loading_state = false;
        }
      }, err => {
        resolve(new Error(err));
          this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
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

  fnValidUserRethus(token, numeroIdentificacion){
    this.fnGetDoctorRethusByDNI(token, 1, numeroIdentificacion).then((responseRethus) => {
      if (responseRethus['body'].length > 0) {

        this.fnGetDoctorRethusByDNI(token, 'CC', numeroIdentificacion).then((responseRethusDetail) => {
          if (responseRethusDetail['body']) {
            this.dataUserSpecialist = responseRethusDetail['body'];
            let tipoPorgrama = this.dataUserSpecialist['detalles'][0]['tipoProgramaOrigen'];
            if(tipoPorgrama == 'AUX' || tipoPorgrama == 'TCP' || tipoPorgrama == 'TEC') {
              this.flagShowAlertUser = true;
            } else {
              this.flagShowAlertUser = false;
            }
          } 
        });
      } else {
        this.flagShowAlertUser = true;
        this.dataUserSpecialist = null
      }
    });
  }

}
