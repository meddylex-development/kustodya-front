import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterizationTabsComponent } from './parameterization-tabs.component';

describe('ParameterizationTabsComponent', () => {
  let component: ParameterizationTabsComponent;
  let fixture: ComponentFixture<ParameterizationTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterizationTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterizationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
