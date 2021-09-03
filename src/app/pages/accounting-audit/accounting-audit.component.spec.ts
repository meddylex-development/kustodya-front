import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditComponent } from './accounting-audit.component';

describe('AccountingAuditComponent', () => {
  let component: AccountingAuditComponent;
  let fixture: ComponentFixture<AccountingAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
