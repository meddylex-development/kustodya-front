import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditOtherInfoComponent } from './entity-edit-other-info.component';

describe('EntityEditOtherInfoComponent', () => {
  let component: EntityEditOtherInfoComponent;
  let fixture: ComponentFixture<EntityEditOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityEditOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
