import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-accounting-audit',
  templateUrl: './accounting-audit.component.html',
  styleUrls: ['./accounting-audit.component.scss']
})
export class AccountingAuditComponent implements OnInit {

  @Output() dataAccounting = new EventEmitter<number>();
  @Input() state: any;
  flag_show_tabs: boolean = false;
  content_tab_basic_info: boolean = true;
  show_state: any = 1;
  accounting_id: number = null;
  group_id: any = '9a734879-194d-4d0e-abc4-e6ffca18345a';
  report_id: any = '0e8b1c44-f645-4af0-bc95-ad6ebfa4ffeb';

  constructor() { }

  ngOnInit() {
  }

  fnShowTabsCreate(flag: number) {
    this.show_state = flag;
  }

  fnShowTabsEdit(accounting_id) {
    this.show_state = 3;
    this.accounting_id = accounting_id;
  }

}
