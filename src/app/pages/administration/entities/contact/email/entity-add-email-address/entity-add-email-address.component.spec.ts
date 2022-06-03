import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEmailAddressComponent } from './user-add-email-address.component';

describe('UserAddEmailAddressComponent', () => {
  let component: UserAddEmailAddressComponent;
  let fixture: ComponentFixture<UserAddEmailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddEmailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
