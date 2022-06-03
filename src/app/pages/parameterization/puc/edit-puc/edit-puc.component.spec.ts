import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPUCComponent } from './edit-puc.component';

describe('EditPUCComponent', () => {
  let component: EditPUCComponent;
  let fixture: ComponentFixture<EditPUCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPUCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPUCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
