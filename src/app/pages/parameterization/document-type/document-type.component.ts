import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './edit-document-type/edit-document-type.component';
import { DeleteDocumentTypeComponent } from './delete-document-type/delete-document-type.component';

@Component({
  selector: 'ngx-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {

  file_name: any = null;
  file_name_input: any = null;
  fileToUpload: any = null;
  list_document_type: any = [{codigo: 1131, contabilidad: '113124', descripcion: 'Descripcion', bDefault: true}];
  currentPage: number = 1;
  numItemsPage: number = 3;
  totalItems: number = 3;

  obj_user: any = {};
  public current_payload: string = null;
  public entity_id: string = null;
  isSuperAdmin: any = null;

  list_documents_original: any = [];
  list_documents: any = [];

  file_create_state: boolean = false;
  percentaje_status_bar: number = 0;
  obj_file_upload = {
    status: null,
    message: 0,
    filePath: '',
  };
  state_file_puc: boolean = false;
  data_file: any = null;
  loading_state: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.entity_id = params.entity;
        self.fnGetListDocumentTypes(self.current_payload, '', 1);
        // self.isSuperAdmin = self.utilitiesService.fnGetSessionStorage('isSuperAdmin');
        // if (self.isSuperAdmin === 'true') {
        //   self.fnGetUsersListAdmin(self.current_payload, '', 1);
        // } else {
        //   self.router.navigateByUrl('');
        // }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetListDocumentTypes(current_payload, search_input, currentPage) {
    const self = this;
    self.loading_state = true;
    self.parameterizationService.fnHttpGetListDocumentTypes(current_payload, search_input, currentPage).subscribe(response_docs => {
      if (response_docs.status == 200) {
        self.list_documents = JSON.parse(JSON.stringify(response_docs.body.items));
        self.list_documents_original = JSON.parse(JSON.stringify(response_docs.body.items));
        self.totalItems = response_docs.body.paginacion.totalItems;
        self.numItemsPage = response_docs.body.paginacion.itemsPorPagina;
        self.currentPage = response_docs.body.paginacion.paginaActual;
        self.loading_state = false;
      }
    }, err => {
      self.loading_state = false;
    });
  }

  fnShowModalNewDocumentType() {
    const self = this;
    self.dialogService.open(AddDocumentTypeComponent).onClose.subscribe((res_modal_add) => {
      self.fnGetListDocumentTypes(self.current_payload, '', 1);
    });
  }

  fnShowModalUpdateDocumentType(document_type_data) {
    const self = this;
    let object_send_modal_update = {};
    object_send_modal_update['data_document_type'] = document_type_data;
    self.dialogService.open(EditDocumentTypeComponent, { context: object_send_modal_update }).onClose.subscribe((res_modal_update) => {
      self.fnGetListDocumentTypes(self.current_payload, '', 1);
    });
  }

  fnShowModalDeleteDocumentType(document_type_data) {
    const self = this;
    let object_send_modal_delete = {};
    object_send_modal_delete['document_type_data'] = document_type_data;
    self.dialogService.open(DeleteDocumentTypeComponent, { context: object_send_modal_delete }).onClose.subscribe((res_modal_delete) => {
      self.fnGetListDocumentTypes(self.current_payload, '', 1);
    });
  }

  handleFileInput(files: FileList) {
    const self = this;
    self.fileToUpload = files.item(0);
    const data_name = self.utilitiesService.fnSpliceString(self.fileToUpload['name'], '.');
    const max_size_file = 100000000;
    if (self.fileToUpload['size'] < max_size_file) {
      // self.state_file_clinic_history = true;
      // self.data_file['historia_clinica']['data_file'] = self.fileToUpload;
      self.uploadFile(function(params) {
        if (params) {
          // self.data_file['historia_clinica']['data_response'] = params;
          // self.file_create_state = true;
          // self.state_file_clinic_history = true;
        } else {
          // self.state_file_clinic_history = false;
        }
      }, self.fileToUpload, '/api/CentrosCosto');
    } else {
      alert('Archivo superior a 100 mb');
    }
  }

  uploadFile(callback, fileToUpload, url_endpoint) {
    const self = this;
    // self.file_create_state = true;
    self.parameterizationService.fnHttSetUploadFile(self.current_payload, fileToUpload, url_endpoint).subscribe(function(event: HttpEvent<any>) {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
          self.percentaje_status_bar = Math.round(100 * event.loaded / event.total);
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
        case HttpEventType.ResponseHeader:
      break;
        case HttpEventType.Response:
          // self.state_file_clinic_history = false;
          const response_upload = event.body;
          if (response_upload == 200) {
            self.utilitiesService.showToast('top-right', 'success', 'Archivo cargado satisfactoriamente', 'fas fa-cloud-upload-alt');
            self.file_name = fileToUpload.name;
            self.fnGetListDocumentTypes(self.current_payload, '', 1);
          }
          self.obj_file_upload = { 'status': 'success', 'message': response_upload, 'filePath': '' };
      break;
        case HttpEventType.Sent:
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
      default:
      }
    }, error => {
      self.state_file_puc = false;
      self.obj_file_upload = { 'status': 'error', 'message': 10, 'filePath': '' };
      if (error.status == 409) {
        self.file_name = null;
        self.fnGetListDocumentTypes(self.current_payload, '', 1);
        self.utilitiesService.showToast('top-right', 'warning', error.error, 'nb-alert');
      }
    });
    self.file_name_input = null;
  }

  fnExportCostCenter() {
    const self = this;
    const end_point_url = '/api/CentrosCosto?exportar=true';
    self.parameterizationService.fnHttpGetPlantilla(self.current_payload, end_point_url).subscribe(resp_export => {
      if (resp_export.status == 200) {
          var blob = new Blob([resp_export.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(blob);
          } else {
            var downloadLink = window.document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = "Historico_centro_costos.xlsx";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
      }
    }, err => {
      self.fnExportTemplateCenterCost();
    });
  }

  fnExportTemplateCenterCost() {
    const self = this;
    const end_point_url = '/api/CentrosCosto/Plantilla';
    this.parameterizationService.fnHttpGetPlantilla(this.current_payload, end_point_url).subscribe(resp_export => {
      if (resp_export.status == 200) {
          var blob = new Blob([resp_export.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(blob);
          } else {
            var downloadLink = window.document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = "Plantilla_centro_costos.xlsx";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
      }
    }, err => {
    });
  }

  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetListDocumentTypes(self.current_payload, '', self.currentPage);
  }

}
