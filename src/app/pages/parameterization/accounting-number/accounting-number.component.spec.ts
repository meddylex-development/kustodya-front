import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingNumberComponent } from './accounting-number.component';

describe('AccountingNumberComponent', () => {
  let component: AccountingNumberComponent;
  let fixture: ComponentFixture<AccountingNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
