import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiReportsComponent } from './powerbi-reports.component';

describe('PowerbiReportsComponent', () => {
  let component: PowerbiReportsComponent;
  let fixture: ComponentFixture<PowerbiReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerbiReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerbiReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
