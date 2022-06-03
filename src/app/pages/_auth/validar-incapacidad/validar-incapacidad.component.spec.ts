import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIncapacidadComponent } from './validar-incapacidad.component';

describe('ValidarIncapacidadComponent', () => {
  let component: ValidarIncapacidadComponent;
  let fixture: ComponentFixture<ValidarIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
