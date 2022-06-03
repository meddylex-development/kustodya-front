import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-add-tab-description',
  templateUrl: './add-tab-description.component.html',
  styleUrls: ['./add-tab-description.component.scss']
})
export class AddTabDescriptionComponent implements OnInit {

  collection_section: any = [];
  data_tab_description: any = {};
  submitted: boolean = false;
  current_payload: any = null;

  constructor(protected ref: NbDialogRef<AddTabDescriptionComponent>,
    private utilitiesService: UtilitiesService,
    private parameterizationService: ParameterizationService,) { }

  ngOnInit() {
    const self = this;
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

  fnNewDescriptionTab(data_new_tab_description) {
    this.submitted = true;
    this.parameterizationService.fnHttpSetNewPlantilla(this.current_payload, data_new_tab_description).subscribe(r => {
      if (r.status == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha agregado la plantilla con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
    
  fnCancelNewTabDescription() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
