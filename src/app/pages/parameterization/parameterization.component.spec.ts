import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterizationComponent } from './parameterization.component';

describe('ParameterizationComponent', () => {
  let component: ParameterizationComponent;
  let fixture: ComponentFixture<ParameterizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
