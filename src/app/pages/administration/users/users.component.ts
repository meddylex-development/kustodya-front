import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  @Input() state: any;
  flag_show_tabs: number = 1;
  dataUser: any;
  content_tab_basic_info: boolean = true;
  content_tab_contact: boolean = false;
  content_tab_entity: boolean = false;
  content_tab_signature: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  fnShowTabsOptionsData(flag: number) {
    this.flag_show_tabs = flag;
  }

  fnGetUserId(dataUser) {
    this.dataUser = dataUser;
  }

}
