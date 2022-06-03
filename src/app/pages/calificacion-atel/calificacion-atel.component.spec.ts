import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionAtelComponent } from './calificacion-atel.component';

describe('CalificacionAtelComponent', () => {
  let component: CalificacionAtelComponent;
  let fixture: ComponentFixture<CalificacionAtelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionAtelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionAtelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
