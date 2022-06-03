import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddAddressComponent } from './user-add-address.component';

describe('UserAddAddressComponent', () => {
  let component: UserAddAddressComponent;
  let fixture: ComponentFixture<UserAddAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
