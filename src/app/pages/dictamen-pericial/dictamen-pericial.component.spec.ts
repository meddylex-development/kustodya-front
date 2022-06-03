import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictamenPericialComponent } from './dictamen-pericial.component';

describe('DictamenPericialComponent', () => {
  let component: DictamenPericialComponent;
  let fixture: ComponentFixture<DictamenPericialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictamenPericialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictamenPericialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
