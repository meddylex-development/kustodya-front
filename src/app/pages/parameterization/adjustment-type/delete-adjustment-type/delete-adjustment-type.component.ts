import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-delete-adjustment-type',
  templateUrl: './delete-adjustment-type.component.html',
  styleUrls: ['./delete-adjustment-type.component.scss']
})
export class DeleteAdjustmentTypeComponent implements OnInit {

  @Input() adjustment_type_data;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(
    protected ref: NbDialogRef<DeleteAdjustmentTypeComponent>,
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
  
  fnSetDeleteAdjustmentType(adjustment_type_data) {
    this.submitted = true;
    this.parameterizationService.fnHttpDeleteAdjustmentType(this.current_payload, adjustment_type_data.codigoContabilidad, adjustment_type_data.descripcion).subscribe(r => {
      if (r.status == 204) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado el tipo de ajuste con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

  fnCancelDeleteAdjustmentType() {
    this.submitted = false;
    this.dismiss();
  }
  
  dismiss() {
    this.ref.close();
  }

}
