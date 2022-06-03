import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
  selector: 'ngx-rethus',
  templateUrl: './rethus.component.html',
  styleUrls: ['./rethus.component.scss'],
})
export class RethusComponent implements OnInit {

  @Input() group_id: any;
  @Input() report_id: any;
  content_tab_individual_search: boolean = false;
  content_tab_upload_file: boolean = false;
  content_tab_files_history: boolean = false;
  content_tab_reports: boolean = true;

  token: any = null;
  entity: number = -1;
  flag_find_rethus: any = null;
  enum_document_type: any = null;
  document_number: any = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    // this.group_id reporteGroupId
    // this.report_id
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.entity = params.entity;
        self.flag_find_rethus = parseInt(params.findrethus, 10);
        self.enum_document_type = params.enumdoctype;
        self.document_number = params.docnumber;
        if (self.flag_find_rethus) {
          self.content_tab_individual_search = true;
          self.content_tab_upload_file = false;
          self.content_tab_files_history = false;
          self.content_tab_reports = false;
        }
      } else {
        self.router.navigateByUrl('');
      }
    });
  }
}
