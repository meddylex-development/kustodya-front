import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionPrintComponent } from './transcription-print.component';

describe('TranscriptionPrintComponent', () => {
  let component: TranscriptionPrintComponent;
  let fixture: ComponentFixture<TranscriptionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
