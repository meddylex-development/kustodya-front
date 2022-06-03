import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPhoneNumberComponent } from './user-edit-phone-number.component';

describe('UserEditPhoneNumberComponent', () => {
  let component: UserEditPhoneNumberComponent;
  let fixture: ComponentFixture<UserEditPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
