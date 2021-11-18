import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoIncapacidadComponent } from './certificado-incapacidad.component';

describe('CertificadoIncapacidadComponent', () => {
  let component: CertificadoIncapacidadComponent;
  let fixture: ComponentFixture<CertificadoIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
