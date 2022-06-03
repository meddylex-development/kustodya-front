import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RethusHistoricoComponent } from './rethus-historico.component';

describe('RethusHistoricoComponent', () => {
  let component: RethusHistoricoComponent;
  let fixture: ComponentFixture<RethusHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RethusHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RethusHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
