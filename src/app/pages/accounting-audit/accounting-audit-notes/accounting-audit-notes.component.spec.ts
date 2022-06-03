import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditNotesComponent } from './accounting-audit-notes.component';

describe('AccountingAuditNotesComponent', () => {
  let component: AccountingAuditNotesComponent;
  let fixture: ComponentFixture<AccountingAuditNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
