import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';
import { ReportsService } from '../../../shared/api/services/reports.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
declare var $: any;

@Component({
  selector: 'ngx-reporte-resolucion',
  templateUrl: './reporte-resolucion.component.html',
  styleUrls: ['./reporte-resolucion.component.scss']
})
export class ReporteResolucionComponent implements OnInit {

  public flipped: boolean = false;
  public submitted: boolean = false;
  public token: any;
  public patientData: any = null;
  public diagnosticCodeDNI: any;
  public dataDoctor: any;
  public dataDetailAccounting: any;

  public powerbi: pbi.service.Service;
  public embedReportConfig: any = {};
  public current_payload: string = null;
  public dataMenu: any = null;

  constructor(
    private reportsService: ReportsService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {

    $(document).ready(function () {
      // $('.btn-show-search-form').click(); // Emulate click display right sidebar to hide
      window.onafterprint = () => {
        console.log("Print finishhhh!!!");
        $("#content-header").slideToggle("slow", (respSlide) => {
          console.log('respSlide: ', respSlide);
          $(".layout-container").css("padding-top", "4.75rem");
        });
      }
    });
    /* **** END - JQuery definition **** */
    this.dataMenu = JSON.parse(this.utilitiesService.fnGetSessionStorage('dataMenu'));
    console.log('this.dataMenu: ', this.dataMenu);
    console.log("Hola reporte resolucion");
    this.fnGetEmbedReport(this.current_payload);
  }

  fnGetEmbedReport(current_payload) {
    const groupId = this.dataMenu['reporteGroupId'];
    const reportId =  this.dataMenu['reporteId'];

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

  fnReturnPage(): void {
    // this.location.back();
  }

  print() {
    $("#content-header").slideToggle("slow", (respSlide) => {
      console.log('respSlide: ', respSlide);
      $(".layout-container").css("padding-top", 0);
      window.print();
    });
  }

}
