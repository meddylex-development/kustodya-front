import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountingNumberComponent } from './edit-accounting-number.component';

describe('EditAccountingNumberComponent', () => {
  let component: EditAccountingNumberComponent;
  let fixture: ComponentFixture<EditAccountingNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountingNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
