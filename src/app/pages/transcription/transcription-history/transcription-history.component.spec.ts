import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionHistoryComponent } from './transcription-history.component';

describe('TranscriptionHistoryComponent', () => {
  let component: TranscriptionHistoryComponent;
  let fixture: ComponentFixture<TranscriptionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
