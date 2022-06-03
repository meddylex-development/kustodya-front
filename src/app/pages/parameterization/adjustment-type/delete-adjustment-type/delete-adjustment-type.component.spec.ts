import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdjustmentTypeComponent } from './delete-adjustment-type.component';

describe('DeleteAdjustmentTypeComponent', () => {
  let component: DeleteAdjustmentTypeComponent;
  let fixture: ComponentFixture<DeleteAdjustmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAdjustmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdjustmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
