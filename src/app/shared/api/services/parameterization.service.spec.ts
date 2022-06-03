import { TestBed } from '@angular/core/testing';

import { ParameterizationService } from './parameterization.service';

describe('ParameterizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParameterizationService = TestBed.get(ParameterizationService);
    expect(service).toBeTruthy();
  });
});
