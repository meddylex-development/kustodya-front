import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRehabilitationConceptComponent } from './preview-rehabilitation-concept.component';

describe('PreviewRehabilitationConceptComponent', () => {
  let component: PreviewRehabilitationConceptComponent;
  let fixture: ComponentFixture<PreviewRehabilitationConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewRehabilitationConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRehabilitationConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
