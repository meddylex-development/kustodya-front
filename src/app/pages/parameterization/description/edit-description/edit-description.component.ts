import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-description',
  templateUrl: './edit-description.component.html',
  styleUrls: ['./edit-description.component.scss']
})
export class EditDescriptionComponent implements OnInit {

  @Input() data_description;
  submitted: boolean = false;
  current_payload: any = null;
  required: boolean = true;

  constructor(protected ref: NbDialogRef<EditDescriptionComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
    self.current_payload = sessionStorage.getItem("token");
  }

  fnUpdateDescription(data_description) {
    let object_update_data_description = {
      'codigo': data_description.codigo,
      'descripcion': data_description.descripcion,
      'esContabilidadPorDefecto': data_description.esContabilidadPorDefecto,
      'codigoPucCreditoMovimientoPorDefecto': data_description.credito,
      'codigoPucDebitoMovimientoPorDefecto': data_description.debito,
      'referenciaMovimientoPorDefecto': data_description.referenciaMovimientoPorDefecto,
      'descripcionMovimientoPorDefecto': data_description.descripcionMovimientoPorDefecto,
    }
    this.submitted = true;
    this.parameterizationService.fnHttpSetNewContabilidad(this.current_payload, object_update_data_description).subscribe(r => {
      if (r.status == 201) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la descripcion con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }

  fnCancelUpdateDescription() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
