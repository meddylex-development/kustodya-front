import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsOrderComponent } from './cards-order.component';

describe('CardsOrderComponent', () => {
  let component: CardsOrderComponent;
  let fixture: ComponentFixture<CardsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsOrderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
