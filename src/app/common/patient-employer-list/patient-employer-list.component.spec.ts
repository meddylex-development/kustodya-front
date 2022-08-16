import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmployerListComponent } from './patient-employer-list.component';

describe('PatientEmployerListComponent', () => {
  let component: PatientEmployerListComponent;
  let fixture: ComponentFixture<PatientEmployerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEmployerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEmployerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
