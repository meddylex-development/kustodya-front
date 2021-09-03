import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeletePhoneNumberComponent } from './user-delete-phone-number.component';

describe('UserDeletePhoneNumberComponent', () => {
  let component: UserDeletePhoneNumberComponent;
  let fixture: ComponentFixture<UserDeletePhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeletePhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeletePhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
