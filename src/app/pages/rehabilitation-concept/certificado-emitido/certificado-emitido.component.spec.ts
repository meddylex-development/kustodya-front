import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoEmitidoComponent } from './certificado-emitido.component';

describe('CertificadoEmitidoComponent', () => {
  let component: CertificadoEmitidoComponent;
  let fixture: ComponentFixture<CertificadoEmitidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoEmitidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoEmitidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
