import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinDefensaAuditoriaComponent } from './min-defensa-auditoria.component';

describe('MinDefensaAuditoriaComponent', () => {
  let component: MinDefensaAuditoriaComponent;
  let fixture: ComponentFixture<MinDefensaAuditoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinDefensaAuditoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinDefensaAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
