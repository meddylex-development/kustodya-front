import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncapacityIssuanceComponent } from './incapacity-issuance.component';

describe('IncapacityIssuanceComponent', () => {
  let component: IncapacityIssuanceComponent;
  let fixture: ComponentFixture<IncapacityIssuanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncapacityIssuanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncapacityIssuanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
