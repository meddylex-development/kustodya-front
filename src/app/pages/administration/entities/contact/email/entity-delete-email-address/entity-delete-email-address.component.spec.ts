import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteEmailAddressComponent } from './user-delete-email-address.component';

describe('UserDeleteEmailAddressComponent', () => {
  let component: UserDeleteEmailAddressComponent;
  let fixture: ComponentFixture<UserDeleteEmailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteEmailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
