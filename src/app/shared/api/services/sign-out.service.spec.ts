import { TestBed } from '@angular/core/testing';

import { SignOutService } from './sign-out.service';

describe('SignOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignOutService = TestBed.get(SignOutService);
    expect(service).toBeTruthy();
  });
});
