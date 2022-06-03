import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { ParameterizationService } from "../../../../shared/api/services/parameterization.service";
import { UtilitiesService } from "../../../../shared/api/services/utilities.service";

@Component({
  selector: 'ngx-delete-tab-description',
  templateUrl: './delete-tab-description.component.html',
  styleUrls: ['./delete-tab-description.component.scss']
})
export class DeleteTabDescriptionComponent implements OnInit {

  @Input() tab_description_data;
  submitted: boolean = false;
  current_payload: any = null;

  constructor(protected ref: NbDialogRef<DeleteTabDescriptionComponent>,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
    private utilitiesService: UtilitiesService,) { }

  ngOnInit() {
    this.current_payload = sessionStorage.getItem("token");
  }

  fnSetDeleteTabDescription(data_tab_description) {
    this.submitted = true;
    this.parameterizationService.fnHttpDeletePlantilla(this.current_payload, data_tab_description.id).subscribe(r => {
      if (r.status == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Se ha eliminado la descripción de la ficha con exito!');
        this.dismiss();
        this.submitted = false;
      }
    }, err => {
      this.dismiss();
      this.utilitiesService.showToast('top-right', 'warning', err.error);
    });
  }
  
  fnCancelDeleteTabDescription() {
    this.submitted = false;
    this.dismiss();
  }

  
  dismiss() {
    this.ref.close();
  }

}
