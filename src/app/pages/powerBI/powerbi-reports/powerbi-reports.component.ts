import { Component, OnInit, Input, AfterViewInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../../../shared/api/services/reports.service';
import { UserService } from '../../../shared/api/services/user.service';
import { environment } from '../../../../environments/environment';
import { ModalInactivityUserComponent } from '../modal-inactivity-user/modal-inactivity-user.component';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

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
  public token: string = '';
  public userData: any = null; 
  public dataDoctor: any = null;
  public loading: boolean = false;
  public searchStatus: number = 0;
  public textSpinner: string = "Cargando...";
  powerbi: pbi.service.Service;
  embedReportConfig: any = {};
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
    private utilitiesService: UtilitiesService,
    public router: Router,
    ) {
      this.dataChange = new Observable((observer: Observer<any>) => {
        this.dataChangeObserver = observer;
      });
    }

  ngOnInit() {

    this.utilitiesService.fnAuthValidUser().then(response => {
      this.dataDoctor = JSON.parse(this.utilitiesService.fnGetUser());
      this.token = response['token'];
      this.userData = response['user'];
      // this.dataCase
      this.loading = true;

      this.userService.fnHttpSetAuditUser(this.token, { 'descripcion': 'Ingreso ' + this.name_module, 'accion': 2 }).subscribe(resp => {
      
      });
      
      this.fnGetEmbedReport(this.token, this.group_id, this.report_id);


      // this.fnGetDocumentTypes(this.token).then((response) => {
      //   if (response) {
      //     this.collectionDocumentTypes = response["body"];
      //     this.loading = false;
      //   } else {
      //     this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      //     this.loading = false;
      //     // this.dismiss(false);
      //   }
      // }).catch((err) => {
      //   this.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error!');
      //   this.loading = false;
      //   this.dismiss(false);
      // });

    }).catch(error => {
      // this.utilitiesService.fnSignOutUser().then(resp => {
      //   this.utilitiesService.fnNavigateByUrl('auth/login');
      // });
    });

    // this.group_id
    // const self = this;
    // // this.showModalAlertInactivity({ 'data': 'German Pinilla' });
    // self.route.params.subscribe(params => {
    //   if (params.token && params.entity) {
    //     self.token = params.token;
    //     this.userService.fnHttpSetAuditUser(this.token, { 'descripcion': 'Ingreso ' + this.name_module, 'accion': 2 }).subscribe(resp => {
    //     });
    //     self.fnGetEmbedReport(self.token, self.group_id, self.report_id);
    //   } else {
    //     self.router.navigateByUrl('');
    //   }
    // });
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

  fnGetEmbedReport(token, group_id, report_id) {
    console.log('group_id: ', group_id);
    console.log('report_id: ', report_id);
    const groupId = group_id;
    const reportId = report_id;

    this.embedReportConfig = null;
    this.reportsService.fnHttpGetEmbedReport(token, groupId, reportId).subscribe(r => {
      if (r.status == 200) {
        this.embedReportConfig = JSON.parse(JSON.stringify(r.body));
        console.log('this.embedReportConfig: ', this.embedReportConfig);

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
