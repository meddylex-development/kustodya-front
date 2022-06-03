import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinDefensaAuditoriaDetalleSentenciaComponent } from './min-defensa-auditoria-detalle-sentencia.component';

describe('MinDefensaAuditoriaDetalleSentenciaComponent', () => {
  let component: MinDefensaAuditoriaDetalleSentenciaComponent;
  let fixture: ComponentFixture<MinDefensaAuditoriaDetalleSentenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinDefensaAuditoriaDetalleSentenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinDefensaAuditoriaDetalleSentenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
