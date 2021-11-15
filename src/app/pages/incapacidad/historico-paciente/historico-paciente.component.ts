import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-historico-paciente',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './historico-paciente.component.html',
  styleUrls: ['./historico-paciente.component.scss']
})
export class HistoricoPacienteComponent implements OnInit {

  public patientData: any = null;
  public patientIncapacities: any = null;
  public totalItems: any = null;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public flipped: boolean = false;

  constructor(
    private location: Location,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    let data = this.utilitiesService.fnGetDataShare();
    if (data) {
      this.patientData = data['patientData'];
      this.patientIncapacities = data['patientIncapacities'];
      this.totalItems = data['patientIncapacities'].length;
    } else {
      this.patientData = null;
      this.patientIncapacities = null;
      this.totalItems = null;
    }
  }

  fnReturnPage(): void {
    this.location.back();
  }

  fnViewHistory() {
    console.log('this.flipped: ', this.flipped);
    this.flipped = (this.flipped) ? false : true;
  }

}
