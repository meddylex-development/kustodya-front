import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDocumentTypeComponent } from './delete-document-type.component';

describe('DeleteDocumentTypeComponent', () => {
  let component: DeleteDocumentTypeComponent;
  let fixture: ComponentFixture<DeleteDocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
