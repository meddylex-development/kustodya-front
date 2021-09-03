import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RehabilitationConceptService } from '../../../shared/api/services/rehabilitation-concept.service';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
  selector: 'ngx-rehabilitation-concept-dashboard',
  templateUrl: './rehabilitation-concept-dashboard.component.html',
  styleUrls: ['./rehabilitation-concept-dashboard.component.scss'],
})
export class RehabilitationConceptDashboardComponent implements OnInit {

  loading_state: any = false;
  title = 'Grafica reportes de emisión por concepto de rehabilitación';
  type = 'ComboChart';
  // data = [
  //   //  ['Lunes', 3, 2, 2.5],
  //   //  ['Martes', 2, 3, 2.5],
  //   //  ['Miercoles', 1, 5, 3],
  //   //  ['Jueves', 3, 2, 2.5],
  //   //  ['Viernes', 3, 9, 6],
  //   //  ['Sabado', 4, 2, 3],
  //   //  ['Domingo', 4, 2, 3],
  // ];
  data: any = null;
  columnNames = ['Loaction', 'Emitido', 'Pendiente por emitir', 'Promedio'];
  options = {
    hAxis: {
      title: 'Intervalo de tiempo',
    },
    vAxis: {
      title: 'Número emisiones por concepto de rehabilitación',
    },
    seriesType: 'bars',
    series: {
      0: { color: '#1f9eff' },
      1: { color: '#6dbbff' },
      2: { type: 'line' },
    },
  };
  width = 600;
  height = 350;
  data_results: any = {
    'hoy': 0,
    'totalPendientes': 0,
    'ultimaSemana': 0,
    'ultimoMes': 0,
  };
  collection_time_interval: any = [
    { 'id': 1, 'name': 'Hoy' },
    { 'id': 2, 'name': 'Semana' },
    { 'id': 3, 'name': 'Mes' },
    { 'id': 4, 'name': 'Año' },
  ];
  time_interval: number = null;
  @Output() flagCreateEntity = new EventEmitter<object>();
  @Output() dataEntity = new EventEmitter<object>();
  token: any = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public rehabilitationConceptService: RehabilitationConceptService,
    public utilitiesService: UtilitiesService,
  ) { }

  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      if (params.token && params.entity) {
        self.token = params.token;
        self.time_interval = self.collection_time_interval[0].id;
        self.fnGetDataDashboardByPeriod('hoy', self.token);
      } else {
        self.router.navigateByUrl('');
      }
    });
  }

  fnChangeTimeIntervalChart(time_interval) {
    const self = this;
    self.data = [];
    self.fnGetDataDashboardByPeriod(time_interval['name'].toLowerCase(), self.token);
    // switch (time_interval) {
    //   case 1:
    //     this.data = [
    //       ['Lunes', 3, 2, 2.5],
    //       ['Martes', 2, 3, 2.5],
    //       ['Miercoles', 1, 5, 3],
    //       ['Jueves', 3, 2, 2.5],
    //       ['Viernes', 3, 9, 6],
    //       ['Sabado', 4, 2, 3],
    //       ['Domingo', 4, 2, 3],
    //     ];
    //     break;
    //   case 2:
    //     this.data = [
    //       ['Semana 1', 3, 2, 2.5],
    //       ['Semana 2', 2, 3, 2.5],
    //       ['Semana 3', 1, 5, 3],
    //       ['Semana 4', 3, 2, 2.5],
    //     ];
    //     break;
    //   case 3:
    //     this.data = [
    //       ['Enero', 3, 2, 2.5],
    //       ['Febrero', 2, 3, 2.5],
    //       ['Marzo', 1, 5, 3],
    //       ['Abril', 3, 2, 2.5],
    //       ['Mayo', 3, 9, 6],
    //       ['Junio', 4, 2, 3],
    //       ['Julio', 4, 2, 3],
    //       ['Agosto', 3, 2, 2.5],
    //       ['Septiembre', 2, 3, 2.5],
    //       ['Octubre', 1, 5, 3],
    //       ['Noviembre', 3, 2, 2.5],
    //       ['Diciembre', 4, 2, 3],
    //     ];
    //     break;
    //   case 4:
    //     this.data = [
    //       ['2016', 3, 2, 2.5],
    //       ['2017', 2, 3, 2.5],
    //       ['2018', 1, 5, 3],
    //       ['2019', 3, 2, 2.5],
    //       ['2020', 3, 9, 6],
    //     ];
    //     break;
    // }
  }

  fnGetDataDashboardByPeriod(period, token) {
    const self = this;
    self.loading_state = true;
    self.data_results = {
      'hoy': 0,
      'totalPendientes': 0,
      'ultimaSemana': 0,
      'ultimoMes': 0,
    };
    self.rehabilitationConceptService.fnHttpGetDataDashboardByPeriod(token, period).subscribe(response => {
      if (response.status == 200) {
        self.loading_state = false;
        const array_data = eval(response['body']['categorias']);
        self.data = eval(response['body']['categorias']);
        self.data_results = response['body']['dashBoardGlobales'];
      } else {
          // self.utilitiesService.showToast('top-right', 'danger', 'Ocurrio un error', 'nb-alert');
        self.loading_state = false;
        }
      }, err => {
        self.loading_state = false;
      });
    }
}
