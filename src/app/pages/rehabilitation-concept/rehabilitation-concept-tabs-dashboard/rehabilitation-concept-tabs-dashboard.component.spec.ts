import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RethusReportsComponent } from './rethus-reports.component';

describe('RethusReportsComponent', () => {
  let component: RethusReportsComponent;
  let fixture: ComponentFixture<RethusReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RethusReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RethusReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
