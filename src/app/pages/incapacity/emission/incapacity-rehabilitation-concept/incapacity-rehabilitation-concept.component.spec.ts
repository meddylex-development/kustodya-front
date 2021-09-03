import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityRehabilitationConceptComponent } from './incapacity-rehabilitation-concept.component';

describe('IncapacityRehabilitationConceptComponent', () => {
  let component: IncapacityRehabilitationConceptComponent;
  let fixture: ComponentFixture<IncapacityRehabilitationConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityRehabilitationConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityRehabilitationConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
