import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginQualificationTranscriptionComponent } from './origin-qualification-transcription.component';

describe('OriginQualificationTranscriptionComponent', () => {
  let component: OriginQualificationTranscriptionComponent;
  let fixture: ComponentFixture<OriginQualificationTranscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginQualificationTranscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginQualificationTranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
