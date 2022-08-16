import { Component, OnInit, Input } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { BulkUploadService } from '../../../shared/api/services/bulk-upload.service';
import { UserService } from '../../../shared/api/services/user.service';
import { environment } from '../../../../environments/environment';

declare var $: any;
@Component({
  selector: 'ngx-rethus-bulk-upload',
  templateUrl: './rethus-bulk-upload.component.html',
  styleUrls: ['./rethus-bulk-upload.component.scss'],
})
export class RethusBulkUploadComponent implements OnInit {

  @Input() group_id: any;
  @Input() report_id: any;
  public fileToUpload: File = null;
  public current_payload: string = null;
  public file_input_clinic_history: any = null;
  state_file_clinic_history: boolean = false;
  file_create_state: boolean = false;
  codigoApiMedicos: any = environment.codigoApiMedicos;
  data_file: any = {
    'historia_clinica': {
      'data_file': [],
      'data_response': [],
    },
    // 'certificado_incapacidad': {},
    // 'registro_civil': {},
    // 'otros_documentos': {
    //   'data_file': [],
    //   'data_response': [],
    // },
  };
  data_form_transcription: any = {};
  percentaje_status_bar: number = 0;
  obj_file_upload = {
    status: null,
    message: 0,
    filePath: '',
  };
  data_response_upload_file: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private bulkUploadService: BulkUploadService,
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const self = this;
    self.data_form_transcription.state_transcription = 1;
    self.data_form_transcription.state_check_eps = false;
    self.data_form_transcription.state_check_soat = false;
    self.data_form_transcription.type_license = 1;
    self.data_form_transcription.type_origin_incapacity = 1;
    self.data_form_transcription.documents = {
      'historia_clinica': {
        'data_file': [],
        'data_response': [],
      },
    };
    // self.data_user_valid.captcha_token = null;
    $(document).ready(function() {
      // $('#layoutmessage').removeClass('d-none').addClass('d-block');
      $(".kstdy-icon-close").click(function() {
        $('#layoutmessage').removeClass('d-block').addClass('d-none');
        var html_data = '';
        $("#content_message_successfully").html(html_data);
      });
    });

    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.userService.fnHttpSetAuditUser(self.current_payload, { 'descripcion': 'Ingreso a modulo de Cargue Masivo de Medicos - e-Rethus', 'accion': 2 }).subscribe(resp => {
        });
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnUploadFile(id_element) {
    $('#' + id_element).click();
  }

  handleFileInput(files: FileList, type_file: number) {
    const self = this;
    // return false;
    self.fileToUpload = files.item(0);

    const data_name = self.utilitiesService.fnSpliceString(self.fileToUpload['name'], '.');

    const max_size_file = 100000000;

    // if (self.fileToUpload['size'] < max_size_file) { // 30 mb for bytes.

      self.state_file_clinic_history = true;
      self.data_file['historia_clinica']['data_file'] = self.fileToUpload;
      self.data_response_upload_file = null;
      self.uploadFile(function(params) {
        if (params) {
          self.data_response_upload_file = params;
          // self.fnValidStateFileResponse(self.data_response_upload_file);
          self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          // self.data_file['historia_clinica']['data_response'] = params;
          // self.file_create_state = true;
          // self.state_file_clinic_history = true;
        } else {
          self.state_file_clinic_history = false;
        }
      // }, self.fileToUpload, '/api/File');
      }, self.fileToUpload);
    // } else {
    //   alert("Archivo superior a 100 mb");
    // }
  }

  uploadFile(callback, fileToUpload) {
    const self = this;
    self.file_create_state = true;
    // self.utilitiesService.fnShowLoading(true, 0);
    self.bulkUploadService.fnHttpSetUploadFileDoctors(self.current_payload, fileToUpload).subscribe(function(event: HttpEvent<any>) {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          // return self.obj_file_uploadProgress(event);
          const percentDone = Math.round(100 * event.loaded / event.total);
          self.percentaje_status_bar = Math.round(100 * event.loaded / event.total);
          // return { status: 'progress', message: percentDone };
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
        case HttpEventType.ResponseHeader:
          // return this.apiResponse(event);
      break;
        case HttpEventType.Response:
          self.state_file_clinic_history = false;
          const response_upload = event.body;
          // self.obj_file_upload = { 'status': 'success', 'message': response_upload, 'filePath': '' };
          callback(true);
          // return this.apiResponse(event);
      break;
        case HttpEventType.Sent:
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
          // return this.apiResponse(event);
      break;
      }
    }, error => {
      self.state_file_clinic_history = false;
      self.obj_file_upload = { 'status': 'error', 'message': 10, 'filePath': '' };
      callback(false);
    });
  }

  fnCLearForm() {
    this.obj_file_upload = {
      status: null,
      message: 0,
      filePath: '',
    };
  }

  fnDeleteFile() {
    const self = this;
    self.data_file['historia_clinica'] = {
      'data_file': [],
      'data_response': [],
    };
      // 'certificado_incapacidad': {},
      // 'registro_civil': {},
      // 'otros_documentos': {
      //   'data_file': [],
      //   'data_response': [],
      // },
    // };
    // self.file_create_state = false;
    self.state_file_clinic_history = false;
  }

  fnValidStateFileResponse(respose_upload) {
    const self = this;
    const status_upload_file_url = respose_upload['statusQueryGetUri'];
    fetch(status_upload_file_url)
    .then(res => res.json()).then((json_out) => {
      const data_reponse_body = json_out;
      // ****** Status list ******
      // Canceled
      // Completed
      // ContinuedAsNew
      // Failed
      // Pending
      // Running
      // Terminated
      // Unknown
      switch (data_reponse_body['runtimeStatus']) {
        case 'Canceled':
          self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          break;
        case 'Completed':
          self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          break;
        case 'ContinuedAsNew':
          self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          break;
        case 'Pending':
          // self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          self.fnValidStateFileResponse(self.data_response_upload_file);
          break;
        case 'Running':
          // self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          self.fnValidStateFileResponse(self.data_response_upload_file);
          break;
        case 'Terminated':
          self.obj_file_upload = { 'status': 'success', 'message': 1, 'filePath': '' };
          break;
        case 'Failed':
          // data_reponse_body['output'];
          self.obj_file_upload = { 'status': 'error', 'message': 10, 'filePath': '' };
          const message_output = data_reponse_body['output'];
          const collection_data_60_1 = message_output.split('"');
          const collection_data_60_2 = message_output.split('failed');
          break;
        default:
          break;
      }
    }).catch(err => {
      throw err;
    });


      // const obj_data_response_60 = {
      //   'name': 'Orchestrator',
      //   'instanceId': '2f6aeea4-325a-44e6-bb32-0199133bb028',
      //   'runtimeStatus': 'Failed',
      //   'input': {
      //       'Item1': '2f6aeea4-325a-44e6-bb32-0199133bb028',
      //       'Item2': 'ejemplo_60_2.csv',
      //       'Item3': '',
      //   },
      //   'customStatus': null,
      //   'output': "Orchestrator function 'Orchestrator' failed: The orchestrator function 'ConstruirModeloDeEntrada' failed: \"La cantidad máxima de registro permitida es 50 registros\". See the function execution logs for additional details.",
      //   'createdTime': '2020-09-15T23:11:21Z',
      //   'lastUpdatedTime': '2020-09-15T23:11:36Z',
      // };
  
      // const obj_data_response_10 = {
      //   'name': 'Orchestrator',
      //   'instanceId': '2c30914f-944e-4a6c-80be-fe50eb05cd65',
      //   'runtimeStatus': 'Failed',
      //   'input': {
      //       'Item1': '2c30914f-944e-4a6c-80be-fe50eb05cd65',
      //       'Item2': 'CargueMasivoRethus10.csv',
      //       'Item3': '',
      //   },
      //   'customStatus': null,
      //   'output':"Orchestrator function 'Orchestrator' failed: One or more errors occurred. (The orchestrator function 'GetMedicosAsync' failed: \"The activity function 'ConsultarExistentes' failed: \"Error converting value \"37\" to type 'System.Guid'. Path 'Detalles[0].Medicoid', line 1, position 746.\". See the function execution logs for additional details.\". See the function execution logs for additional details.)",
      //   'createdTime': '2020-09-15T23:03:35Z',
      //   'lastUpdatedTime': '2020-09-15T23:03:51Z',
      // };
  
      // const message_output_60 = obj_data_response_60['output'];
      // const message_output_10 = obj_data_response_10['output'];
  
      // const collection_data_60_1 = message_output_60.split('"');
      // const collection_data_10_1 = message_output_10.split('"');
  
      // const collection_data_60_2 = message_output_60.split('failed');
      // const collection_data_10_2 = message_output_10.split('failed');
    // }, error => {
    // });
  }

}
