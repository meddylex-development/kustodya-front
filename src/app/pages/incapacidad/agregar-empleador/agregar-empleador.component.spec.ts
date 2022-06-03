import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpleadorComponent } from './agregar-empleador.component';

describe('AgregarEmpleadorComponent', () => {
  let component: AgregarEmpleadorComponent;
  let fixture: ComponentFixture<AgregarEmpleadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEmpleadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
