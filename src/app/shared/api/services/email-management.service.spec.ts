import { TestBed } from '@angular/core/testing';

import { EmailManagementService } from './email-management.service';

describe('EmailManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailManagementService = TestBed.get(EmailManagementService);
    expect(service).toBeTruthy();
  });
});
