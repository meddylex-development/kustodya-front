import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAddressComponent } from './build-address.component';

describe('BuildAddressComponent', () => {
  let component: BuildAddressComponent;
  let fixture: ComponentFixture<BuildAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
