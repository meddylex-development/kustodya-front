import { Component, OnInit, Input } from '@angular/core';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { ParameterizationService } from '../../../shared/api/services/parameterization.service';
import { EntityService } from '../../../shared/api/services/entity.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-accounting',
  templateUrl: './add-accounting.component.html',
  styleUrls: ['./add-accounting.component.scss']
})
export class AddAccountingComponent implements OnInit {

  accounting_audit_data: any = {};
  collection_benefits_center: any = [];
  collection_thirds: any = [];
  collection_adjustment_type: any = [];
  public current_payload: string = null;
  submitted: boolean = false;
  @Input() encabezadoId;
  id_entity: any = null;
  user_id: any = null;

  collection_account: any = [];
  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;

  constructor(
    private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    private parameterizationService: ParameterizationService,
    private entityService: EntityService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<AddAccountingComponent>,
  ) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem('payload');
    // self.route.data.subscribe(r => {
    //   if (params.token && params.entity) {
    //     self.current_payload = params.token;
    self.fnGetCentrosBeneficio(self.current_payload);
    self.fnGetListaTerceros(self.current_payload);
    self.fnGetListAdjustmentType(self.current_payload);
    self.fnGetAccountingList(self.currentPageAccounting, '');
    self.id_entity = JSON.parse(atob(self.current_payload.split(".")[1])).Entidad;
    self.user_id = JSON.parse(atob(self.current_payload.split(".")[1])).UserId;
    self.fnGetAccountingDefault(self.id_entity);
    //   } else {
    //   }
    // });
  }

  fnGetAccountingDefault(id_entity) {
    this.entityService.fnHttpGetDataEntityById(this.current_payload, id_entity).subscribe(r => {
      if (r.status == 200) {
        // this.accounting_audit_data['codigoContable'] = r.body['contabilidadDefecto'];
        this.fnGetDefaultValues(r.body['contabilidadDefecto']);
      }
    }, err => {
    });
  }

  fnSetAddAccountingAudit(accounting_audit_data) {
    let accounting_audit_data_send = {
      "codigoContable": parseInt(accounting_audit_data.codigoContable, 10),
      "descripcionMovimiento": accounting_audit_data.descripcionMovimiento,
      "centroCostoId": accounting_audit_data.centroCostoId,
      "nitTercero": accounting_audit_data.nitTercero,
      "debito": accounting_audit_data.debito ? parseInt(accounting_audit_data.debito, 10) : null,
      "credito": accounting_audit_data.credito ? parseInt(accounting_audit_data.credito, 10) : null,
      "referencia": accounting_audit_data.referencia,
      "numComprobanteCierre": parseInt(accounting_audit_data.numComprobanteCierre, 10),
      "referenciacionSoportes": accounting_audit_data.referenciacionSoportes,
      "usuarioCreacion": parseInt(this.user_id, 10),
      "entidadId": parseInt(this.id_entity, 10),
      "tipoAjusteId": accounting_audit_data.tipoAjusteId,
      "id": this.encabezadoId,
    }
    this.submitted = true;
    this.auditService.fnHttpPostContabilidadDetalle(this.current_payload, accounting_audit_data_send, this.encabezadoId).subscribe(r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha agregado el item con exito!');
        this.dismiss();
        this.submitted = true;
      }
    }, err => {
      this.utilitiesService.showToast('top-right', 'warning', err.error);
      this.dismiss();
    });
  }

  fnGetCentrosBeneficio(current_payload) {
    this.parameterizationService.fnHttpGetListCostCenter(current_payload, '', 1, 1000, false).subscribe(r => {
      if (r.status == 200) {
        this.collection_benefits_center = r.body['centroOutputModel'];
      }
    }, err => {
    });
  }

  fnGetListaTerceros(current_payload) {
    this.parameterizationService.fnHttpGetTerceros(current_payload, 1, 1000, '').subscribe(r => {
      if (r.status == 200) {
        this.collection_thirds = r.body['terceroOutputModel'];
      }
    }, err => {
    });
  }

  fnGetListAdjustmentType(current_payload) {
    this.parameterizationService.fnHttpGetListAdjustmentType(current_payload, '', 1).subscribe(r => {
      if (r.status == 200) {
        this.collection_adjustment_type = r.body['items'];
      }
    }, err => {
    });
  }

  fnGetDefaultValues(value) {
    this.parameterizationService.fnHttpGetAccountingDetail(this.current_payload, value).subscribe(r => {
      if (r.status == 200) {
        this.accounting_audit_data['descripcionMovimiento'] = r.body['descripcionMovimientoPorDefecto'];
        this.accounting_audit_data['debito'] = r.body['debito'];
        this.accounting_audit_data['credito'] = r.body['credito'];
        this.accounting_audit_data['referencia'] = r.body['referenciaMovimientoPorDefecto'];
        this.accounting_audit_data['tipoAjusteId'] = r.body['tipoAjustePorDefecto'];
      }
    }, err => {
    });
  }

  fnGetAccountingList(currentPageAccounting, text_search) {
    this.parameterizationService.fnHttpGetListContabilidades(this.current_payload, currentPageAccounting, text_search).subscribe(r => {
      if (r.status == 200) {
        this.collection_account = currentPageAccounting == 1 ? r.body['contabilidades'] : this.collection_account.concat(r.body['contabilidades']);
        this.totalPagesAccounting = r.body['paginacion']['totalPaginas'];
        this.totalItemsAccounting = r.body['paginacion']['totalItems'];
        this.currentPageAccounting = r.body['paginacion']['paginaActual'];
      }
    }, err => {
      this.collection_account = [];
    });
  }

  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetAccountingList(siguiente_pagina, '');
    }
  }

  fnSearchAccounting(text_search) {
    this.fnGetAccountingList(1, text_search.term);
  }

  fnCancelAddAccountingAudit() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
