import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaCertificadoIncapacidadComponent } from './vista-previa-certificado-incapacidad.component';

describe('VistaPreviaCertificadoIncapacidadComponent', () => {
  let component: VistaPreviaCertificadoIncapacidadComponent;
  let fixture: ComponentFixture<VistaPreviaCertificadoIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaCertificadoIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaCertificadoIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
