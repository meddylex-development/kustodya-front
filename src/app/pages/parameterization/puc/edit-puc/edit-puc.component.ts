import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-puc',
  templateUrl: './edit-puc.component.html',
  styleUrls: ['./edit-puc.component.scss']
})
export class EditPUCComponent implements OnInit {

  @Input() data_puc;
  collection_puc_credit: any = [];
  collection_puc_debit: any = [];
  collection_tipo_contabilidad: any = [];
  submitted: boolean = false;
  current_payload: any = null;
  
  current_page_credit: number = 1;
  current_page_debit: number = 1;
  total_pages_debit: number = 1;
  total_pages_credit: number = 1;
  tam_pagina: number = 20;

  constructor(protected ref: NbDialogRef<EditPUCComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem("token");
    self.fnGetListadoPuc(self.current_payload);
    if(self.data_puc['tipoContabilidad']) {
      self.fnGetPucList(self.data_puc['tipoContabilidad'], 'debit', self.current_page_debit, self.tam_pagina, '');
      self.fnGetPucList(self.data_puc['tipoContabilidad'], 'credit', self.current_page_credit, self.tam_pagina, '');
    }
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.current_payload = params.token;
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });
  }

  fnUpdatePUC(data_puc) {
    let object_update_data_puc = {
      'codigo': data_puc.codigo,
      'descripcion': data_puc.descripcion,
      'esContabilidadPorDefecto': data_puc.esContabilidadPorDefecto,
      'codigoPucCreditoMovimientoPorDefecto': data_puc.credito,
      'codigoPucDebitoMovimientoPorDefecto': data_puc.debito,
      'referenciaMovimientoPorDefecto': data_puc.referenciaMovimientoPorDefecto,
      'descripcionMovimientoPorDefecto': data_puc.descripcionMovimientoPorDefecto,
    }
    this.submitted = true;
    this.parameterizationService.fnHttpSetNewContabilidad(this.current_payload, object_update_data_puc).subscribe(r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la contabilidad con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

  onScrollToEnd(nom_select) {
    let siguiente_pagina = this['current_page_' + nom_select] + 1;
    if(siguiente_pagina <= this['total_pages_' + nom_select]) {
      this.fnGetPucList(this.data_puc['tipoContabilidad'], nom_select, siguiente_pagina, this.tam_pagina, '');
    }
  }
   
  fnSearchPuc(event, nom_select) {
    this.fnGetPucList(this.data_puc['tipoContabilidad'], nom_select, 1, this.tam_pagina, event.term);
  }

  fnGetListadoPuc(current_payload) {
    this.parameterizationService.fnHttpGetContabilidadEnumeraciones(current_payload).subscribe(r => {
      if (r.status == 200) {
        this.collection_tipo_contabilidad = JSON.parse(JSON.stringify(r.body));
      }
    }, err => {
      this.collection_tipo_contabilidad = [];
    });
    
  }

  fnGetPucList(tipo_contabilidad, nom_select, currentPage, tamPagina, text_search) {
    this.parameterizationService.fnHttpGetPUCs(this.current_payload, currentPage, tamPagina, text_search, this.data_puc['codigo'], tipo_contabilidad, false).subscribe(r => {
      if (r.status == 200) {
        this['collection_puc_' + nom_select] = currentPage == 1 ? r.body['pucOutputModel'] : this['collection_puc_' + nom_select].concat(r.body['pucOutputModel']);
        this['current_page_' + nom_select] = r.body['paginacion']['paginaActual'];
        this['total_pages_' + nom_select] = r.body['paginacion']['totalPaginas'];
      }
    }, err => {
      this['collection_puc_' + nom_select] = [];
    });
  }

  fnChangePuc(tipo_contabilidad) {
    this.fnGetPucList(tipo_contabilidad, 'debit', 1, this.tam_pagina, '');
    this.fnGetPucList(tipo_contabilidad, 'credit', 1, this.tam_pagina, '');
  }

  fnCancelUpdatePUC() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
