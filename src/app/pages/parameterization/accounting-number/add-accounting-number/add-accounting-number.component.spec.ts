import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountingNumberComponent } from './add-accounting-number.component';

describe('AddAccountingNumberComponent', () => {
  let component: AddAccountingNumberComponent;
  let fixture: ComponentFixture<AddAccountingNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountingNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
