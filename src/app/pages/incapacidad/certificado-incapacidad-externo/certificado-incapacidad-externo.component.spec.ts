import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoIncapacidadExternoComponent } from './certificado-incapacidad-externo.component';

describe('CertificadoIncapacidadExternoComponent', () => {
  let component: CertificadoIncapacidadExternoComponent;
  let fixture: ComponentFixture<CertificadoIncapacidadExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoIncapacidadExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoIncapacidadExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
