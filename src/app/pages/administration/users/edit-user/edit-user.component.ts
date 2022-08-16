import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
defineLocale('es', esLocale);

import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { EmailManagementService } from '../../../../shared/api/services/email-management.service';

import { UserService } from '../../../../shared/api/services/user.service';
import { ProfilesService } from '../../../../shared/api/services/profiles.service';
import { RethusService } from '../../../../shared/api/services/rethus.service';
import { EntityService } from '../../../../shared/api/services/entity.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  token: any = null;
  required: boolean = true;
  data_user_basic_info: any = {};
  collection_document_types: any = [];
  collection_genders: any = [];
  collection_profiles: any = [];
  collection_entities: any = [];
  loading_state: Boolean = false;

  data_doctor_info: any = {};
  data_doctor_details: any = [];
  search_data_load: boolean = false;
  state_search: boolean = false;
  submitted: boolean = false;
  user_type: any = 'admin_kustodya';

  @Output() flagCreateUser = new EventEmitter<number>();
  @Input() dataUser: any;

  colorTheme = 'theme-green';
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate = new Date();
  locale = 'es';
  isSuperAdmin: any = false;
  user_edit_id: number = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public profilesService: ProfilesService,
    public rethusService: RethusService,
    public entityService: EntityService,
    public utilitiesService: UtilitiesService,
    private bsLocaleService: BsLocaleService,
    // protected ref: NbDialogRef<AddUserComponent>,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready

    const self = this;
    self.bsLocaleService.use('es');
    // self.dataUser
    self.user_edit_id = self.dataUser['id'];

    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
        self.loading_state = true;
        self.fnGetDataUserToEdit(self.token, self.user_edit_id, response => {
          if (response['status'] === 200) {

            self.fnFormatDataUser(response['body']);

            self.fnGetListIdentificationTypes(self.token);
            self.fnGetListGenders(self.token);
            self.fnGetListProfiles(self.token).then((resProfiles) => {
              if (resProfiles) {
                this.collection_profiles = resProfiles['body'];
              }
            }).catch((err) => {
            });
            if (self.isSuperAdmin === 'true') {
              self.fnGetListEntitiesAdmin(self.token);
            } else {
              self.fnGetListEntities(self.token);
            }
            self.loading_state = false;
          } else {
            self.loading_state = false;
            self.router.navigateByUrl('');
            self.utilitiesService.showToast('top-right', 'fas fa-circle-notch', 'Ocurrio un error obteniendo los datos del usuario!');
          }
        });
      } else {
        self.router.navigateByUrl('');
        self.utilitiesService.showToast('top-right', 'fas fa-circle-notch', 'Ocurrio un error!');
      }
    });

  }

  fnGetDataUserToEdit(token, id_user, callback) {
    this.userService.fnHttpGetDataUserById(token, id_user).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnFormatDataUser(data_user) {

    const data_birth_date = moment(data_user['fechaNacimiento']).format('DD-MM-YYYY');

    const date_timestamp = moment(data_user['fechaNacimiento']).valueOf();

    const collection_data_entities = data_user['entidades'];
    const new_collection_data_entities = [];
    collection_data_entities.find(r => {
      new_collection_data_entities.push(r.id);
    });


    // this.data_user_basic_info = {};
    this.data_user_basic_info['document_type'] = data_user['tipoIdentificacion'];
    this.data_user_basic_info['document_number'] = data_user['numeroIdentificacion'];
    this.data_user_basic_info['first_name'] = data_user['primerNombre'];
    this.data_user_basic_info['second_name'] = data_user['segundoNombre'];
    this.data_user_basic_info['first_last_name'] = data_user['primerApellido'];
    this.data_user_basic_info['second_last_name'] = data_user['segundoApellido'];
    this.data_user_basic_info['email'] = data_user['correo'];
    this.data_user_basic_info['gender_type'] = parseInt(data_user['sexo'], 10);
    this.data_user_basic_info['birth_date'] = data_birth_date;
    this.data_user_basic_info['birth_date_timestamp'] = data_user['fechaNacimiento'];
    // this.data_user_basic_info['birth_date'] = data_user['fechaNacimiento'];
    this.data_user_basic_info['profile_type'] = data_user['perfil'];
    this.data_user_basic_info['entity'] = new_collection_data_entities;
    this.data_user_basic_info['isProfessionalDoctor'] = data_user['esMedico'];
    this.data_user_basic_info['medical_register'] = data_user['registroMedico'];
  }

  dismiss() {
    // this.ref.close();
  }

  fnCancelCreateNewEmailUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnSendFormBasicInfoUser(data_user_basic_info) {
    const self = this;
    self.submitted = false;
    // const objSendService = {
    //   'tipoIdentificacion': parseInt(data_user_basic_info['document_type']['id']),
    //   'numeroIdentificacion': data_user_basic_info['document_number'],
    //   'primerNombre': data_user_basic_info['first_name'],
    //   'primerApellido': data_user_basic_info['first_last_name'],
    //   'esMedico': false,
    //   'otrosTratamientos': false,
    //   'firma': '',
    // };


    const list_entities = data_user_basic_info['entity'];
    const list_entities_selected = [];
    list_entities.forEach((value, key) => {
      list_entities_selected.push({'id': value['id']});
    });

    // const date_collection_unix = moment(data_user_basic_info['birth_date']).unix();
    // const date_collection_valueof = moment(data_user_basic_info['birth_date']).valueOf();

    // const date_test = new Date(data_user_basic_info['birth_date']); // some mock date
    // const date_timestamp = moment(date_test).valueOf();

    // const date_timestamp = moment.utc(data_user_basic_info['birth_date']).valueOf();
    // const day = moment("25-12-1994");


    // let objSendService = {
    //   'id': self.user_edit_id,
    //   'tipoIdentificacion': parseInt(data_user_basic_info['document_type']),
    //   'numeroIdentificacion': data_user_basic_info['document_number'],
    //   'primerNombre': data_user_basic_info['first_name'],
    //   'segundoNombre': (data_user_basic_info['second_name']) ? data_user_basic_info['second_name'] : '',
    //   'primerApellido': data_user_basic_info['first_last_name'],
    //   'segundoApellido': (data_user_basic_info['second_last_name']) ? data_user_basic_info['second_last_name'] : '',
    //   'correo': (data_user_basic_info['email']) ? data_user_basic_info['email'] : '',
    //   'sexo':  parseInt(data_user_basic_info['gender_type']),
    //   'fechaNacimiento': 0,
    //   // 'fechaNacimiento': 0,
    //   'perfilId':  parseInt(data_user_basic_info['profile_type']),
    //   'esMedico': (data_user_basic_info['isProfessionalDoctor']) ? true : false,
    //   'registroMedico': (data_user_basic_info['medical_register']) ? data_user_basic_info['medical_register'] : '',
    //   'otrosTratamientos': false,
    //   'activo': true,
    //   'telefonos': [],
    //   'direcciones': [],
    //   'correos': [],
    //   'redesSociales': [],
    //   'epSs': [],
    //   'firma': '',
    //   'entidades': list_entities_selected,
    // };

    let objSendService = {
      "tipoIdentificacion": parseInt(data_user_basic_info['document_type']),
      "numeroIdentificacion": data_user_basic_info['document_number'],
      "primerNombre": data_user_basic_info['first_name'],
      "segundoNombre": (data_user_basic_info['second_name']) ? data_user_basic_info['second_name'] : '',
      "primerApellido": data_user_basic_info['first_last_name'],
      "segundoApellido": (data_user_basic_info['second_last_name']) ? data_user_basic_info['second_last_name'] : '',
      "sexo": parseInt(data_user_basic_info['gender_type']),
      "correo": data_user_basic_info['email'],
      "fechaNacimiento": 0,
      "perfilId": parseInt(data_user_basic_info['profile_type']),
      "esMedico": (data_user_basic_info['isProfessionalDoctor']) ? true : false,
      "registroMedico": (data_user_basic_info['medical_register']) ? data_user_basic_info['medical_register'] : '',
      "otrosTratamientos": false,
      "activo": true,
    }
    // return false;
    // this.data_search
    // const self = this;
    // self.search_data_load = true;
    // self.state_search = false;
    // self.data_doctor_details = [];
    // self.data_doctor_info = {};
    // if(self.data_search.document_type['id'] && self.data_search.document_number) {
      self.fnSetUpdateUser(objSendService, this.token, self.user_edit_id, function(response) {
        if (response.status == 204) {
          self.submitted = false;
          self.data_user_basic_info = {};
          self.fnShowGoBackList(1);
          self.utilitiesService.showToast('top-right', 'success', 'La información del usuario ha sido actualizada creado satisfactoriamente!', 'fas fa-check');
        } else {
          self.submitted = false;
          // self.data_user_basic_info = {};
          self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'fas fa-times');
        }
      });
    // }
  }

  fnSetUpdateUser(objectUser, token, user_id, callback) {
    // Instancia de conexion servicio
    this.userService.fnHttpSetUpdateDataUser(token, user_id, objectUser).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetDoctorRethusByDNI(document_type, document_number, callback) {
    // Instancia de conexion servicio
    this.rethusService.fnHttpGetListDoctorsRethusByDNI(this.token, document_type, document_number, null, null).subscribe(response => {
        callback(response);
    }, err => {
        callback(err);
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetListIdentificationTypes(token) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataTypeEnum(token, 'identificacion').subscribe(response => {
      if (response.status == 200) {
        this.collection_document_types = response['body'];
      } else {
        this.collection_document_types = response['body'];
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetListGenders(token) {
    // Instancia de conexion servicio
    this.userService.fnHttpGetDataTypeEnum(token, 'sexo').subscribe(response => {
      if (response.status == 200) {
        this.collection_genders = response['body'];
      } else {
        this.collection_genders = response['body'];
      }
    }, err => {
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetListProfiles(token) {
    return new Promise((resolve, reject) => {
      this.profilesService.fnHttpGetListProfilesK2(token).subscribe(response => {
        if (response.status == 200) {
          // this.collection_profiles = response['body']['perfiles'];
          // const obj_admin = response['body']['perfiles'][1];
          // const collection_profiles_admin = [];
          // collection_profiles_admin.push(obj_admin);
          // this.collection_profiles = collection_profiles_admin;
          // // this.data_user_basic_info['profile_type'] = 2;
          resolve(response);
        } else {
          // this.collection_profiles = [];
          reject(false);
        }
      }, err => {
        reject(false);
        // this.collection_profiles = [];
          // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
      });
    });
  }

  fnGetListEntities(token) {
    // Instancia de conexion servicio
    const self = this;
    self.collection_entities = [];
    self.entityService.fnHttpGetListEntitiesEntityAdmin(token, '').subscribe(response => {
      if (response.status == 200) {
        self.collection_entities = response['body'];
        // self.collection_entities = [];
      } else {
        self.collection_entities = [];
      }
    }, err => {
      self.collection_entities = [];
        // self.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnGetListEntitiesAdmin(token) {
    // Instancia de conexion servicio
    const self = this;
    self.collection_entities = [];
    self.entityService.fnHttpGetListEntitiesSuperAdmin(token, '').subscribe(response => {
      if (response.status == 200) {
        self.collection_entities = response['body']['entidadesOutputModel'];
        // self.collection_entities = [];
      } else {
        self.collection_entities = [];
      }
    }, err => {
      self.collection_entities = [];
        // self.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnCheckProfessionalDoctorState(state, document_type, document_number) {
    const self = this;
    self.state_search = true;
    if (state) {
     if (document_type && document_number != null) {
      self.fnGetDoctorRethusByDNI(document_type, parseInt(document_number), function(resp_doctor) {
        if (resp_doctor.status == 200) {
          self.data_doctor_info = resp_doctor.body;
          self.data_doctor_details = resp_doctor.body['Detalles'];
          self.data_user_basic_info['medical_register'] = self.data_doctor_info['NumeroIdentifiacion'];
          // self.search_data_load = false;
          // self.state_search = (self.data_doctor_details.length < 1) ? true : false;
          self.state_search = false;
        } else {
          // self.search_data_load = false;
          self.state_search = false;
        }
      });
     }
    }
  }

  fnShowInputMedicalRegister(profile_type) {
    // if(profile_type == 'Médico') {

    // }
  }

  fnShowGoBackList(show: number) {
    this.flagCreateUser.emit(show);
  }

}
