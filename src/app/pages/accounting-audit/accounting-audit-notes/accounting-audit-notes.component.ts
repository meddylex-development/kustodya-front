import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { UserService } from '../../../shared/api/services/user.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { AccountingAuditNoteEditComponent } from '../accounting-audit-notes/accounting-audit-note-edit/accounting-audit-note-edit.component';

@Component({
  selector: 'ngx-accounting-audit-notes',
  templateUrl: './accounting-audit-notes.component.html',
  styleUrls: ['./accounting-audit-notes.component.scss']
})
export class AccountingAuditNotesComponent implements OnInit {

  data_accounting_audit: any = {};
  @Input() id_accounting_edit;
  public current_payload: string = null;
  submitted: boolean = false;
  loading_state: any = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        // self.id_accounting_edit
        self.fnGetAccountingNotesById(self.current_payload, self.id_accounting_edit);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnGetAccountingNotesById(current_payload, id_accounting_edit) {
    this.loading_state = true;
    this.auditService.fnHttpGetAccountingNotesById(current_payload, id_accounting_edit).subscribe(response_notes => {
      if (response_notes.status == 200) {
        this.data_accounting_audit = response_notes.body;
        this.loading_state = false;
        // "situacionEncontrada": null,
        // "disposicionesLegales": null,
        // "accionesRealizadas": null,
        // "recomendaciones": null,
        // "anexos": null,
      }
    }, err => {

    });
  }

  fnEditFormNotesAccountingAudit(data_accounting_notes) {
    this.submitted = true;
    let data_send_accounting = {
      "id": data_accounting_notes.id,
      "fechaElaboracion": data_accounting_notes.fechaElaboracion,
      "fichaTecnica": data_accounting_notes.fichaTecnica,
      "descripcionFicha": data_accounting_notes.descripcionFicha,
      "fichaTecnicaAprobada": data_accounting_notes.fichaTecnicaAprobada,
      "folios": data_accounting_notes.folios,
      "situacionEncontrada": data_accounting_notes.situacionEncontrada,
      "disposicionesLegales": data_accounting_notes.disposicionesLegales,
      "accionesRealizadas": data_accounting_notes.accionesRealizadas,
      "recomendaciones": data_accounting_notes.recomendaciones,
      "anexos": data_accounting_notes.anexos,
      "elaboradoporId": data_accounting_notes.elaboradoporId,
      "coordinadorId": data_accounting_notes.coordinadorId,
      "gerenteId": data_accounting_notes.gerenteId,
      "interventorId": data_accounting_notes.interventorId,
      "claseDocumento": data_accounting_notes.claseDocumento,
      "estado": 1,
    }
    this.auditService.fnHttpPutEncabezadoById(this.current_payload, data_send_accounting).subscribe( r => {
      if (r.status == 204) {
        this.submitted = false;
        this.fnGetAccountingNotesById(this.current_payload, this.id_accounting_edit);
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la depuracion con exito');
      }
    }, err => {

    });
  }

  fnEditPhoneUser(token, id_depuracion, id_contabilidad, data_template_note) {
    const self = this;
    self.submitted = true;
    self.auditService.fnHttpSetUpdateTemplateNote(token, id_depuracion, id_contabilidad, data_template_note).subscribe(r => {
      if (r.status == 204) {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la plantilla correctamente!');
      }
      if (r.status == 200) {
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la plantilla correctamente!');
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

  showModalEditGeneralNote(tipe_note ,data_accounting_audit) {
    const self = this;
    data_accounting_audit['data_note'] = data_accounting_audit;
    data_accounting_audit['id_accouting_audit'] = self.id_accounting_edit;
    data_accounting_audit['tipe_note'] = tipe_note;
    // data_accounting_audit['index'] = index;
    self.dialogService.open(AccountingAuditNoteEditComponent, { context: data_accounting_audit }).onClose.subscribe((res) => {
      self.fnGetAccountingNotesById(self.current_payload, self.id_accounting_edit);
    });
  }

  showModalDeleteGeneralNote(data_accounting_audit, field) {
    const self = this;
    let data_template_note = {
      'claseDocumento': data_accounting_audit['claseDocumento'],
      'descripcionFicha': data_accounting_audit['descripcionFicha'],
      'fichaTecnicaAprobada': data_accounting_audit['fichaTecnicaAprobada'],
      'folios': data_accounting_audit['folios'],
      'situacionEncontrada':  data_accounting_audit['situacionEncontrada'] != null ? data_accounting_audit['situacionEncontrada'] : '',
      'disposicionesLegales': data_accounting_audit['disposicionesLegales'] != null ? data_accounting_audit['disposicionesLegales'] : '',
      'accionesRealizadas': data_accounting_audit['accionesRealizadas'] != null ? data_accounting_audit['accionesRealizadas'] : '',
      'recomendaciones': data_accounting_audit['recomendaciones'] != null ? data_accounting_audit['recomendaciones'] : '',
      'anexos': data_accounting_audit['anexos'] != null ? data_accounting_audit['anexos'] : '',
      'id': data_accounting_audit['id'],
    };
    data_accounting_audit[field] = '';
    self.fnEditPhoneUser(self.current_payload, self.id_accounting_edit, data_accounting_audit['contabilidadId'], data_template_note)
  }


}
