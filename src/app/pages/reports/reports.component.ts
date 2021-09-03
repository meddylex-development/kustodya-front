import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as pbi from 'powerbi-client';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../../shared/api/services/reports.service';


@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  powerbi: pbi.service.Service;
  embedReportConfig: any = {};
  current_payload: string = null;
  constructor(
    private authService: NbAuthService,
    public router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private reportsService: ReportsService) { }

  ngOnInit() {
    this.fnGetEmbedReport(this.current_payload);
  }

  fnGetEmbedReport(current_payload) {
    const groupId = '9a734879-194d-4d0e-abc4-e6ffca18345a';
    const reportId = 'cd599dbb-c46f-412b-ab87-3aff05e2b69a';

    this.embedReportConfig = null;
    this.reportsService.fnHttpGetEmbedReport(current_payload, groupId, reportId).subscribe(r => {
      if (r.status == 200) {
        this.embedReportConfig = JSON.parse(JSON.stringify(r.body));

        this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

        var config: pbi.IEmbedConfiguration = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: this.embedReportConfig.token, // "embedded token you generated in your server side :: embedReportConfig.token",
          embedUrl: this.embedReportConfig.embedURL, //"Report Url :: embedReportConfig.embedURL",
          id: this.embedReportConfig.reportID, // "Report ID :: embedReportConfig.reportID",
          permissions: pbi.models.Permissions.All,
          viewMode: pbi.models.ViewMode.View,
          settings: {
            filterPaneEnabled: false, // this will show/hide filter options
            navContentPaneEnabled: false,
          }
        };
        let reportContainer = <HTMLElement>document.getElementById('powerBIReportContainer');
        let report = this.powerbi.embed(reportContainer, config);
      }
    }, err => {
    });
  }

}
