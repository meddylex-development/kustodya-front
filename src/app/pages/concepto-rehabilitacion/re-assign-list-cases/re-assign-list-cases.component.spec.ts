import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAssignListCasesComponent } from './re-assign-list-cases.component';

describe('ReAssignListCasesComponent', () => {
  let component: ReAssignListCasesComponent;
  let fixture: ComponentFixture<ReAssignListCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAssignListCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAssignListCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
