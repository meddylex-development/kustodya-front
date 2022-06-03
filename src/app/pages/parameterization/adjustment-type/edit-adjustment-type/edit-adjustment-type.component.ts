import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-adjustment-type',
  templateUrl: './edit-adjustment-type.component.html',
  styleUrls: ['./edit-adjustment-type.component.scss']
})
export class EditAdjustmentTypeComponent implements OnInit {

  @Input() data_adjustment_type;
  collection_account: any = [];
  submitted: boolean = false;
  required: boolean = true;
  current_payload: any = null;
  original_description: any = null;
  text_search: any = '';

  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;

  constructor(protected ref: NbDialogRef<EditAdjustmentTypeComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem("token");
    self.original_description = self.data_adjustment_type['descripcion'];
    self.fnGetListAccounting(self.current_payload, self.currentPageAccounting, self.text_search);
  }
  
  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetListAccounting(this.current_payload, siguiente_pagina, this.text_search);
    }
  }
   
  fnSearchAccounting(text_search) {
    this.text_search = text_search.term;
    this.fnGetListAccounting(this.current_payload, 1, text_search.term);
  }
  
  fnUpdateAdjustmentType(adjustment_type_data) {
    let object_new_adjustment_type = {
      "descripcion": adjustment_type_data.descripcion,
      "esTipoAjustePorDefecto": adjustment_type_data.esTipoAjustePorDefecto
    }
    this.submitted = true;
    this.parameterizationService.fnHttpSetUpdateAdjustementType(this.current_payload, adjustment_type_data.codigoContabilidad, this.original_description, object_new_adjustment_type).subscribe(r => {
      if (r.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado el tipo de ajuste con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

    
  fnGetListAccounting(current_payload, currentPageAccounting, text_search) {
    this.parameterizationService.fnHttpGetListContabilidades(current_payload, currentPageAccounting, text_search).subscribe(r => {
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
  
  fnCancelUpdateAdjustmentType() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
