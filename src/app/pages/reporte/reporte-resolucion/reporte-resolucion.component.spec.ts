import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteResolucionComponent } from './reporte-resolucion.component';

describe('ReporteResolucionComponent', () => {
  let component: ReporteResolucionComponent;
  let fixture: ComponentFixture<ReporteResolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteResolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
