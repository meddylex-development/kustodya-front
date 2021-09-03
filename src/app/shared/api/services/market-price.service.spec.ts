import { TestBed } from '@angular/core/testing';

import { MarketPriceService } from './market-price.service';

describe('MarketPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketPriceService = TestBed.get(MarketPriceService);
    expect(service).toBeTruthy();
  });
});
