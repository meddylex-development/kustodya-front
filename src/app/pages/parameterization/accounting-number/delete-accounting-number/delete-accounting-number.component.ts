import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-delete-accounting-number',
  templateUrl: './delete-accounting-number.component.html',
  styleUrls: ['./delete-accounting-number.component.scss']
})
export class DeleteAccountingNumberComponent implements OnInit {

  @Input() accounting_number_data;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(
    protected ref: NbDialogRef<DeleteAccountingNumberComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
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
  
  fnSetDeleteAccountingNumber(accounting_number_data) {
    this.submitted = true;
    this.parameterizationService.fnHttpDeleteContabilidad(this.current_payload, accounting_number_data.codigo).subscribe(r => {
      if (r.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la contabilidad con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
  
  fnCancelDeleteAccountingNumber() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
