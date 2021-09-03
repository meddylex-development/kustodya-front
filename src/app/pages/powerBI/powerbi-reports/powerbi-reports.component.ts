import { Component, OnInit, Input, AfterViewInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../../../shared/api/services/reports.service';
import { UserService } from '../../../shared/api/services/user.service';
import { environment } from '../../../../environments/environment';
import { ModalInactivityUserComponent } from '../modal-inactivity-user/modal-inactivity-user.component';

import { Observable, Observer } from 'rxjs';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'ngx-powerbi-reports',
  templateUrl: './powerbi-reports.component.html',
  styleUrls: ['./powerbi-reports.component.scss'],
})
export class PowerbiReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() group_id: any;
  @Input() report_id: any;
  @Input() name_module: any;
  powerbi: pbi.service.Service;
  embedReportConfig: any = {};
  current_payload: string = null;
  dataChange: Observable<any>;
  dataChangeObserver: any;

  userActivity;
  userInactive: Subject<any> = new Subject();
  timeExpirePageReport = environment.timeExpireReport;

  constructor(
    private reportsService: ReportsService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    public router: Router,
    ) {
      this.dataChange = new Observable((observer: Observer<any>) => {
        this.dataChangeObserver = observer;
      });
    }

  ngOnInit() {
    // this.group_id
    const self = this;
    // this.showModalAlertInactivity({ 'data': 'German Pinilla' });
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.current_payload = params.token;
        this.userService.fnHttpSetAuditUser(this.current_payload, { 'descripcion': 'Ingreso ' + this.name_module, 'accion': 2 }).subscribe(resp => {
        });
        self.fnGetEmbedReport(self.current_payload, self.group_id, self.report_id);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  ngAfterViewInit() {
    this.dataChange.subscribe((data) => {
    });
  }

  fnActivityUser() {
    this.setTimeout();
    this.userInactive.subscribe(() => this.fnSetDestroyPowerBiConection());
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.timeExpirePageReport);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  fnGetEmbedReport(current_payload, group_id, report_id) {
    const groupId = group_id;
    const reportId = report_id;

    this.embedReportConfig = null;
    this.reportsService.fnHttpGetEmbedReport(current_payload, groupId, reportId).subscribe(r => {
      if (r.status == 200) {
        this.embedReportConfig = JSON.parse(JSON.stringify(r.body));

        this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);

        const config: pbi.IEmbedConfiguration = {
          type: 'report',
          tokenType: pbi.models.TokenType.Embed,
          accessToken: this.embedReportConfig.token,
          embedUrl: this.embedReportConfig.embedURL,
          id: this.embedReportConfig.reportID,
          permissions: pbi.models.Permissions.All,
          viewMode: pbi.models.ViewMode.View,
          settings: {
            filterPaneEnabled: false, // this will show/hide filter options
            navContentPaneEnabled: false,
          }
        };
        let reportContainer = <HTMLElement>document.getElementById('powerBIReportContainer');
        let report = this.powerbi.embed(reportContainer, config);
        // this.fnActivityUser();
      }
    }, err => {
    });
  }

  ngOnDestroy() {
    // this.fnSetDestroyPowerBiConection();
  }

  fnSetDestroyPowerBiConection() {
    this.showModalAlertInactivity({ 'data': 'German Pinilla' });
  }

  showModalAlertInactivity(obj_data) {
    obj_data['data_alert'] = obj_data;
    this.dialogService.open(ModalInactivityUserComponent, { context: obj_data }).onClose.subscribe((res) => {
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

}
