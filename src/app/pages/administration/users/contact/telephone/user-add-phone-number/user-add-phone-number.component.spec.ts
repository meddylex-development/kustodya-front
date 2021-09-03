import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPhoneNumberComponent } from './user-add-phone-number.component';

describe('UserAddPhoneNumberComponent', () => {
  let component: UserAddPhoneNumberComponent;
  let fixture: ComponentFixture<UserAddPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
