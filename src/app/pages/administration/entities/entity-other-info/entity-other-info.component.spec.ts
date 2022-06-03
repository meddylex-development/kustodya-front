import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityOtherInfoComponent } from './entity-other-info.component';

describe('EntityOtherInfoComponent', () => {
  let component: EntityOtherInfoComponent;
  let fixture: ComponentFixture<EntityOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
