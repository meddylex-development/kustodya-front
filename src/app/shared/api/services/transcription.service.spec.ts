import { TestBed } from '@angular/core/testing';

import { TranscriptionService } from './transcription.service';

describe('TranscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranscriptionService = TestBed.get(TranscriptionService);
    expect(service).toBeTruthy();
  });
});
