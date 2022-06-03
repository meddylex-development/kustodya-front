import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityUserComponent } from './incapacity-user.component';

describe('IncapacityUserComponent', () => {
  let component: IncapacityUserComponent;
  let fixture: ComponentFixture<IncapacityUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
