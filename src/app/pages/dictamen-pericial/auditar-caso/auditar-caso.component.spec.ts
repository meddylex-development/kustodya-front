import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarCasoComponent } from './auditar-caso.component';

describe('AuditarCasoComponent', () => {
  let component: AuditarCasoComponent;
  let fixture: ComponentFixture<AuditarCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditarCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
