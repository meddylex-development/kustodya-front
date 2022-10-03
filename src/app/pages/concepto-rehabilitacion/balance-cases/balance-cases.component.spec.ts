import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCasesComponent } from './balance-cases.component';

describe('BalanceCasesComponent', () => {
  let component: BalanceCasesComponent;
  let fixture: ComponentFixture<BalanceCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
