import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../../shared/api/services/parameterization.service';
declare var $: any;

@Component({
  selector: 'ngx-delete-document-type',
  templateUrl: './delete-document-type.component.html',
  styleUrls: ['./delete-document-type.component.scss']
})
export class DeleteDocumentTypeComponent implements OnInit {

  @Input() document_type_data;
  // @Input() data_document_type;
  collection_account: any = [];
  submitted: boolean = false;
  list_accounting_numbers: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  text_search: any = '';

  user_id: any = null;
  user_data: any = {};
  data_document: any = {};
  token: any = null;

  constructor(
    protected ref: NbDialogRef<DeleteDocumentTypeComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    // const self = this;
    // // self.document_type_data
    // self.token = sessionStorage.getItem('payload');
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.token = params.token;
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });

    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('payload');
    if (token && user_id) {
      self.token = token;
      self.user_id = user_id;
    } else {
      self.router.navigateByUrl('');
    }
  }

  fnSetDeleteDocumentType(type_doc_description) {
    this.submitted = true;
    this.parameterizationService.fnHttpSetDeleteDocumentType(this.document_type_data['codigoContabilidad'], type_doc_description['descripcion'], this.token).subscribe(response_delete => {
      // this.parameterizationService.fnHttpDeleteContabilidad(this.token, accounting_number_data.codigo).subscribe(r => {
      if (response_delete.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la contabilidad con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

  fnCancelDeleteDocumentType() {
    this.submitted = false;
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
