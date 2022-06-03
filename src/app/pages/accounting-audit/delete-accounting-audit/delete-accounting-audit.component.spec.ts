import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountingAuditComponent } from './delete-accounting-audit.component';

describe('DeleteAccountingAuditComponent', () => {
  let component: DeleteAccountingAuditComponent;
  let fixture: ComponentFixture<DeleteAccountingAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountingAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountingAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
