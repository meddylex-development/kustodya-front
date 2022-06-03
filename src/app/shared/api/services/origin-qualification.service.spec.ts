import { TestBed } from '@angular/core/testing';

import { OriginQualificationService } from './origin-qualification.service';

describe('OriginQualificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OriginQualificationService = TestBed.get(OriginQualificationService);
    expect(service).toBeTruthy();
  });
});
