import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditEmailAddressComponent } from './user-edit-email-address.component';

describe('UserEditEmailAddressComponent', () => {
  let component: UserEditEmailAddressComponent;
  let fixture: ComponentFixture<UserEditEmailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditEmailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
