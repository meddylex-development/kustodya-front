import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogService } from '@nebular/theme';
import { DeleteAccountingAuditComponent } from '../delete-accounting-audit/delete-accounting-audit.component';
import { PreviewPdfAccountingDetailComponent } from '../preview-pdf-accounting-detail/preview-pdf-accounting-detail.component';
import { ChangeStateAccountingAuditComponent } from '../change-state-accounting-audit/change-state-accounting-audit.component';
declare var $: any;

@Component({
  selector: 'ngx-accounting-audit-list',
  templateUrl: './accounting-audit-list.component.html',
  styleUrls: ['./accounting-audit-list.component.scss']
})
export class AccountingAuditListComponent implements OnInit {

  @Output() flagCreateAccountingAudit = new EventEmitter<number>();
  @Output() id_accounting = new EventEmitter<boolean>();
  search_input: any = '';
  fechaDesde: any = 0;
  fechaHasta: any = 1735689600000;
  list_accounting_audit: any = [];
  list_accounting_audit_original: any = [];
  numItemsPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 5;
  loading_state: boolean = false;
  public current_payload: string = null;
  show_btn_create: boolean = true;
  collection_data: any = [
    {'id': '', 'name': 'Seleccione estado'},
    // {'id': 1, 'name': 'Por emitir'},
    // {'id': 2, 'name': 'Emitido'},
    // {'id': 3, 'name': 'Anulado'},
  ];
  collection_data_original: any = [];
  state: any = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private auditService: AuditService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    /* *** START - JQuery definition *** */
    // JQuery ready
    const self = this;
    $(document).ready(function () {
    });
    /* **** END - JQuery definition **** */
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetAccountingAuditList(self.current_payload, self.currentPage, self.numItemsPage, self.search_input, '');
        self.fnGetListStatesAccountingAudit(self.current_payload);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetAccountingAuditList(current_payload, current_page, itemsPage, text_search, state) {
    this.loading_state = true;
    this.auditService.fnHttpGetAccountingAuditList(current_payload, current_page, itemsPage, text_search, state).subscribe(r => {
      if (r.status == 200) {
        this.list_accounting_audit = JSON.parse(JSON.stringify(r.body.depuracionOutputModel));
        this.list_accounting_audit_original = JSON.parse(JSON.stringify(r.body.depuracionOutputModel));
        this.totalItems = r.body.paginacion.totalItems;
        this.numItemsPage = r.body.paginacion.itemsPorPagina;
        this.loading_state = false;
        this.show_btn_create= r.body.aprobador;
      }
    }, err => {
      this.list_accounting_audit = [];
      this.loading_state = false;
    });
  }

  fnGetListStatesAccountingAudit(current_payload) {
    this.loading_state = true;
    this.auditService.fnHttpGetListStatesAccountingAudit(current_payload).subscribe(r => {
      if (r.status == 200) {
        const obj_start = [{ 'name': '.::Seleccione estado::.', 'value': '' }];
        const data_collection = JSON.parse(JSON.stringify(r.body));
        this.collection_data = [...obj_start, ...data_collection];
        this.collection_data_original = [...obj_start, ...data_collection];
        // this.collection_data = JSON.parse(JSON.stringify(r.body));
        // this.collection_data_original = JSON.parse(JSON.stringify(r.body));
        this.loading_state = false;
      }
    }, err => {
      this.collection_data = [];
      this.loading_state = false;
    });
  }

  fnCreateAccountingAudit(msg) {
    this.flagCreateAccountingAudit.emit(msg);
  }

  fnShowEditAccountingAudit(data_accounting_audit) {
    this.id_accounting.emit(data_accounting_audit.id);
  }

  fnShowModalDeleteAccountingAudit(data_accounting_audit) {
    let obj_send = {};
    obj_send['accounting_audit_data'] = data_accounting_audit;
    this.dialogService.open(DeleteAccountingAuditComponent, {context: obj_send }).onClose.subscribe((res) => {
      this.search_input = '';
      this.fnGetAccountingAuditList(this.current_payload, this.currentPage, this.numItemsPage, this.search_input, this.state);
    });
  }

  fnShowModalViewPDFAccountingAudit(data_accounting_audit) {
    let obj_send = {};
    obj_send['accounting_audit_data'] = data_accounting_audit;
    this.dialogService.open(PreviewPdfAccountingDetailComponent, {context: obj_send }).onClose.subscribe((res) => {
      this.search_input = '';
      this.fnGetAccountingAuditList(this.current_payload, this.currentPage, this.numItemsPage, this.search_input, this.state);
    });
  }

  fnShowModalChangeStateAccountingAudit(data_accounting_audit) {
    let obj_send = {};
    obj_send['accounting_audit_data'] = data_accounting_audit;
    this.dialogService.open(ChangeStateAccountingAuditComponent, {context: obj_send }).onClose.subscribe((res) => {
      this.search_input = '';
      this.fnGetAccountingAuditList(this.current_payload, this.currentPage, this.numItemsPage, this.search_input, this.state);
    });
  }

  fnFilter(text_search) {
    this.search_input = text_search;
    this.fnGetAccountingAuditList(this.current_payload, this.currentPage, this.numItemsPage, text_search, this.state);
  }

  /** Funciones para Pagindo **/
  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetAccountingAuditList(this.current_payload, this.currentPage, this.numItemsPage, this.search_input, this.state);
  }

  fnChangeStatusList(state_select) {
    const self = this;
    self.state = state_select['value'];
    // self.fnGetPatientsList(self.current_payload, self.currentPage, self.search_input, state_select['id']);
    self.fnGetAccountingAuditList(self.current_payload, self.currentPage, self.numItemsPage, self.search_input, self.state);
  }

  fnClearFilter() {
    const self = this;
    self.state = '';
    self.collection_data = self.collection_data_original;
    self.fnGetAccountingAuditList(self.current_payload, self.currentPage, self.numItemsPage, self.search_input, '');
  }

}
