import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCaseComponent } from './cancel-case.component';

describe('CancelCaseComponent', () => {
  let component: CancelCaseComponent;
  let fixture: ComponentFixture<CancelCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
