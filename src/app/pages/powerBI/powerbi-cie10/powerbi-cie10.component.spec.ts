import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiCie10Component } from './powerbi-cie10.component';

describe('PowerbiCie10Component', () => {
  let component: PowerbiCie10Component;
  let fixture: ComponentFixture<PowerbiCie10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerbiCie10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerbiCie10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
