import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityComponent } from './incapacity.component';

describe('IncapacityComponent', () => {
  let component: IncapacityComponent;
  let fixture: ComponentFixture<IncapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
