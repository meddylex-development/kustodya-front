import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinDefensaAuditoriaListComponent } from './min-defensa-auditoria-list.component';

describe('MinDefensaAuditoriaListComponent', () => {
  let component: MinDefensaAuditoriaListComponent;
  let fixture: ComponentFixture<MinDefensaAuditoriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinDefensaAuditoriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinDefensaAuditoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
