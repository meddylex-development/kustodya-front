import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-edit-tab-description',
  templateUrl: './edit-tab-description.component.html',
  styleUrls: ['./edit-tab-description.component.scss']
})
export class EditTabDescriptionComponent implements OnInit {

  collection_section: any = [];
  @Input() data_tab_description;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(protected ref: NbDialogRef<EditTabDescriptionComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
    // self.data_tab_description
    self.current_payload = sessionStorage.getItem("token");
    self.fnGetListaTipoContabilidad(self.current_payload);
  }

  fnGetListaTipoContabilidad(current_payload) {
    this.parameterizationService.fnHttpGetTipoPlantillaContable(current_payload).subscribe(r => {
      if (r.status == 200) {
        this.collection_section = JSON.parse(JSON.stringify(r.body));
      }
    }, err => {
      this.collection_section = [];
    });
  }

  fnUpdateDescriptionTab(data_tab_description) {
    this.submitted = true;
    let object_send = {
      'tipoPlantilla': data_tab_description.tipoPlantilla,
      'texto': data_tab_description.texto
    }
    this.parameterizationService.fnHttpSetUpdatePlantilla(this.current_payload, object_send, data_tab_description.id).subscribe(r => {
      if (r.status == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha editado la plantilla con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
    
  fnCancelUpdateTabDescription() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
