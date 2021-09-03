import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginQualificationComponent } from './origin-qualification.component';

describe('OriginQualificationComponent', () => {
  let component: OriginQualificationComponent;
  let fixture: ComponentFixture<OriginQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
