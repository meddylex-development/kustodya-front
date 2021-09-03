import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddSocialNetworkComponent } from './user-add-social-network.component';

describe('UserAddSocialNetworkComponent', () => {
  let component: UserAddSocialNetworkComponent;
  let fixture: ComponentFixture<UserAddSocialNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddSocialNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
