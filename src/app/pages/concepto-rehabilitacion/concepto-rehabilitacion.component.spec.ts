import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoRehabilitacionComponent } from './concepto-rehabilitacion.component';

describe('ConceptoRehabilitacionComponent', () => {
  let component: ConceptoRehabilitacionComponent;
  let fixture: ComponentFixture<ConceptoRehabilitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoRehabilitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoRehabilitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
