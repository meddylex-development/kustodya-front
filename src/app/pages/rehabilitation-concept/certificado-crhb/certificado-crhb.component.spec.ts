import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoCrhbComponent } from './certificado-crhb.component';

describe('CertificadoCrhbComponent', () => {
  let component: CertificadoCrhbComponent;
  let fixture: ComponentFixture<CertificadoCrhbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoCrhbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoCrhbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
