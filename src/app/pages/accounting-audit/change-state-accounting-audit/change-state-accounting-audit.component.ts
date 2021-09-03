import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

/* ************+ Import module auth ************ */
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { UserService } from '../../../shared/api/services/user.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
declare var $: any;

@Component({
  selector: 'ngx-change-state-accounting-audit',
  templateUrl: './change-state-accounting-audit.component.html',
  styleUrls: ['./change-state-accounting-audit.component.scss']
})
export class ChangeStateAccountingAuditComponent implements OnInit {

  @Input() accounting_audit_data: any;
  submitted: boolean = false;
  user_id: any = null;
  user_data: any = {};
  index: any = null;
  token: any = null;

  data_accounting_audit: any = {};
  // @Input() id_accounting_edit;
  loading_state: any = false;
  id_accounting_audit: any = false;

  constructor(
    private utilitiesService: UtilitiesService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auditService: AuditService,
    protected ref: NbDialogRef<ChangeStateAccountingAuditComponent>,
  ) { }

  ngOnInit() {
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
      self.id_accounting_audit = self.accounting_audit_data['id']
      self.fnGetAccountingNotesById(self.token, self.id_accounting_audit);
    } else {
      self.router.navigateByUrl('');
    }
  }

  fnGetAccountingNotesById(token, id_accounting_edit) {
    this.loading_state = true;
    this.auditService.fnHttpGetAccountingNotesById(token, id_accounting_edit).subscribe(response => {
      if (response.status == 200) {
        this.data_accounting_audit = response.body;
        this.loading_state = false;
      }
    }, err => {

    });
  }

  dismiss() {
    this.ref.close();
  }

  fnCancelChangeStateAccountingAudit() {
    this.submitted = false;
    this.dismiss();
  }

  fnChangeStateAccountingAudit(data_accounting, state) {
    const self = this;
    self.submitted = true;
    let data_send_accounting = {
      'claseDocumento': data_accounting.claseDocumento,
      'descripcionFicha': data_accounting.descripcionFicha,
      'fichaTecnicaAprobada': data_accounting.fichaTecnicaAprobada,
      'folios': data_accounting.folios,
      'situacionEncontrada': (data_accounting.situacionEncontrada) ? data_accounting.situacionEncontrada : '',
      'disposicionesLegales': (data_accounting.disposicionesLegales) ? data_accounting.disposicionesLegales : '',
      'accionesRealizadas': (data_accounting.accionesRealizadas) ? data_accounting.accionesRealizadas : '',
      'recomendaciones': (data_accounting.recomendaciones) ? data_accounting.recomendaciones : '',
      'anexos': (data_accounting.anexos) ? data_accounting.anexos : '',
      'estadoRevisor': state,
      'notaRevisor': data_accounting.notaRevisor,
      'id': self.id_accounting_audit,
    }
    self.auditService.fnHttpPutContabilidad(self.token, data_accounting['contabilidadId'], self.id_accounting_audit, data_send_accounting).subscribe(response => {
      if (response.status == 200 || response.status == 204 || response.status == 206) {
        self.user_data = {};
        self.submitted = false;
        self.utilitiesService.showToast('top-right', 'success', 'La contabilidad ha sido ' + ((state) ? "Aprobada" : "Rechazada") + ' correctamente!');
        self.dismiss();
      }
    }, err => {
      self.utilitiesService.showToast('top-right', 'warning', 'Ocurrio un error! Intentelo nuevamente', 'nb-alert');
      self.submitted = false;
    });
  }

}
