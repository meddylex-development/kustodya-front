import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PUCComponent } from './puc.component';

describe('PUCComponent', () => {
  let component: PUCComponent;
  let fixture: ComponentFixture<PUCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PUCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PUCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
