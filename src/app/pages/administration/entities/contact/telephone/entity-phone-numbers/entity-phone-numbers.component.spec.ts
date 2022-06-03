import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhoneNumbersComponent } from './user-phone-numbers.component';

describe('UserPhoneNumbersComponent', () => {
  let component: UserPhoneNumbersComponent;
  let fixture: ComponentFixture<UserPhoneNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhoneNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhoneNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
