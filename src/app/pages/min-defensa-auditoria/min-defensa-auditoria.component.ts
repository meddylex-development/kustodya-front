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
  flag_show_tabs: number = 2;
  dataEntity: any;
  data_object: any;
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_entity: boolean = false;
  content_tab_signature: boolean = false;

  constructor() { }

  ngOnInit() {
    // this.flag_show_tabs
    console.log('this.flag_show_tabs: ', this.flag_show_tabs);
  }

  fnShowTabsOptionsData(obj_data_option: any) {
    console.log('obj_data_option: ', obj_data_option);
    this.data_object = obj_data_option['data_object'];
    console.log('this.data_object: ', this.data_object);
    this.flag_show_tabs = obj_data_option['tab_id'];
    console.log('this.flag_show_tabs: ', this.flag_show_tabs);
  }
}
