import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteAddressComponent } from './user-delete-address.component';

describe('UserDeleteAddressComponent', () => {
  let component: UserDeleteAddressComponent;
  let fixture: ComponentFixture<UserDeleteAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
