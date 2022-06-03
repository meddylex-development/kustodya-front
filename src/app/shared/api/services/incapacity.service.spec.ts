import { TestBed } from '@angular/core/testing';

import { IncapacityService } from './incapacity.service';

describe('IncapacityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncapacityService = TestBed.get(IncapacityService);
    expect(service).toBeTruthy();
  });
});
