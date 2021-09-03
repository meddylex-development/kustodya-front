import { TestBed } from '@angular/core/testing';

import { ActivateAccountService } from './activate-account.service';

describe('ActivateAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivateAccountService = TestBed.get(ActivateAccountService);
    expect(service).toBeTruthy();
  });
});
