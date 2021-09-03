import { TestBed } from '@angular/core/testing';

import { RehabilitationConceptService } from './rehabilitation-concept.service';

describe('RehabilitationConceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RehabilitationConceptService = TestBed.get(RehabilitationConceptService);
    expect(service).toBeTruthy();
  });
});
