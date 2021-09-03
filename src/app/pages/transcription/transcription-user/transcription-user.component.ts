import { Component, OnInit,Input } from '@angular/core';

import { TranscriptionService } from '../../../shared/api/services/transcription.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TranscriptionIssuanceComponent } from '../transcription-issuance/transcription-issuance.component';


@Component({
  selector: 'ngx-transcription-user',
  templateUrl: './transcription-user.component.html',
  styleUrls: ['./transcription-user.component.scss']
})
export class TranscriptionUserComponent implements OnInit {

  @Input() paciente: any;

  constructor(
    private utilitiesService: UtilitiesService,
    private transcriptionService: TranscriptionService,
    private dashboardComponent: DashboardComponent,
    private transcriptionIssuanceComponent: TranscriptionIssuanceComponent,
  ) { }

  ngOnInit() {
  }

}
