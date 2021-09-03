import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSocialNetworkComponent } from './user-social-network.component';

describe('UserSocialNetworkComponent', () => {
  let component: UserSocialNetworkComponent;
  let fixture: ComponentFixture<UserSocialNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSocialNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
