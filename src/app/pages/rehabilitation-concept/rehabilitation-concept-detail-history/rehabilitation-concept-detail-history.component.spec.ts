import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationConceptDetailHistoryComponent } from './rehabilitation-concept-detail-history.component';

describe('RehabilitationConceptDetailHistoryComponent', () => {
  let component: RehabilitationConceptDetailHistoryComponent;
  let fixture: ComponentFixture<RehabilitationConceptDetailHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitationConceptDetailHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitationConceptDetailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
