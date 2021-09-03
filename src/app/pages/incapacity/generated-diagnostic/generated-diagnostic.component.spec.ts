import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedDiagnosticComponent } from './generated-diagnostic.component';

describe('GeneratedDiagnosticComponent', () => {
  let component: GeneratedDiagnosticComponent;
  let fixture: ComponentFixture<GeneratedDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
