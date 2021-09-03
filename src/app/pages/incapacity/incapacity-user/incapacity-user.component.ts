import { Component, OnInit,Input } from '@angular/core';

import { IncapacityService } from '../../../shared/api/services/incapacity.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IncapacityIssuanceComponent } from '../incapacity-issuance/incapacity-issuance.component';

@Component({
  selector: 'ngx-incapacity-user',
  templateUrl: './incapacity-user.component.html',
  styleUrls: ['./incapacity-user.component.scss']
})
export class IncapacityUserComponent implements OnInit {

  @Input() paciente: any;

  constructor(
    private utilitiesService: UtilitiesService,
    private incapacityService: IncapacityService,
    private dashboardComponent: DashboardComponent,
    private incapacityIssuanceComponent: IncapacityIssuanceComponent,
  ) { }

  ngOnInit() {
  }

}
