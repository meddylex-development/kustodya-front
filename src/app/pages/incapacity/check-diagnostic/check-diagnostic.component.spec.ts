import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDiagnosticComponent } from './check-diagnostic.component';

describe('CheckDiagnosticComponent', () => {
  let component: CheckDiagnosticComponent;
  let fixture: ComponentFixture<CheckDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
