import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApplyCaseComponent } from './no-apply-case.component';

describe('NoApplyCaseComponent', () => {
  let component: NoApplyCaseComponent;
  let fixture: ComponentFixture<NoApplyCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoApplyCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoApplyCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
