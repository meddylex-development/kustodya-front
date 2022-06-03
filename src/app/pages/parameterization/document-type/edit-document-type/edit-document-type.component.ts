import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../../shared/api/services/parameterization.service';
declare var $: any;

@Component({
  selector: 'ngx-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.scss']
})
export class EditDocumentTypeComponent implements OnInit {

  @Input() data_document_type;
  collection_account: any = [];
  submitted: boolean = false;
  required: boolean = true;
  list_accounting_numbers: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  text_search: any = '';

  user_id: any = null;
  user_data: any = {};
  data_document: any = {};
  token: any = null;

  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;

  constructor(
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<EditDocumentTypeComponent>,
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
      self.fnGetAccountingList(self.token, self.currentPageAccounting, self.text_search);
      self.data_document['contabilidad'] = self.data_document_type['codigoContabilidad'];
      self.data_document['descripcion'] = self.data_document_type['descripcion'];
      self.data_document['esClaseDocumentoPorDefecto'] = self.data_document_type['esClaseDocumentoPorDefecto'];
    } else {
      self.router.navigateByUrl('');
    }
  }

  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetAccountingList(this.token, siguiente_pagina, this.text_search);
    }
  }
   
  fnSearchAccounting(text_search) {
    this.text_search = text_search.term;
    this.fnGetAccountingList(this.token, 1, text_search.term);
  }


  fnGetAccountingList(current_payload, currentPageAccounting, text_search) {
    this.parameterizationService.fnHttpGetListContabilidades(current_payload, currentPageAccounting, text_search).subscribe(r => {
      if (r.status == 200) {
        this.list_accounting_numbers = currentPageAccounting == 1 ? r.body['contabilidades'] : this.list_accounting_numbers.concat(r.body['contabilidades']);
        this.totalPagesAccounting = r.body['paginacion']['totalPaginas'];
        this.totalItemsAccounting = r.body['paginacion']['totalItems'];
        this.currentPageAccounting = r.body['paginacion']['paginaActual'];
      }
    }, err => {
      this.list_accounting_numbers = [];
    });
  }

  fnUpdateDocumentType(document_type_data) {
    const self = this;
    self.submitted = true;

    const accounting_code =  document_type_data['contabilidad'];

    const objSendService = {
      'descripcion': document_type_data['descripcion'],
      'esClaseDocumentoPorDefecto': document_type_data['esClaseDocumentoPorDefecto'],
    };
    const description_doc = document_type_data['descripcion'];
    self.fnSetEditDocumentType(accounting_code, self.data_document_type['descripcion'], objSendService, this.token, function(resp_doctor) {
      if (resp_doctor.status == 200 || resp_doctor.status == 204) {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Tipo de documento actualizado satisfactoriamente', 'nb-alert');
        self.dismiss();
      } else {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
      }
    });
  }

  fnSetEditDocumentType(accounting_code, description_doc, objectUser, token, callback) {
    // Instancia de conexion servicio
    this.parameterizationService.fnHttpSetEditDocumentType(accounting_code, description_doc, objectUser, token).subscribe(response => {
      callback(response);
    }, err => {
      callback(err);
      // this.utilitiesService.showToast('top-right', '', 'Error consultado la cantidad de diagnoticos!');
    });
  }

  fnCancelUpdateDocumentType() {
    this.submitted = false;
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
