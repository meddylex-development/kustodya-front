import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { RethusService } from '../../../shared/api/services/rethus.service';
import { UserService } from '../../../shared/api/services/user.service';

declare var $: any;
@Component({
  selector: 'ngx-rethus-individual-search',
  templateUrl: './rethus-individual-search.component.html',
  styleUrls: ['./rethus-individual-search.component.scss'],
})
export class RethusIndividualSearchComponent implements OnInit {

  data_search: any = {
    document_type: null,
    document_number: '',
    first_name: '',
    last_name: '',
  };
  collection_document_types: any = [];
  numItemsPage: any = null;
  currentPage: any = null;
  data_doctor = {
    'Detalles': [],
  };

  data_doctor_info: any = {};
  data_doctor_details: any = [];
  data_doctor_sanctions: any = [];
  data_doctor_sso: any = [];
  search_data_load: boolean = false;
  state_search: boolean = false;
  loading_state: boolean = true;

  token: any = null;
  flag_find_rethus: any = null;
  enum_document_type: any = null;
  document_number: any = null;

  list_doctors: any = [];
  show_list_doctors: boolean = false;
  error_response: any = {};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public utilitiesService: UtilitiesService,
    public rethusService: RethusService,
    public userService: UserService,
  ) {
  }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    //   $('[data-toggle="tooltip"]').tooltip();
    //   $('#pgp-btn_toogle_side_bar').click(); // Emulate click display right sidebar to hide
    //   $('.menu-sidebar').removeClass('d-block').addClass('d-none');
    //   $('#toggle-settings').removeClass('was-expanded').addClass('was-collapse'); // Hide right sidebar to this component
    //   $('#toggle-settings').removeClass('d-block').addClass('d-none'); // Hide right sidebar to this component
    });
    /* **** END - JQuery definition **** */

    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
          self.token = params.token;
          self.currentPage = 1;
          self.numItemsPage = 10;
          self.fnGetListIdentificationTypes(self.token);
          self.flag_find_rethus = parseInt(params.findrethus, 10);
          self.enum_document_type = parseInt(params.enumdoctype, 10);
          self.document_number = params.docnumber;
          const view_report = parseInt(self.utilitiesService.fnGetLocalStorage('view_report'));
          if (self.flag_find_rethus && !view_report) {
            self.data_search.document_type = self.enum_document_type;
            self.data_search.document_number = self.document_number;
            // self.fnSendFormFindDoctor();
            setTimeout(() => {
              self.utilitiesService.fnSetLocalStorage('view_report', true);
              self.fnSendFormFindDoctor();
            }, 300);
          }
      } else {
          self.router.navigateByUrl('');
      }
    });
  }

  fnGetListIdentificationTypes(token) {
    // Instancia de conexion servicio
    // this.userService.fnHttpGetListIdentificationTypes(token).subscribe(response => {
    //   if (response.status == 200) {
    //     this.collection_document_types = response['body'];
    //     this.loading_state = false;
    //   } else {
    //     this.collection_document_types = response['body'];
    //   }
    // }, err => {
    // });
    this.rethusService.fnHttpGetListIdentificationTypes(token).subscribe(response => {
      if (response.status == 200) {
        this.collection_document_types = response['body'];
        this.loading_state = false;
      } else {
        this.collection_document_types = response['body'];
      }
    }, err => {
    });
  }

  fnSendFormFindDoctor() {
    // this.data_search
    const self = this;
    self.loading_state = true;
    self.search_data_load = true;
    self.state_search = false;
    self.data_doctor_details = [];
    self.data_doctor_info = {};
    self.error_response = {};
    self.list_doctors = [];
    self.fnGetDoctorRethusByDNI(self.data_search.document_type, self.data_search.document_number, self.data_search.first_name, self.data_search.last_name, function(resp_doctor) {
      if (resp_doctor.status == 200) {
        const data_doctor_info = resp_doctor.body;
        if (Array.isArray(data_doctor_info)) {
          self.list_doctors = data_doctor_info;
          self.search_data_load = false;
          self.loading_state = false;
          self.show_list_doctors = true;
        } else {
          self.data_doctor_info = data_doctor_info;
          self.data_doctor_details = resp_doctor.body['detalles'];
          self.data_doctor_sanctions = resp_doctor.body['sanciones'];
          self.data_doctor_sso = resp_doctor.body['datosSso'];
          if (self.data_doctor_details.length < 1 && !self.data_doctor_info['primerNombre'] && !self.data_doctor_info['primerApellido']) {
            self.error_response = {
              'status': true,
              'icon': 'fas fa-user-times',
              'message': 'No se encontro información del usuario.',
              'description': 'No se logro encontrar información asociada a los datos consultados. Verifique nuevamente que los datos sean correctos en los campos del formulario',
            };
          }
          self.search_data_load = false;
          self.loading_state = false;
          self.state_search = (self.data_doctor_details.length < 1) ? true : false;
        }
      } else if (resp_doctor.status == 202) {
        self.error_response = {
          'status': true,
          'icon': 'far fa-times-circle',
          'message': 'La consulta ha superado el limite de tiempo.',
          'description': 'La consulta ha superado el limite de tiempo. Por favor intente nuevamente.',
        };
        self.data_doctor_info = {};
        self.data_doctor_details = [];
        self.data_doctor_sanctions = [];
        self.data_doctor_sso = [];
        self.list_doctors = [];
        self.search_data_load = false;
        self.state_search = true;
        self.loading_state = false;
      } else {
        self.error_response = {
          'status': true,
          'icon': 'far fa-times-circle',
          'message': 'Ocurrio un error!',
          'description': 'Ha ocurrido un error al procesar la solicitud. Por favor verifique los datos intente nuevamente.',
        };
        self.data_doctor_info = {};
        self.data_doctor_details = [];
        self.data_doctor_sanctions = [];
        self.data_doctor_sso = [];
        self.list_doctors = [];
        self.search_data_load = false;
        self.state_search = true;
        self.loading_state = false;
      }
    });
  }

  fnGetDoctorRethusByDNI(document_type, document_number, first_name, last_name, callback) {
    // Instancia de conexion servicio
    this.rethusService.fnHttpGetListDoctorsRethusByDNI(this.token, document_type, document_number, first_name, last_name).subscribe(response => {
        callback(response);
    }, err => {
        callback(err);
        // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnShowReport(data) {
    if (data.Estado == 'Terminado') {
        $('#kstdy-report').click();
    }
  }

  fnShowInfoDoctor(data_doctor, index) {
    const self = this;
    // data_doctor['document_type'] = 9;
    // data_doctor['document_number'] = 1019027900;

    self.loading_state = true;
    self.search_data_load = true;
    self.state_search = false;
    self.data_doctor_details = [];
    self.data_doctor_info = {};
    self.list_doctors = [];
    // self.data_doctor_info = data_doctor;
    // self.data_doctor_details = data_doctor['Detalles'];
    // self.data_doctor_sanctions = data_doctor['Sanciones'];
    // self.data_doctor_sso = data_doctor['DatosSso'];
    // self.search_data_load = false;
    // self.loading_state = false;NumeroIdentificacion
    // self.state_search = (self.data_doctor_details.length < 1) ? true : false;TipoIdentificacion
    self.fnGetDoctorRethusByDNI(data_doctor['tipoIdentificacion'], data_doctor['numeroIdentificacion'], '', '', function(resp_doctor) {
      if (resp_doctor.status == 200) {
        const data_doctor_info = resp_doctor.body;
        self.data_doctor_info = data_doctor_info;
        self.data_doctor_details = resp_doctor.body['detalles'];
        self.data_doctor_sanctions = resp_doctor.body['sanciones'];
        self.data_doctor_sso = resp_doctor.body['datosSso'];
        self.search_data_load = false;
        self.loading_state = false;
        self.state_search = (self.data_doctor_details.length < 1) ? true : false;
        self.show_list_doctors = false;
        console.log(self.data_doctor_details.length);
        console.log(data_doctor_info);
      } else if (resp_doctor.status == 202) {
        self.error_response = {
          'status': true,
          'icon': 'far fa-times-circle',
          'message': 'La consulta ha superado el limite de tiempo.',
          'description': 'La consulta ha superado el limite de tiempo. Por favor intente nuevamente.',
        };
        self.data_doctor_info = {};
        self.data_doctor_details = [];
        self.data_doctor_sanctions = [];
        self.data_doctor_sso = [];
        self.list_doctors = [];
        self.search_data_load = false;
        self.state_search = true;
        self.loading_state = false;
      } else {
        self.error_response = {
          'status': true,
          'icon': 'far fa-times-circle',
          'message': 'Ocurrio un error!',
          'description': 'Ha ocurrido un error al procesar la solicitud. Por favor verifique los datos intente nuevamente.',
        };
        self.data_doctor_info = {};
        self.data_doctor_details = [];
        self.data_doctor_sanctions = [];
        self.data_doctor_sso = [];
        self.list_doctors = [];
        self.search_data_load = false;
        self.state_search = true;
        self.loading_state = false;
      }
    });
  }

  fnClearFormSerchRethus() {
    this.data_search = {
      document_type: null,
      document_number: '',
      first_name: '',
      last_name: '',
    };
    this.data_doctor_info = {};
    this.data_doctor_details = [];
    this.data_doctor_sanctions = [];
    this.data_doctor_sso = [];
    this.list_doctors = [];
    this.error_response = {};
  }

  fnSetAuditUser() {
    this.userService.fnHttpSetAuditUser(this.token, { 'descripcion': 'Genera consulta en e-Rethus', 'accion': 2 }).subscribe(resp => {
    });
  }

}
