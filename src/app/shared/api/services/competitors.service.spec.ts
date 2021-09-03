import { TestBed } from '@angular/core/testing';

import { CompetitorsService } from './competitors.service';

describe('CompetitorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetitorsService = TestBed.get(CompetitorsService);
    expect(service).toBeTruthy();
  });
});
