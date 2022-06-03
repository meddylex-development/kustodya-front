import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityHistoryComponent } from './incapacity-history.component';

describe('IncapacityHistoryComponent', () => {
  let component: IncapacityHistoryComponent;
  let fixture: ComponentFixture<IncapacityHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
