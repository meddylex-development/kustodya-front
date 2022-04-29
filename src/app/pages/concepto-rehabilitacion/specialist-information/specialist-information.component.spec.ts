import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistInformationComponent } from './specialist-information.component';

describe('SpecialistInformationComponent', () => {
  let component: SpecialistInformationComponent;
  let fixture: ComponentFixture<SpecialistInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
