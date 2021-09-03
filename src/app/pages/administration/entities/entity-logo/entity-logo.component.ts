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
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { EntityService } from '../../../../shared/api/services/entity.service';
import { environment } from '../../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'ngx-entity-logo',
  templateUrl: './entity-logo.component.html',
  styleUrls: ['./entity-logo.component.scss']
})
export class EntityLogoComponent implements OnInit {

  @Input() dataEntityTab: any;
  public fileToUpload: File = null;
  public current_payload: string = null;
  public entity_id: any = null;
  image_profile_user: any = null;
  public file_input_clinic_history: any = null;
  state_file_clinic_history: boolean = false;
  file_create_state: boolean = false;
  codigoApiMedicos: any = environment.codigoApiMedicos;
  data_file: any = {
    'historia_clinica': {
      'data_file': [],
      'data_response': [],
    },
  };
  data_form_transcription: any = {};
  percentaje_status_bar: number = 0;
  obj_file_upload = {
    status: null,
    message: 0,
    filePath: '',
  };
  // entity_id: any = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private entityService: EntityService,
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

    // self.dataEntityTab

    $(document).ready(function() {
      $('.kstdy-icon-close').click(function() {
        $('#layoutmessage').removeClass('d-block').addClass('d-none');
        var html_data = '';
        $('#content_message_successfully').html(html_data);
      });
    });

    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        // self.entity_id = parseInt(self.utilitiesService.fnGetSessionStorage('entity_id'), 10);
        self.entity_id = self.dataEntityTab['id'];
        if (self.entity_id) {
          self.fnGetDataLogoEntity(self.current_payload, self.entity_id);
        } else {
          self.router.navigateByUrl('');
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetDataLogoEntity(token, entity_id) {
    const self = this;
    self.image_profile_user = null;
    self.fnGetLogoEntity(token, entity_id, function (resp_signature) {
      const image_blob = JSON.parse(JSON.stringify(resp_signature));
      if (resp_signature['status'] !== 404) {
        var reader = new FileReader();
        reader.readAsDataURL(resp_signature);
        reader.onloadend = function() {
            var base64data = reader.result;
            var str = base64data + '';
            var res = str.replace('application/octet-stream', 'image/png');
            self.image_profile_user = res;
        };
      } else {
        self.image_profile_user = null;
      }
    });

  }

  fnGetLogoEntity(current_payload, entity_id, callback) {
    this.entityService.fnHttpGetLogoEntity(current_payload, entity_id).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnUploadFile(id_element) {
    $('#' + id_element).click();
  }

  handleFileInput(files: FileList, type_file: number) {
    const self = this;
    self.fileToUpload = files.item(0);
    const data_name = self.utilitiesService.fnSpliceString(self.fileToUpload['name'], '.');
    const max_size_file = 100000000;
    if (self.fileToUpload['size'] < max_size_file) {
      self.state_file_clinic_history = true;
      self.data_file['historia_clinica']['data_file'] = self.fileToUpload;
      self.uploadFile(function(params) {
        if (params) {
          self.data_file['historia_clinica']['data_response'] = params;
          self.file_create_state = true;
          self.state_file_clinic_history = true;
        } else {
          self.state_file_clinic_history = false;
        }
      }, self.fileToUpload);
    } else {
      alert('Archivo superior a 100 mb');
    }
  }

  uploadFile(callback, fileToUpload) {
    const self = this;
    self.file_create_state = true;
    self.entityService.fnHttpSetUploadLogoEntity(self.current_payload, self.entity_id ,fileToUpload).subscribe(function(event: HttpEvent<any>) {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
          self.percentaje_status_bar = Math.round(100 * event.loaded / event.total);
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
        case HttpEventType.ResponseHeader:
      break;
        case HttpEventType.Response:
          self.state_file_clinic_history = false;
          const response_upload = event.body;
          self.obj_file_upload = { 'status': 'success', 'message': response_upload, 'filePath': '' };
          self.fnGetDataLogoEntity(self.current_payload, self.entity_id);
      break;
        case HttpEventType.Sent:
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
      default:
      }
    }, error => {
      self.state_file_clinic_history = false;
      self.obj_file_upload = { 'status': 'error', 'message': 10, 'filePath': '' };
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
    self.state_file_clinic_history = false;
  }

}
