import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddOtherInfoComponent } from './entity-add-other-info.component';

describe('EntityAddOtherInfoComponent', () => {
  let component: EntityAddOtherInfoComponent;
  let fixture: ComponentFixture<EntityAddOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
