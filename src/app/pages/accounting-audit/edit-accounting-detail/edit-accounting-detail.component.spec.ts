import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountingDetailComponent } from './edit-accounting-detail.component';

describe('EditAccountingDetailComponent', () => {
  let component: EditAccountingDetailComponent;
  let fixture: ComponentFixture<EditAccountingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
