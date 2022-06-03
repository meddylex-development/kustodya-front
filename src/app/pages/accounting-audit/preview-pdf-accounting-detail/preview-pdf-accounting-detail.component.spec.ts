import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPdfAccountingDetailComponent } from './preview-pdf-accounting-detail.component';

describe('PreviewPdfAccountingDetailComponent', () => {
  let component: PreviewPdfAccountingDetailComponent;
  let fixture: ComponentFixture<PreviewPdfAccountingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPdfAccountingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPdfAccountingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
