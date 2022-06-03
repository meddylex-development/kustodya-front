import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { AddAccountingComponent } from '../add-accounting-detail/add-accounting.component';
import { DeleteAccountingDetailComponent } from '../delete-accounting-detail/delete-accounting-detail.component';
import { EditAccountingDetailComponent } from '../edit-accounting-detail/edit-accounting-detail.component';
import { AuditService } from '../../../shared/api/services/audit-accounting.service';

@Component({
  selector: 'ngx-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  list_audit: any = [];
  @Input() id_accounting_edit;
  public current_payload: string = null;
  total_credito: any = null;
  total_debito: any = null;
  loading_state: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private utilitiesService: UtilitiesService,
    public router: Router,
    private route: ActivatedRoute,
    private auditService: AuditService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetInfoEncabezadoById(self.current_payload, self.id_accounting_edit);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }


  fnAddAudit() {
    const self = this;
    let obj_send = {};
    obj_send['encabezadoId'] = self.id_accounting_edit;
    self.dialogService.open(AddAccountingComponent, {context: obj_send }).onClose.subscribe((res) => {
      self.fnGetInfoEncabezadoById(self.current_payload, self.id_accounting_edit);
    });
  }

  fnShowEditAudit(accounting_detail_data) {
    const self = this;
    let obj_send = {};
    obj_send['accounting_audit_detail_data'] = JSON.parse(JSON.stringify(accounting_detail_data));
    self.dialogService.open(EditAccountingDetailComponent, {context: obj_send }).onClose.subscribe((res) => {
      self.fnGetInfoEncabezadoById(self.current_payload, self.id_accounting_edit);
    });
  }

  fnShowModalDeleteAudit(accounting_detail_data) {
    const self = this;
    let obj_send = {};
    obj_send['accounting_audit_detail_data'] = JSON.parse(JSON.stringify(accounting_detail_data));
    self.dialogService.open(DeleteAccountingDetailComponent, {context: obj_send }).onClose.subscribe((res) => {
      self.fnGetInfoEncabezadoById(self.current_payload, self.id_accounting_edit);
    });
  }

  fnGetInfoEncabezadoById(current_payload, id_accounting) {
    this.loading_state = true;
    this.auditService.fnHttpGetAccountingNotesById(current_payload, id_accounting).subscribe( r => {
      if (r.status == 200) {
        this.list_audit = r.body['movimientoOutputModel'];
        this.total_credito = r.body['totalCredito'];
        this.total_debito = r.body['totalDebito'];
        this.loading_state = false;
      }
    }, err => {
      this.loading_state = false;
    });
  }

}
