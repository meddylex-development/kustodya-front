import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIncapacidadComponent } from './crear-incapacidad.component';

describe('CrearIncapacidadComponent', () => {
  let component: CrearIncapacidadComponent;
  let fixture: ComponentFixture<CrearIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
