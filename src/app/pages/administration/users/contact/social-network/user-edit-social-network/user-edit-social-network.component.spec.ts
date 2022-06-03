import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditSocialNetworkComponent } from './user-edit-social-network.component';

describe('UserEditSocialNetworkComponent', () => {
  let component: UserEditSocialNetworkComponent;
  let fixture: ComponentFixture<UserEditSocialNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditSocialNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
