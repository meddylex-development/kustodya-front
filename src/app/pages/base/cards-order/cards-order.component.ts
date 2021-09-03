import { Component, OnInit, OnDestroy } from '@angular/core';
import { PgpMockChartService } from '../../../shared/api/services/pgp-mock-chart.service';

@Component({
  selector: 'ngx-cards-order',
  templateUrl: './cards-order.component.html',
  styleUrls: ['./cards-order.component.scss'],
})
export class CardsOrderComponent implements OnDestroy, OnInit {
  myData: any[] = [];
  myType: String = '';
  myTitle: String = '';
  chartOptions  = {
    title: 'My Daily Activities',
    height: 500,
  };
  constructor(public mockchart: PgpMockChartService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  fnGetDataMock() {
    this.mockchart.fnHttpGetDataMock().subscribe(data_response => {
    });
  }

}
