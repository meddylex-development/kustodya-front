import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjustmentTypeComponent } from './add-adjustment-type.component';

describe('AddAdjustmentTypeComponent', () => {
  let component: AddAdjustmentTypeComponent;
  let fixture: ComponentFixture<AddAdjustmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdjustmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdjustmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
