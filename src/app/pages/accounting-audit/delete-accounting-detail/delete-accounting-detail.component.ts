import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-delete-accounting-detail',
  templateUrl: './delete-accounting-detail.component.html',
  styleUrls: ['./delete-accounting-detail.component.scss']
})
export class DeleteAccountingDetailComponent implements OnInit {

  @Input() accounting_audit_detail_data: any;
  public current_payload: string = null;
  submitted: boolean = false;

  constructor(
    private utilitiesService: UtilitiesService,
    private auditService: AuditService,
    public router: Router,
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DeleteAccountingDetailComponent>,
  ) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem("token");
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.current_payload = params.token;
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });
  }

  fnSetDeleteAccountingAuditDetailById(accounting_audit_detail_data) {
    this.submitted = true;
    this.auditService.fnHttpDeleteContabilidadDetalle(this.current_payload, accounting_audit_detail_data.id).subscribe(resp_delete_accounting_audit => {
      if (resp_delete_accounting_audit.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el detalle con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {

    });
  }

  fnCancelDeleteAccountingAuditDetail() {
    this.dismiss();
  }

  dismiss() {
    this.ref.close();
  }

}
