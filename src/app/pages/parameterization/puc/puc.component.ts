import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
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
import { ParameterizationService } from "../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../shared/api/services/utilities.service";
import { EditPUCComponent } from './edit-puc/edit-puc.component';

@Component({
  selector: 'ngx-puc',
  templateUrl: './puc.component.html',
  styleUrls: ['./puc.component.scss']
})
export class PUCComponent implements OnInit {

  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  list_puc: any = [];
  file_name: any = null;
  file_name_input: any = null;
  fileToUpload: any = null;
  current_payload: any = null;
  text_search: any = '';
  loading_state: boolean = false;

  file_create_state: boolean = false;
  percentaje_status_bar: number = 0;
  obj_file_upload = {
    status: null,
    message: 0,
    filePath: '',
  };
  state_file_puc: boolean = false;
  data_file: any = null;

  constructor(private dialogService: NbDialogService,
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
        self.fnGetListPUC(this.current_payload, this.currentPage, this.text_search);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnShowModalUpdatePUC(data_puc) {
    let object_send = {};
    object_send['data_puc'] = JSON.parse(JSON.stringify(data_puc));
    this.dialogService.open(EditPUCComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListPUC(this.current_payload, this.currentPage, this.text_search);
    });
  }

  
  fnGetListPUC(current_payload, currentPage, text_search) {
    this.loading_state = true;
    this.parameterizationService.fnHttpGetListContabilidades(current_payload, currentPage, text_search).subscribe(r => {
      if (r.status == 200) {
        this.list_puc = JSON.parse(JSON.stringify(r.body.contabilidades));
        this.totalItems = r.body.paginacion.totalItems;
        this.numItemsPage = r.body.paginacion.itemsPorPagina;
        this.loading_state = false;
      }
    }, err => {
      this.list_puc = [];
      this.loading_state = false;
    });
  }


  getPage(page) {
    this.currentPage = page;
    this.fnGetListPUC(this.current_payload, this.currentPage, this.text_search);
  }

  fnExportPUC() {
    const end_point_url = '/api/PUCs?exportar=true&tamanoPagina=16384';
    this.parameterizationService.fnHttpGetPlantilla(this.current_payload, end_point_url).subscribe(resp_export => {
      if (resp_export.status == 200) {
          var blob = new Blob([resp_export.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(blob);
          }
          else {
            var downloadLink = window.document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = "plantilla puc.xlsx";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
      }

    }, err => {
    });
  }

  handleFileInput(files: FileList) {
      this.file_name = null;
      this.fileToUpload = files.item(0);
      this.uploadFileToActivity(this.fileToUpload);
  }

  uploadFileToActivity(fileToUpload) {
    const self = this;
    const end_point_url = '/api/PUCs';
    self.parameterizationService.fnHttSetUploadFile(self.current_payload, fileToUpload, end_point_url).subscribe(function(event: HttpEvent<any>) {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
          self.percentaje_status_bar = Math.round(100 * event.loaded / event.total);
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
        case HttpEventType.ResponseHeader:
      break;
        case HttpEventType.Response:
          self.state_file_puc = false;
          const response_upload = event.status;
          if (response_upload == 200) {
            self.utilitiesService.showToast('top-right', 'success', 'Se ha importado el archivo con exito', 'fas fa-cloud-upload-alt');
            self.file_name = fileToUpload.name;
          }
          self.obj_file_upload = { 'status': 'success', 'message': response_upload, 'filePath': '' };
      break;
        case HttpEventType.Sent:
          self.obj_file_upload = { 'status': 'progress', 'message': self.percentaje_status_bar, 'filePath': '' };
      break;
      default:
      }}, error => {
        self.state_file_puc = false;
        self.obj_file_upload = { 'status': 'error', 'message': 10, 'filePath': '' };
        if (error.status == 409) {
          self.file_name = null;
          self.fnGetListPUC(self.current_payload, self.currentPage, self.text_search);
          self.utilitiesService.showToast('top-right', 'warning', error.error, 'nb-alert');
        }
    });
    self.file_name_input = null;
  }

}
