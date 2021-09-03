import { TestBed } from '@angular/core/testing';

import { RethusService } from './rethus.service';

describe('RethusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RethusService = TestBed.get(RethusService);
    expect(service).toBeTruthy();
  });
});
