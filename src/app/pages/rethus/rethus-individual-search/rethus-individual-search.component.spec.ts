import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RethusIndividualSearchComponent } from './rethus-individual-search.component';

describe('RethusIndividualSearchComponent', () => {
  let component: RethusIndividualSearchComponent;
  let fixture: ComponentFixture<RethusIndividualSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RethusIndividualSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RethusIndividualSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
