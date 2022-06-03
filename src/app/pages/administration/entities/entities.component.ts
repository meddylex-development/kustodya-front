import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {


  @Input() state: any;
  flag_show_tabs: number = 1;
  dataEntity: any;
  data_entity: any;
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_entity: boolean = false;
  content_tab_signature: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  fnShowTabsOptionsData(obj_data_option: any) {
    this.data_entity = obj_data_option['data_entity']; 
    this.flag_show_tabs = obj_data_option['tab_id'];
  }

  // fnGetEntityId(dataEntity) {
  //   this.dataEntity = dataEntity;
  // }

}
