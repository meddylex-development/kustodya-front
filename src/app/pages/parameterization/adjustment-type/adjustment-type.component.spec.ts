import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentTypeComponent } from './adjustment-type.component';

describe('AdjustmentTypeComponent', () => {
  let component: AdjustmentTypeComponent;
  let fixture: ComponentFixture<AdjustmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
