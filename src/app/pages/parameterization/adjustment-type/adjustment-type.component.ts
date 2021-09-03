import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AddAdjustmentTypeComponent } from './add-adjustment-type/add-adjustment-type.component';
import { EditAdjustmentTypeComponent } from './edit-adjustment-type/edit-adjustment-type.component';
import { DeleteAdjustmentTypeComponent } from './delete-adjustment-type/delete-adjustment-type.component';
import { ParameterizationService } from "../../../shared/api/services/parameterization.service";

@Component({
  selector: 'ngx-adjustment-type',
  templateUrl: './adjustment-type.component.html',
  styleUrls: ['./adjustment-type.component.scss']
})
export class AdjustmentTypeComponent implements OnInit {

  list_adjustment_type: any = [];
  list_adjustment_type_original: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  text_search: any = '';
  current_payload: any = null;
  loading_state: boolean = false;

  constructor(private dialogService: NbDialogService,
    public router: Router,
    private parameterizationService: ParameterizationService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetListAdjustmentType(self.current_payload);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnShowModalNewAdjustmentType() {
    this.dialogService.open(AddAdjustmentTypeComponent, { }).onClose.subscribe((res) => {
      this.fnGetListAdjustmentType(this.current_payload);
    });
  }

  fnShowModalUpdateAdjustmentType(adjustment_type_data) {
    let object_send = {};
    object_send['data_adjustment_type'] = JSON.parse(JSON.stringify(adjustment_type_data));
    this.dialogService.open(EditAdjustmentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListAdjustmentType(this.current_payload);
    });
  }

  fnShowModalDeleteAdjustmentType(adjustment_type_data) {
    let object_send = {};
    object_send['adjustment_type_data'] = adjustment_type_data;
    this.dialogService.open(DeleteAdjustmentTypeComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListAdjustmentType(this.current_payload);
    });
  }

  
  fnGetListAdjustmentType(current_payload) {
    this.loading_state = true;
    this.parameterizationService.fnHttpGetListAdjustmentType(current_payload, this.text_search, this.currentPage).subscribe(r => {
      if (r.status == 200) {
        this.list_adjustment_type = JSON.parse(JSON.stringify(r['body']['items']));
        this.list_adjustment_type_original = JSON.parse(JSON.stringify(r['body']['items']));
        this.totalItems = r['body']['paginacion'].totalItems;
        this.numItemsPage = r['body']['paginacion'].itemsPorPagina;
        this.loading_state = false;
      }
    }, err => {
      this.list_adjustment_type = [];
      this.loading_state = false;
    });
  }

  getPage(page: number) {
    const self = this;
    self.currentPage = page;
    self.fnGetListAdjustmentType(self.current_payload);
  }

}
