import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AddAccountingNumberComponent } from "./add-accounting-number/add-accounting-number.component";
import { EditAccountingNumberComponent } from "./edit-accounting-number/edit-accounting-number.component";
import { DeleteAccountingNumberComponent } from "./delete-accounting-number/delete-accounting-number.component";
import { ParameterizationService } from "../../../shared/api/services/parameterization.service";

@Component({
  selector: 'ngx-accounting-number',
  templateUrl: './accounting-number.component.html',
  styleUrls: ['./accounting-number.component.scss']
})
export class AccountingNumberComponent implements OnInit {

  list_accounting_numbers: any = [];
  currentPage: number = 1;
  numItemsPage: number = 10;
  totalItems: number = 10;
  current_payload: any = null;
  text_search: any = '';
  loading_state: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    public router: Router,
    private route: ActivatedRoute,
    private parameterizationService: ParameterizationService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        self.fnGetListContabilidades(self.current_payload, self.currentPage, self.text_search);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnShowModalNewAccountingNumber() {
    this.dialogService.open(AddAccountingNumberComponent, { }).onClose.subscribe((res) => {
      this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
    });
  }

  fnShowModalUpdateAccountingNumber(acounting_number_data) {
    let object_send = {};
    object_send['accounting_number_data'] = acounting_number_data;
    this.dialogService.open(EditAccountingNumberComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
    });
  }

  fnGetListContabilidades(current_payload, currentPage, text_search) {
    this.loading_state = true;
    this.parameterizationService.fnHttpGetListContabilidades(current_payload, currentPage, text_search).subscribe(r => {
      if (r.status == 200) {
        this.list_accounting_numbers = JSON.parse(JSON.stringify(r.body.contabilidades));
        this.totalItems = r.body.paginacion.totalItems;
        this.numItemsPage = r.body.paginacion.itemsPorPagina;
        this.loading_state = false;
      }
    }, err => {
      this.loading_state = false;
      this.list_accounting_numbers = [];
    });
  }

  fnShowModalDeleteAccountingNumber(acounting_number_data) {
    let object_send = {};
    object_send['accounting_number_data'] = acounting_number_data;
    this.dialogService.open(DeleteAccountingNumberComponent, { context: object_send }).onClose.subscribe((res) => {
      this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
    });
  }

  getPage(page) {
    this.currentPage = page;
    this.fnGetListContabilidades(this.current_payload, this.currentPage, this.text_search);
  }
  

}
