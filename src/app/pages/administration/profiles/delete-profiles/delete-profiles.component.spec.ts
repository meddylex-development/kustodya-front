import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfilesComponent } from './delete-profiles.component';

describe('DeleteProfilesComponent', () => {
  let component: DeleteProfilesComponent;
  let fixture: ComponentFixture<DeleteProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
