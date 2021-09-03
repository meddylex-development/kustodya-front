import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailManagementComponent } from './add-email-management.component';

describe('AddEmailManagementComponent', () => {
  let component: AddEmailManagementComponent;
  let fixture: ComponentFixture<AddEmailManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmailManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
