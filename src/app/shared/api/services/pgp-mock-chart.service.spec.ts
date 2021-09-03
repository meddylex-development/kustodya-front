import { TestBed } from '@angular/core/testing';

import { PgpMockChartService } from './pgp-mock-chart.service';

describe('PgpMockChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PgpMockChartService = TestBed.get(PgpMockChartService);
    expect(service).toBeTruthy();
  });
});
