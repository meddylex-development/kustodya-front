import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresIncapacidadComponent } from './valores-incapacidad.component';

describe('ValoresIncapacidadComponent', () => {
  let component: ValoresIncapacidadComponent;
  let fixture: ComponentFixture<ValoresIncapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresIncapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresIncapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
