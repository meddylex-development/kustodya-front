import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { UtilitiesService } from '../../../../shared/api/services/utilities.service';
import { UserService } from '../../../../shared/api/services/user.service';
import { ParameterizationService } from '../../../../shared/api/services/parameterization.service';
import { AuditService } from '../../../../shared/api/services/audit-accounting.service';
declare var $: any;

@Component({
  selector: 'ngx-accounting-audit-note-edit',
  templateUrl: './accounting-audit-note-edit.component.html',
  styleUrls: ['./accounting-audit-note-edit.component.scss']
})
export class AccountingAuditNoteEditComponent implements OnInit {

  @Input() data_note: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  index: any = null;
  token: any = null;
  flag_button_select: boolean = false;
  id_type_template: any = null;

  search_input: any = '';
  list_templates: any = [];
  list_templates_original: any = [];
  collection_templates: any = [];
  numItemsPage: number = null;
  // numItemsPage: number = 10;
  currentPage: number = null;
  totalItems: number = null;

  constructor(
    private utilitiesService: UtilitiesService,
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private parameterizationService: ParameterizationService,
    private auditService: AuditService,
    protected ref: NbDialogRef<AccountingAuditNoteEditComponent>,
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
      self.index = self.data_note['index'];
      self.id_type_template = 
      (self.data_note['tipe_note'] == 'situacionEncontrada') ? 1 : 
      (self.data_note['tipe_note'] == 'disposicionesLegales') ? 2 :
      (self.data_note['tipe_note'] == 'accionesRealizadas') ? 3 :
      (self.data_note['tipe_note'] == 'recomendaciones') ? 4 :
      (self.data_note['tipe_note'] == 'anexos') ? 5 : 0;
      self.fnGetListTemplate(self.token, '', self.currentPage, self.numItemsPage, self.id_type_template);
    } else {
      self.router.navigateByUrl('');
    }
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelEditPhoneUser() {
    this.submitted = false;
    this.dismiss();
  }

  fnGetListTemplate(token, text_search, currentPage, numItemsPage, tipoPlantilla) {
    // Instancia de conexion servicio
    const self = this;
    self.parameterizationService.fnHttpGetListTemplate(token, text_search, currentPage, numItemsPage, tipoPlantilla).subscribe(r => {
      if (r.status == 200) {
        self.list_templates = JSON.parse(JSON.stringify(r['body']['plantillaOutputModel']));
        self.list_templates_original = JSON.parse(JSON.stringify(r['body']['plantillaOutputModel']));
        self.totalItems = r['body']['paginacion'].totalItems;
        self.numItemsPage = r['body']['paginacion'].itemsPorPagina;
        self.currentPage = r['body']['paginacion'].paginaActual;
      }
    }, err => {
      self.list_templates = [];
      this.utilitiesService.showToast('top-right', 'danger', 'Occurio un error');
    });
  }

  fnFilter(text_search) {
    const self = this;
    if (text_search.length > 3 || text_search.length > 0) {
      self.fnGetListTemplate(self.token, text_search, self.currentPage, self.numItemsPage, self.id_type_template);
    }
  }

  /** Funciones para Pagindo **/
  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetListTemplate(self.token, self.search_input, self.currentPage, self.numItemsPage, self.id_type_template);
  }

  fnSelectTemplateNote(index, data_template) {
    const self = this;
    if (!self.list_templates[index]['flag_button_select']) {
      self.flag_button_select = true;
      self.list_templates[index]['flag_button_select'] = true;
      self.collection_templates.push(
        {
          'claseDocumento': self.data_note['claseDocumento'],
          'descripcionFicha': self.data_note['descripcionFicha'],
          'fichaTecnicaAprobada': self.data_note['fichaTecnicaAprobada'],
          'folios': self.data_note['folios'],
          'situacionEncontrada': (self.data_note['tipe_note'] == 'situacionEncontrada') ? data_template['texto'] : self.data_note['situacionEncontrada'],
          'disposicionesLegales': (self.data_note['tipe_note'] == 'disposicionesLegales') ? data_template['texto'] : self.data_note['disposicionesLegales'],
          'accionesRealizadas': (self.data_note['tipe_note'] == 'accionesRealizadas') ? data_template['texto'] : self.data_note['accionesRealizadas'],
          'recomendaciones': (self.data_note['tipe_note'] == 'recomendaciones') ? data_template['texto'] : self.data_note['recomendaciones'],
          'anexos': (self.data_note['tipe_note'] == 'anexos') ? data_template['texto'] : self.data_note['anexos'],
          'id': data_template['id'],
        }  
      );
    } else {
      self.flag_button_select = false;
      self.list_templates[index]['flag_button_select'] = false;
      self.collection_templates = [];
    }
  }

  fnSaveTemplateNote(collection_templates) {
    const self = this;
    let text_note = '';
    let cont = 0;
    collection_templates.forEach(function(value, key) {
      cont++;
      text_note = text_note + ' ' + value[self.data_note['tipe_note']];
      value[self.data_note['tipe_note']] = text_note;
      value['accionesRealizadas'] = value['accionesRealizadas'] != null ? value['accionesRealizadas'] : '';
      value['anexos'] = value['anexos'] != null ? value['anexos'] : '';
      value['claseDocumento'] = value['claseDocumento'] != null ? value['claseDocumento'] : '';
      value['descripcionFicha'] = value['descripcionFicha'] != null ? value['descripcionFicha'] : '';
      value['disposicionesLegales'] = value['disposicionesLegales'] != null ? value['disposicionesLegales'] : '';
      value['fichaTecnicaAprobada'] = value['fichaTecnicaAprobada'] != null ? value['fichaTecnicaAprobada'] : '';
      value['folios'] = value['folios'];
      value['id'] = value['id'];
      value['recomendaciones'] = value['recomendaciones'] != null ? value['recomendaciones'] : '';
      value['situacionEncontrada'] = value['situacionEncontrada'] != null ? value['situacionEncontrada'] : '';
      if (collection_templates.length == cont) {
        self.fnEditPhoneUser(self.token, self.data_note['id_accouting_audit'], self.data_note['contabilidadId'], value);
      }
    });

    // collection_templates
  }

  fnEditPhoneUser(token, id_depuracion, id_contabilidad, data_template_note) {
    const self = this;
    self.submitted = true;
    self.auditService.fnHttpSetUpdateTemplateNote(token, id_depuracion, id_contabilidad, data_template_note).subscribe(r => {
      if (r.status == 204) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'La platilla a sido asociada correctamente!');
        self.dismiss();
      }
      if (r.status == 200) {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'La platilla a sido asociada correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
