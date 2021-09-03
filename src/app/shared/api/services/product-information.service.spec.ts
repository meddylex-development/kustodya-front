import { TestBed } from '@angular/core/testing';

import { ProductInformationService } from './product-information.service';

describe('ProductInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInformationService = TestBed.get(ProductInformationService);
    expect(service).toBeTruthy();
  });
});
