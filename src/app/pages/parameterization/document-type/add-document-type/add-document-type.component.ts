import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../../shared/api/services/parameterization.service';
declare var $: any;

@Component({
  selector: 'ngx-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss'],
})
export class AddDocumentTypeComponent implements OnInit {

  data_document_type: any = {};

  list_accounting_numbers: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  totalPages: number = 10;
  text_search: any = '';
  required: boolean = false;

  @Input() data_user: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  token: any = null;

  constructor(
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddDocumentTypeComponent>,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem("token");
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
      self.fnGetAccountingList(self.token, self.currentPage, self.text_search);
    } else {
      self.router.navigateByUrl('');
    }
  }

  fnGetAccountingList(token, currentPage, text_search) {
    this.parameterizationService.fnHttpGetListContabilidades(token, currentPage, text_search).subscribe(r => {
      if (r.status == 200) {
        this.list_accounting_numbers = currentPage == 1 ? r.body.contabilidades : this.list_accounting_numbers.concat(r.body.contabilidades);
        this.totalItems = r.body['paginacion']['totalItems'];
        this.totalPages = r.body['paginacion']['totalPaginas'];
        this.currentPage = r.body['paginacion']['paginaActual'];
      }
    }, err => {
      this.list_accounting_numbers = [];
    });
  }

  
  onScrollToEnd() {
    let siguiente_pagina = this.currentPage + 1;
    if(siguiente_pagina <= this.totalPages) {
      this.fnGetAccountingList(this.token, siguiente_pagina, this.text_search);
    }
  }
   
  fnSearchAccounting(text_search) {
    this.text_search = text_search.term;
    this.fnGetAccountingList(this.token, 1, text_search.term);
  }


  fnNewDocumentType(document_type_data) {
    const self = this;
    self.submitted = true;

    const accounting_code =  document_type_data['contabilidad'];

    const objSendService = {
      'descripcion': document_type_data['descripcion'],
      'esClaseDocumentoPorDefecto': document_type_data['esClaseDocumentoPorDefecto'],
    };
    self.fnSetCreateNewDocumentType(accounting_code, objSendService, this.token, function(resp_doctor) {
      if (resp_doctor.status == 200 || resp_doctor.status == 201) {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Tipo de documento creado satisfactoriamente', 'nb-alert');
        self.dismiss();
      } else {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
      }
    });
  }

  fnSetCreateNewDocumentType(accounting_code, objectUser, token, callback) {
    // Instancia de conexion servicio
    this.parameterizationService.fnHttpSetCreateNewDocumentType(accounting_code, objectUser, token).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnCancelUpdateDescription() {
    this.submitted = false;
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
