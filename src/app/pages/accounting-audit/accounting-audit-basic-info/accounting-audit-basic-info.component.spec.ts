import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditBasicInfoComponent } from './accounting-audit-basic-info.component';

describe('AccountingAuditBasicInfoComponent', () => {
  let component: AccountingAuditBasicInfoComponent;
  let fixture: ComponentFixture<AccountingAuditBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
