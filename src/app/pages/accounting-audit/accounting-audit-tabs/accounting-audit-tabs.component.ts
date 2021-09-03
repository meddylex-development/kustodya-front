import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-accounting-audit-tabs',
  templateUrl: './accounting-audit-tabs.component.html',
  styleUrls: ['./accounting-audit-tabs.component.scss']
})
export class AccountingAuditTabsComponent implements OnInit {

  content_tab_basic_info: boolean = true;
  content_tab_accounting: boolean = false;
  content_tab_notes: boolean = false;
  content_tab_signature: boolean = false;
  token: any = null;
  data_user: any = [];
  @Input() id_accounting_edit;
  @Output() flagListAccountingAudit = new EventEmitter<number>();

  constructor(public router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    const self = this;
    // self.id_accounting_edit
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnChangeId(id_edit) {
    this.id_accounting_edit = id_edit;
  }

  fnChangeTab(tab_selected) {
    if(this.id_accounting_edit) {
      this.content_tab_basic_info = false;
      this.content_tab_accounting = false;
      this.content_tab_notes = false;
      this.content_tab_signature = false;
  
      this[tab_selected] = true;
    }
  }

  fnGoToList(msg) {
    this.flagListAccountingAudit.emit(msg);
  }

}
