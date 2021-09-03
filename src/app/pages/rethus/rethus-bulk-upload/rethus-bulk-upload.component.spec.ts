import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RethusBulkUploadComponent } from './rethus-bulk-upload.component';

describe('RethusBulkUploadComponent', () => {
  let component: RethusBulkUploadComponent;
  let fixture: ComponentFixture<RethusBulkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RethusBulkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RethusBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
