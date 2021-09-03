import { TestBed } from '@angular/core/testing';

import { PriceCalculationSummaryService } from './price-calculation-summary.service';

describe('PriceCalculationSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceCalculationSummaryService = TestBed.get(PriceCalculationSummaryService);
    expect(service).toBeTruthy();
  });
});
