import { TestBed } from '@angular/core/testing';

import { RatingPerceivedService } from './rating-perceived.service';

describe('RatingPerceivedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RatingPerceivedService = TestBed.get(RatingPerceivedService);
    expect(service).toBeTruthy();
  });
});
