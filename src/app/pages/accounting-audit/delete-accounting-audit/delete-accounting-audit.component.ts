import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-delete-accounting-audit',
  templateUrl: './delete-accounting-audit.component.html',
  styleUrls: ['./delete-accounting-audit.component.scss']
})
export class DeleteAccountingAuditComponent implements OnInit {

  @Input() accounting_audit_data: any;
  public current_payload: string = null;
  submitted: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteAccountingAuditComponent>,
  ) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem('payload');
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.current_payload = params.token;
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });
  }

  fnSetDeleteAccountingAuditById(accounting_audit_data) {
    this.submitted = true;
    this.auditService.fnHttpDeleteContabilidadEncabezado(this.current_payload, accounting_audit_data.id).subscribe(resp_delete_accounting_audit => {
      if (resp_delete_accounting_audit.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la depuracion con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {

    });
  }

  fnCancelDeleteAccountingAudit() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }
}
