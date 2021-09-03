import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountingDetailComponent } from './delete-accounting-detail.component';

describe('DeleteAccountingDetailComponent', () => {
  let component: DeleteAccountingDetailComponent;
  let fixture: ComponentFixture<DeleteAccountingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
