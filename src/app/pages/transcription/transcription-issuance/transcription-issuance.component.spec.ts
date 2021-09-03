import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptionIssuanceComponent } from './transcription-issuance.component';

describe('TranscriptionIssuanceComponent', () => {
  let component: TranscriptionIssuanceComponent;
  let fixture: ComponentFixture<TranscriptionIssuanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptionIssuanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
