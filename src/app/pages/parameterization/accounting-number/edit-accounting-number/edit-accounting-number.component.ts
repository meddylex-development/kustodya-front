import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-accounting-number',
  templateUrl: './edit-accounting-number.component.html',
  styleUrls: ['./edit-accounting-number.component.scss']
})
export class EditAccountingNumberComponent implements OnInit {

  @Input() accounting_number_data;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(
    protected ref: NbDialogRef<EditAccountingNumberComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
  }

  fnUpdateAccountingNumber(accounting_number_data) {
    this.submitted = true;
    let object_update_data_puc = {
      'codigo': accounting_number_data.codigo,
      'descripcion': accounting_number_data.descripcion,
      'esContabilidadPorDefecto': accounting_number_data.esContabilidadPorDefecto,
      'codigoPucCreditoMovimientoPorDefecto': accounting_number_data.credito,
      'codigoPucDebitoMovimientoPorDefecto': accounting_number_data.debito,
      'referenciaMovimientoPorDefecto': accounting_number_data.referenciaMovimientoPorDefecto,
      'descripcionMovimientoPorDefecto': accounting_number_data.descripcionMovimientoPorDefecto,
    }
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

  fnCancelUpdateAccountingNumber() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
