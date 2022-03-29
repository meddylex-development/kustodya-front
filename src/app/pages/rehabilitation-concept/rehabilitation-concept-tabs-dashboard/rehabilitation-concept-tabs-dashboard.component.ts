import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'ngx-rehabilitation-concept-tabs-dashboard',
  templateUrl: './rehabilitation-concept-tabs-dashboard.component.html',
  styleUrls: ['./rehabilitation-concept-tabs-dashboard.component.scss'],
})
export class RehabilitationConceptTabsDashboardComponent implements OnInit {

  content_tab_dashboard: boolean = false;
  content_tab_patients: boolean = true;

  @Input() data_object: any;
  @Output() flagCreateEntity = new EventEmitter<object>();

  ngOnInit() {
    // this.data_object
  }

  // fnShowGoBackList() {
  //   const object_data_entity = {
  //     'tab_id': 1,
  //     'data_entity': {id: 0, nombre: ''},
  //   };
  //   this.flagCreateEntity.emit(object_data_entity);
  // }

  fnShowTabsOptionsData(obj_data_option: any) {
    this.content_tab_dashboard = false;
    this.content_tab_patients = true;
    this.flagCreateEntity.emit(obj_data_option);
    // this.data_entity = obj_data_option['data_entity'];
    // this.flag_show_tabs = obj_data_option['tab_id'];
  }

}
