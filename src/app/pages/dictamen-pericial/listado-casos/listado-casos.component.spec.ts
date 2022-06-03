import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCasosComponent } from './listado-casos.component';

describe('ListadoCasosComponent', () => {
  let component: ListadoCasosComponent;
  let fixture: ComponentFixture<ListadoCasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoCasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
