import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdjustmentTypeComponent } from './edit-adjustment-type.component';

describe('EditAdjustmentTypeComponent', () => {
  let component: EditAdjustmentTypeComponent;
  let fixture: ComponentFixture<EditAdjustmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdjustmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdjustmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
