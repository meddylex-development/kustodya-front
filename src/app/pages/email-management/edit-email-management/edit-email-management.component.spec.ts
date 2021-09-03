import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailManagementComponent } from './edit-email-management.component';

describe('EditEmailManagementComponent', () => {
  let component: EditEmailManagementComponent;
  let fixture: ComponentFixture<EditEmailManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
