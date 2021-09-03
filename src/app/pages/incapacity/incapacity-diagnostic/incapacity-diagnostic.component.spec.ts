import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityDiagnosticComponent } from './incapacity-diagnostic.component';

describe('IncapacityDiagnosticComponent', () => {
  let component: IncapacityDiagnosticComponent;
  let fixture: ComponentFixture<IncapacityDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
