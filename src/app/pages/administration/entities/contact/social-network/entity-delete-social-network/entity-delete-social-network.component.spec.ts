import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteSocialNetworkComponent } from './user-delete-social-network.component';

describe('UserDeleteSocialNetworkComponent', () => {
  let component: UserDeleteSocialNetworkComponent;
  let fixture: ComponentFixture<UserDeleteSocialNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteSocialNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
