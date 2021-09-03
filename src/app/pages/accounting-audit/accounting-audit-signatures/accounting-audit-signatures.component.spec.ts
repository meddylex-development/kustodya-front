import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditSignaturesComponent } from './accounting-audit-signatures.component';

describe('AccountingAuditSignaturesComponent', () => {
  let component: AccountingAuditSignaturesComponent;
  let fixture: ComponentFixture<AccountingAuditSignaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditSignaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
