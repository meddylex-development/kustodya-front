import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionUserComponent } from './transcription-user.component';

describe('TranscriptionUserComponent', () => {
  let component: TranscriptionUserComponent;
  let fixture: ComponentFixture<TranscriptionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
