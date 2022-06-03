import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationConceptHistoryListComponent } from './rehabilitation-concept-history-list.component';

describe('RehabilitationConceptHistoryListComponent', () => {
  let component: RehabilitationConceptHistoryListComponent;
  let fixture: ComponentFixture<RehabilitationConceptHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitationConceptHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitationConceptHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
