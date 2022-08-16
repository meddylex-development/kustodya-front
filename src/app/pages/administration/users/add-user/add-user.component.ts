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
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  token: any = null;
  required: boolean = true;
  data_user_basic_info: any = {};
  collection_document_types: any = [];
  collection_genders: any = [];
  collection_profiles: any = [];
  collection_entities: any = [];

  data_doctor_info: any = {};
  data_doctor_details: any = [];
  search_data_load: boolean = false;
  state_search: boolean = false;
  submitted: boolean = false;
  user_type: any = 'admin_kustodya';

  @Output() flagCreateUser = new EventEmitter<number>();

  colorTheme = 'theme-green';
  bsConfig: Partial<BsDatepickerConfig>;
  maxDate = new Date();
  locale = 'es';
  isSuperAdmin: any = false;

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

    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
        self.fnGetListProfiles(self.token).then((resProfiles) => {
          if (resProfiles) {
            this.collection_profiles = resProfiles['body'];
          }
        }).catch((err) => {
        });
        self.fnGetListIdentificationTypes(self.token);
        self.fnGetListGenders(self.token);
        // self.fnGetListProfiles(self.token);
        if (self.isSuperAdmin === 'true') {
          self.fnGetListEntitiesAdmin(self.token);
        } else {
          self.fnGetListEntities(self.token);
        }
      } else {
        // self.router.navigateByUrl('');
      }
    });

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
    self.submitted = true;
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

    const date_collection_unix = moment(data_user_basic_info['birth_date']).unix();
    const date_collection_valueof = moment(data_user_basic_info['birth_date']).valueOf();

    const objSendService = {
      'id': 0,
      'tipoIdentificacion': parseInt(data_user_basic_info['document_type']['value']),
      'numeroIdentificacion': data_user_basic_info['document_number'],
      'primerNombre': data_user_basic_info['first_name'],
      'segundoNombre': (data_user_basic_info['second_name']) ? data_user_basic_info['second_name'] : '',
      'primerApellido': data_user_basic_info['first_last_name'],
      'segundoApellido': (data_user_basic_info['second_last_name']) ? data_user_basic_info['second_last_name'] : '',
      'correo': (data_user_basic_info['email']) ? data_user_basic_info['email'] : '',
      'sexo':  parseInt(data_user_basic_info['gender_type']['value']),
      'fechaNacimiento': (data_user_basic_info['birth_date']) ? moment(data_user_basic_info['birth_date']).valueOf() : 0,
      // 'fechaNacimiento': 0,
      'perfilId':  parseInt(data_user_basic_info['profile_type']),
      'esMedico': (data_user_basic_info['isProfessionalDoctor']) ? true : false,
      'registroMedico': (data_user_basic_info['medical_register']) ? data_user_basic_info['medical_register'] : '',
      'otrosTratamientos': false,
      'activo': true,
      'telefonos': [],
      'direcciones': [],
      'correos': [],
      'redesSociales': [],
      'epSs': [],
      'firma': '',
      'entidades': list_entities_selected,
    };
    // return false;
    // this.data_search
    // const self = this;
    // self.search_data_load = true;
    // self.state_search = false;
    // self.data_doctor_details = [];
    // self.data_doctor_info = {};
    // if(self.data_search.document_type['id'] && self.data_search.document_number) {
      self.fnSetSaveNewUser(objSendService, this.token, function(resp_doctor) {
        if (resp_doctor.status == 200 || resp_doctor.status == 201) {
          self.submitted = false;
          self.data_user_basic_info = {};
          self.fnShowGoBackList(1);
          self.utilitiesService.showToast('top-right', 'success', 'Usuario creado satisfactoriamente', 'nb-alert');
        } else if (resp_doctor.status == 409) {
          self.submitted = false;
          let error = resp_doctor['error'];
          self.utilitiesService.showToast('top-right', 'warning', error, 'nb-alert');
        } else {
          self.submitted = false;
          // self.data_user_basic_info = {};
          self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
        }
      });
    // }
  }

  fnSetSaveNewUser(objectUser, token, callback) {
    // Instancia de conexion servicio
    this.userService.fnHttpSetSaveNewUser(token, objectUser).subscribe(response => {
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
     if (document_type['value'] && document_number != null) {
      self.fnGetDoctorRethusByDNI(document_type['value'], parseInt(document_number), function(resp_doctor) {
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
