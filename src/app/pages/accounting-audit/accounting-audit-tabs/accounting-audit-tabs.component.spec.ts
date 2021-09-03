import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditTabsComponent } from './accounting-audit-tabs.component';

describe('AccountingAuditTabsComponent', () => {
  let component: AccountingAuditTabsComponent;
  let fixture: ComponentFixture<AccountingAuditTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
