import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateAccountingAuditComponent } from './change-state-accounting-audit.component';

describe('ChangeStateAccountingAuditComponent', () => {
  let component: ChangeStateAccountingAuditComponent;
  let fixture: ComponentFixture<ChangeStateAccountingAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStateAccountingAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStateAccountingAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
