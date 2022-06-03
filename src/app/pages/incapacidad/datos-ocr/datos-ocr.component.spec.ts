import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosOcrComponent } from './datos-ocr.component';

describe('DatosOcrComponent', () => {
  let component: DatosOcrComponent;
  let fixture: ComponentFixture<DatosOcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosOcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
