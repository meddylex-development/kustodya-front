import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmailManagementComponent } from './delete-email-management.component';

describe('DeleteEmailManagementComponent', () => {
  let component: DeleteEmailManagementComponent;
  let fixture: ComponentFixture<DeleteEmailManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEmailManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEmailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
