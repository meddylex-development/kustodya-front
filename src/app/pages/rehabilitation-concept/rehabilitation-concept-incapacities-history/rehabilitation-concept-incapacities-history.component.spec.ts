import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationConceptIncapacitiesHistoryComponent } from './rehabilitation-concept-incapacities-history.component';

describe('RehabilitationConceptIncapacitiesHistoryComponent', () => {
  let component: RehabilitationConceptIncapacitiesHistoryComponent;
  let fixture: ComponentFixture<RehabilitationConceptIncapacitiesHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitationConceptIncapacitiesHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitationConceptIncapacitiesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
