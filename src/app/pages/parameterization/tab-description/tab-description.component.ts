import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTabDescriptionComponent } from "./add-tab-description/add-tab-description.component";
import { EditTabDescriptionComponent } from "./edit-tab-description/edit-tab-description.component";
import { EditAdminSignatureComponent } from "./edit-admin-signature/edit-admin-signature.component";
import { DeleteTabDescriptionComponent } from "./delete-tab-description/delete-tab-description.component";
import { ParameterizationService } from "../../../shared/api/services/parameterization.service";

@Component({
  selector: 'ngx-tab-description',
  templateUrl: './tab-description.component.html',
  styleUrls: ['./tab-description.component.scss']
})
export class TabDescriptionComponent implements OnInit {

  content_signature_admin: boolean = false;
  content_tab_description: boolean = true;
  list_tab_description: any = [];
  list_tab_description_original: any = [];
  list_signature_admin: any = [];
  list_signature_admin_original: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  text_search: any = '';
  current_payload: any = null;
  loading_state: boolean = false;

  constructor(private dialogService: NbDialogService,
    public router: Router,
    private parameterizationService: ParameterizationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetListTemplate(self.current_payload);
        self.fnGetListSignatureAdmin(self.current_payload);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnShowModalNewTabDescription() {
    this.dialogService.open(AddTabDescriptionComponent, { }).onClose.subscribe((res) => {
      this.fnGetListTemplate(this.current_payload);
    });
  }

  fnShowModalUpdateTabDescription(tab_description_data) {
    let object_send = {};
    object_send['data_tab_description'] = JSON.parse(JSON.stringify(tab_description_data));
    this.dialogService.open(EditTabDescriptionComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListTemplate(this.current_payload);
    });
  }

  fnShowModalDeleteTabDescription(tab_description_data) {
    let object_send = {};
    object_send['tab_description_data'] = tab_description_data;
    this.dialogService.open(DeleteTabDescriptionComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListTemplate(this.current_payload);
    });
  }

  fnShowModalUpdateAdminSignature(signature_admin_data) {
    let object_send = {};
    object_send['data_signature_admin'] = signature_admin_data;
    object_send['list_signature_admin'] = this.list_signature_admin;
    this.dialogService.open(EditAdminSignatureComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListSignatureAdmin(this.current_payload);
    });
  }

  fnGetListTemplate(current_payload) {
    this.loading_state = true;
    this.parameterizationService.fnHttpGetListTemplate(current_payload, this.text_search, this.currentPage, this.numItemsPage, '').subscribe(r => {
      if (r.status == 200) {
        this.list_tab_description = JSON.parse(JSON.stringify(r['body']['plantillaOutputModel']));
        this.list_tab_description_original = JSON.parse(JSON.stringify(r['body']['plantillaOutputModel']));
        this.totalItems = r['body']['paginacion'].totalItems;
        this.numItemsPage = r['body']['paginacion'].itemsPorPagina;
        this.loading_state = false;
      }
    }, err => {
      this.list_tab_description = [];
      this.loading_state = false;
    });
  }

  fnGetListSignatureAdmin(current_payload) {
    this.parameterizationService.fnHttpGetListSignatureAdmin(current_payload).subscribe(r => {
      if (r.status == 200) {
        this.list_signature_admin = JSON.parse(JSON.stringify(r['body']));
        this.list_signature_admin_original = JSON.parse(JSON.stringify(r['body']));
      }
    }, err => {
      this.list_signature_admin = [];
    });
  }

}
