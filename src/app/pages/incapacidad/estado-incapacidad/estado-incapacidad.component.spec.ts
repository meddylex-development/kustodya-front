import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoIncapacidadComponent } from './estado-incapacidad.component';

describe('EstadoIncapacidadComponent', () => {
  let component: EstadoIncapacidadComponent;
  let fixture: ComponentFixture<EstadoIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
