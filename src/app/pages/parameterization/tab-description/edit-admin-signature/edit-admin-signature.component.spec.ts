import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminSignatureComponent } from './edit-admin-signature.component';

describe('EditAdminSignatureComponent', () => {
  let component: EditAdminSignatureComponent;
  let fixture: ComponentFixture<EditAdminSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
