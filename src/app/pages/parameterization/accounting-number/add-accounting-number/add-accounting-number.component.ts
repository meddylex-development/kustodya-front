import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-add-accounting-number',
  templateUrl: './add-accounting-number.component.html',
  styleUrls: ['./add-accounting-number.component.scss']
})
export class AddAccountingNumberComponent implements OnInit {

  accounting_number_data: any = {};
  submitted: boolean = false;
  current_payload: any = null;

  constructor(
    protected ref: NbDialogRef<AddAccountingNumberComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
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


  fnCreateNewAccountingNumber(accounting_number_data) {
    this.parameterizationService.fnHttpSetNewContabilidad(this.current_payload, accounting_number_data).subscribe(r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha creado la contabilidad con exito!');
        this.dismiss();
        this.submitted = true;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
  
  fnCancelNewAccountingNumber() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }


}
