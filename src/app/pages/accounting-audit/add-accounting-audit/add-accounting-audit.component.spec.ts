import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountingAuditComponent } from './add-accounting-audit.component';

describe('AddAccountingAuditComponent', () => {
  let component: AddAccountingAuditComponent;
  let fixture: ComponentFixture<AddAccountingAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountingAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountingAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
