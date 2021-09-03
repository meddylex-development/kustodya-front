import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-entities-tabs',
  templateUrl: './entities-tabs.component.html',
  styleUrls: ['./entities-tabs.component.scss']
})
export class EntitiesTabsComponent implements OnInit {

  constructor() { }

  data_user: any = {};
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false
  content_tab_admin: boolean = false
  content_tab_logo: boolean = false
  content_tab_others: boolean = false
  @Input() dataEntity: any;
  @Output() flagCreateEntity = new EventEmitter<object>();

  ngOnInit() {
    // this.dataEntity
  }

  fnShowGoBackList() {
    const object_data_entity = {
      'tab_id': 1,
      'data_entity': {id: 0, nombre: ''},
    }
    this.flagCreateEntity.emit(object_data_entity);
  }

}
