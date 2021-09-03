import { TestBed } from '@angular/core/testing';

import { SettingsVersionService } from './settings-version.service';

describe('SettingsVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsVersionService = TestBed.get(SettingsVersionService);
    expect(service).toBeTruthy();
  });
});
