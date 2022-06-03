import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountingNumberComponent } from './delete-accounting-number.component';

describe('DeleteAccountingNumberComponent', () => {
  let component: DeleteAccountingNumberComponent;
  let fixture: ComponentFixture<DeleteAccountingNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountingNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
