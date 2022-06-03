import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailAddressComponent } from './user-email-address.component';

describe('UserEmailAddressComponent', () => {
  let component: UserEmailAddressComponent;
  let fixture: ComponentFixture<UserEmailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEmailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
