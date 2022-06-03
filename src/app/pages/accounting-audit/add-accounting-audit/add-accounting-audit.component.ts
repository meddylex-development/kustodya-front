import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { UserService } from '../../../shared/api/services/user.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { EntityService } from '../../../shared/api/services/entity.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-accounting-audit',
  templateUrl: './add-accounting-audit.component.html',
  styleUrls: ['./add-accounting-audit.component.scss']
})
export class AddAccountingAuditComponent implements OnInit {

  data_accounting_basic_info: any = {};
  collection_document_types: any = [];
  collection_accounting: any = [];
  public current_payload: string = null;
  public maxDate: string = null;
  @Output() flagListAccountingAudit = new EventEmitter<number>();
  submitted: boolean = false;
  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;
  id_contabilidad: number = 0;
  id_entity: number = 0;
  loading_state: boolean = false;

  constructor(private utilitiesService: UtilitiesService,
    private dialogService: NbDialogService,
    private auditService: AuditService,
    private userService: UserService,
    private parameterizationService: ParameterizationService,
    private entityService: EntityService,
    public router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.data_accounting_basic_info.fechaElaboracion = new Date();
        self.data_accounting_basic_info.folios = 1;
        self.id_entity = JSON.parse(atob(self.current_payload.split(".")[1])).Entidad;
        self.fnGetAccountingList(self.current_payload, self.currentPageAccounting, '');
        self.fnGetAccountingDefault(self.id_entity);
        // self.fnGetDocumentTypeList(self.current_payload);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  
  fnGetAccountingDefault(id_entity) {
    this.loading_state = true;
    this.entityService.fnHttpGetDataEntityById(this.current_payload, id_entity).subscribe(r => {
      if (r.status == 200) {
        this.data_accounting_basic_info['contabilidad'] = r.body['contabilidadDefecto'];
        this.fnGetDefaultValues(r.body['contabilidadDefecto']);
      }
    }, err => {
    });
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

  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetAccountingList(this.current_payload, siguiente_pagina, '');
    }
  }

  fnSearchAccounting(text_search) {
    this.fnGetAccountingList(this.current_payload, 1, text_search.term);
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

  fnGetDefaultValues(value) {
    this.loading_state = true;
    this.parameterizationService.fnHttpGetAccountingDetail(this.current_payload, value).subscribe(r => {
      if (r.status == 200) {
        this.data_accounting_basic_info['claseDocumento'] = r.body['claseDocumentoPorDefecto'];
        this.data_accounting_basic_info['descripcionFicha'] = r.body['descripcionMovimientoPorDefecto'];
        this.data_accounting_basic_info['subcuenta'] = r.body['codigo'] + " - " + r.body['descripcion'];
        this.id_contabilidad = r.body['id'];
        this.fnGetDocumentTypeList(this.current_payload, r.body['codigo']);
        this.loading_state = false;
      }
    }, err => {
      this.loading_state = false;
      // this.collection_accounting = [];
    });

  }


  fnSendFormBasicInfoAccountingAudit(data_accounting_basic_info) {
    this.submitted = true;
    let object_send = {
      "claseDocumento": data_accounting_basic_info.claseDocumento,
      "descripcionFicha": data_accounting_basic_info.descripcionFicha,
      "fichaTecnicaAprobada": data_accounting_basic_info.fichaTecnicaAprobada,
      "folios": data_accounting_basic_info.folios,
      "id": this.id_contabilidad
    }
    this.auditService.fnHttpPostContabilidadEncabezado(this.current_payload, this.id_contabilidad, object_send).subscribe( r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha creado la depuracion con exito');
        this.submitted = false;
        this.fnShowGoBackList(1);
      }
    }, err => {

    });

  }

  fnShowGoBackList(show: number) {
    this.flagListAccountingAudit.emit(show);
  }

  fnSendFormAddEntity(data_new_entity) {
    this.fnShowGoBackList(1);
  }

}
