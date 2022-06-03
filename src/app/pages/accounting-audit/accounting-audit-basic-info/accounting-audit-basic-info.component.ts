import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { UserService } from '../../../shared/api/services/user.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogService } from '@nebular/theme';

declare var $: any;
@Component({
  selector: 'ngx-accounting-audit-basic-info',
  templateUrl: './accounting-audit-basic-info.component.html',
  styleUrls: ['./accounting-audit-basic-info.component.scss']
})
export class AccountingAuditBasicInfoComponent implements OnInit {

  data_accounting_basic_info: any = {};
  collection_document_types: any = [];
  collection_accounting: any = [];
  public current_payload: string = null;
  public maxDate: string = null;
  @Input() id_accounting_edit;
  @Output() id_accounting = new EventEmitter<boolean>();
  submitted: boolean = false;
  id_contabilidad: number = 0;
  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;
  loading_state: any = false;
  input_search_accounting: any = '';

  constructor(
    private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private auditService: AuditService,
    private parameterizationService: ParameterizationService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const self = this;
    /* *** START - JQuery definition *** */
    // JQuery ready
    $(document).ready(function () {
      $('.container-fliud').scrollTop(0);
    });
    /* **** END - JQuery definition **** */
    self.input_search_accounting = '';
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.data_accounting_basic_info.fechaElaboracion = new Date();
        // self.fnGetDocumentTypeList(self.current_payload);
        self.fnGetAccountingList(self.current_payload, self.currentPageAccounting, self.input_search_accounting);
        if(self.id_accounting_edit) {
          self.fnGetAccountingInfoById(self.current_payload, self.id_accounting_edit);
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetAccountingList(this.current_payload, siguiente_pagina, '');
    }
  }

  fnSearchAccounting(text_search) {
    this.input_search_accounting = text_search.term;
    this.fnGetAccountingList(this.current_payload, 1, this.input_search_accounting);
  }

  fnGetDocumentTypeList(current_payload, id_contabilidad) {
    this.auditService.fnHttpGetDocumentTypeByAccounting(current_payload, '', 1, id_contabilidad).subscribe(r => {
      if (r.status == 200) {
        this.collection_document_types = r.body['items'];
      }
    }, err => {
      this.collection_document_types = [];
    });
  }

  fnGetDefaultValues(value) {
    this.parameterizationService.fnHttpGetAccountingDetail(this.current_payload, value).subscribe(r => {
      if (r.status == 200) {
        this.data_accounting_basic_info['claseDocumento'] = r.body['claseDocumentoPorDefecto'];
        this.data_accounting_basic_info['descripcionFicha'] = r.body['descripcionMovimientoPorDefecto'];
        this.data_accounting_basic_info['subcuenta'] = r.body['codigo'] + " - " + r.body['descripcion'];
        this.id_contabilidad = r.body['id'];
        this.fnGetDocumentTypeList(this.current_payload, r.body['codigo']);
      }
    }, err => {
      // this.collection_accounting = [];
    });

  }

  fnGetAccountingList(current_payload, currentPageAccounting, text_search) {
    this.parameterizationService.fnHttpGetListContabilidades(current_payload, currentPageAccounting, text_search).subscribe(r => {
      if (r.status == 200) {
        this.collection_accounting = currentPageAccounting == 1 ? r.body['contabilidades'] : this.collection_accounting.concat(r.body['contabilidades']);
        this.totalPagesAccounting = r.body['paginacion']['totalPaginas'];
        this.totalItemsAccounting = r.body['paginacion']['totalItems'];
        this.currentPageAccounting = r.body['paginacion']['paginaActual'];
      }
    }, err => {
      this.collection_accounting = [];
    });
  }

  fnSendFormBasicInfoAccountingAudit(data_accounting_basic_info) {
    this.submitted = true;
    let object_send = {
      'claseDocumento': data_accounting_basic_info.claseDocumento,
      'descripcionFicha': data_accounting_basic_info.descripcionFicha,
      'fichaTecnicaAprobada': data_accounting_basic_info.fichaTecnicaAprobada,
      'folios': data_accounting_basic_info.folios,
      'situacionEncontrada': data_accounting_basic_info.situacionEncontrada,
      'disposicionesLegales': data_accounting_basic_info.disposicionesLegales,
      'accionesRealizadas': data_accounting_basic_info.accionesRealizadas,
      'recomendaciones': data_accounting_basic_info.recomendaciones,
      'anexos': data_accounting_basic_info.anexos,
      'id': data_accounting_basic_info.contabilidadId,
    };
    this.auditService.fnHttpPutContabilidad(this.current_payload, object_send.id, this.id_accounting_edit, object_send).subscribe( r => {
      if (r.status == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la depuracion con exito');
        this.fnGetAccountingInfoById(this.current_payload, r.body['id']);
        this.submitted = false;
      }
    }, err => {

    });

  }

  fnShowEditAccountingAudit(id_accounting_audit) {
    this.id_accounting.emit(id_accounting_audit);
  }

  fnGetAccountingInfoById(current_payload, id_accounting) {
    this.loading_state = true;
    this.auditService.fnHttpGetAccountingNotesById(current_payload, id_accounting).subscribe( r => {
      if (r.status == 200) {
        this.data_accounting_basic_info = r.body;
        this.data_accounting_basic_info.fechaElaboracion = new Date(r.body['fechaElaboracion']);
        this.data_accounting_basic_info['subcuenta'] = r.body['codigoContabilidad'] + " - " + r.body['descripcionFicha'];
        this.loading_state = false;
      }
    }, err => {
      this.loading_state = false;
    });
  }

}
