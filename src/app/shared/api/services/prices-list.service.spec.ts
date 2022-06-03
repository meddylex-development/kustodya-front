import { TestBed } from '@angular/core/testing';

import { PricesListService } from './prices-list.service';

describe('PricesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricesListService = TestBed.get(PricesListService);
    expect(service).toBeTruthy();
  });
});
