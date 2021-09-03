import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionDiagnosticComponent } from './transcription-diagnostic.component';

describe('TranscriptionDiagnosticComponent', () => {
  let component: TranscriptionDiagnosticComponent;
  let fixture: ComponentFixture<TranscriptionDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
