import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationConceptDetailPreviewComponent } from './rehabilitation-concept-detail-preview.component';

describe('RehabilitationConceptDetailPreviewComponent', () => {
  let component: RehabilitationConceptDetailPreviewComponent;
  let fixture: ComponentFixture<RehabilitationConceptDetailPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabilitationConceptDetailPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabilitationConceptDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
