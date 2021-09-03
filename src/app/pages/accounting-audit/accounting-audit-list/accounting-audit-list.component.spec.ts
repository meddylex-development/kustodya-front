import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditListComponent } from './accounting-audit-list.component';

describe('AccountingAuditListComponent', () => {
  let component: AccountingAuditListComponent;
  let fixture: ComponentFixture<AccountingAuditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
