import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'ngx-min-defensa-auditoria',
  templateUrl: './min-defensa-auditoria.component.html',
  styleUrls: ['./min-defensa-auditoria.component.scss']
})
export class MinDefensaAuditoriaComponent implements OnInit {
  @Input() group_id: any;
  @Input() report_id: any;
  @Input() state: any;
  flag_show_tabs: number = 1;
  dataEntity: any;
  data_object: any;
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_entity: boolean = false;
  content_tab_signature: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  fnShowTabsOptionsData(obj_data_option: any) {
    this.data_object = obj_data_option['data_object'];
    this.flag_show_tabs = obj_data_option['tab_id'];
  }
}
