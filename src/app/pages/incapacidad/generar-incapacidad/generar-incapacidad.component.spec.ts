import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarIncapacidadComponent } from './generar-incapacidad.component';

describe('GenerarIncapacidadComponent', () => {
  let component: GenerarIncapacidadComponent;
  let fixture: ComponentFixture<GenerarIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
