import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingAuditNoteEditComponent } from './accounting-audit-note-edit.component';

describe('AccountingAuditNoteEditComponent', () => {
  let component: AccountingAuditNoteEditComponent;
  let fixture: ComponentFixture<AccountingAuditNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingAuditNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingAuditNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
