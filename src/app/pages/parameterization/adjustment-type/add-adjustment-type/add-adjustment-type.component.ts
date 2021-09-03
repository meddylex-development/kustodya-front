import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-add-adjustment-type',
  templateUrl: './add-adjustment-type.component.html',
  styleUrls: ['./add-adjustment-type.component.scss']
})
export class AddAdjustmentTypeComponent implements OnInit {

  data_adjustment_type: any = {};
  collection_account: any = [];
  submitted: boolean = false;
  required: boolean = true;
  current_payload: any = null;

  totalPagesAccounting: number = 0;
  totalItemsAccounting: number = 0;
  currentPageAccounting: number = 1;

  constructor(protected ref: NbDialogRef<AddAdjustmentTypeComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem('payload');
    self.fnGetListAccounting(self.current_payload, self.currentPageAccounting, '');
  }
  
  onScrollToEnd() {
    let siguiente_pagina = this.currentPageAccounting + 1;
    if(siguiente_pagina <= this.totalPagesAccounting) {
      this.fnGetListAccounting(this.current_payload, siguiente_pagina, '');
    }
  }
   
  fnSearchAccounting(text_search) {
    this.fnGetListAccounting(this.current_payload, 1, text_search.term);
  }
  
  fnNewAdjustmentType(adjustment_type_data) {
    let object_new_adjustment_type = {
      "descripcion": adjustment_type_data.descripcion,
      "esTipoAjustePorDefecto": adjustment_type_data.esTipoAjustePorDefecto
    }
    this.submitted = true;
    this.parameterizationService.fnHttpSetNewAdjustementType(this.current_payload, adjustment_type_data.codigoContabilidad, object_new_adjustment_type).subscribe(r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha creado el tipo de ajuste con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
  
  fnCancelNewAdjustmentType() {
    this.submitted = false;
    this.dismiss();
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

  
  dismiss() {
    this.ref.close();
  }

}
