import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContableComponent } from './registro-contable.component';

describe('RegistroContableComponent', () => {
  let component: RegistroContableComponent;
  let fixture: ComponentFixture<RegistroContableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroContableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
