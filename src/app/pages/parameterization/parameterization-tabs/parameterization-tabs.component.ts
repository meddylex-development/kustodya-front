import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-parameterization-tabs',
  templateUrl: './parameterization-tabs.component.html',
  styleUrls: ['./parameterization-tabs.component.scss']
})
export class ParameterizationTabsComponent implements OnInit {

  content_tab_accounting: boolean = true
  content_tab_PUC: boolean = false
  content_tab_description: boolean = false
  content_tab_documents: boolean = false
  content_tab_adjustment: boolean = false
  content_tab_signature: boolean = false

  constructor() { }

  ngOnInit() {
  }

  fnChangeTab(tab_selected) {
    this.content_tab_accounting = false;
    this.content_tab_PUC = false;
    this.content_tab_description = false;
    this.content_tab_documents = false;
    this.content_tab_adjustment = false;
    this.content_tab_signature = false;

    this[tab_selected] = true;
  }

}
