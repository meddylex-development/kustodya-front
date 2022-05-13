import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionConfirmComponent } from './emision-confirm.component';

describe('EmisionConfirmComponent', () => {
  let component: EmisionConfirmComponent;
  let fixture: ComponentFixture<EmisionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmisionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmisionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
