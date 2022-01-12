import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIncapacidadesComponent } from './reporte-incapacidades.component';

describe('ReporteIncapacidadesComponent', () => {
  let component: ReporteIncapacidadesComponent;
  let fixture: ComponentFixture<ReporteIncapacidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIncapacidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIncapacidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
