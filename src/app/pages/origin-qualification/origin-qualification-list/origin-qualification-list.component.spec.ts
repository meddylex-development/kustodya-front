import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginQualificationListComponent } from './origin-qualification-list.component';

describe('OriginQualificationListComponent', () => {
  let component: OriginQualificationListComponent;
  let fixture: ComponentFixture<OriginQualificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginQualificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginQualificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
