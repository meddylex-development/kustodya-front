import { TestBed } from '@angular/core/testing';

import { EnumerationsService } from './enumerations.service';

describe('EnumerationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumerationsService = TestBed.get(EnumerationsService);
    expect(service).toBeTruthy();
  });
});
