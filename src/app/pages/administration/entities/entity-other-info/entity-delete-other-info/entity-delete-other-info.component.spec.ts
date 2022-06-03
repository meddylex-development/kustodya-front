import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDeleteOtherInfoComponent } from './entity-delete-other-info.component';

describe('EntityDeleteOtherInfoComponent', () => {
  let component: EntityDeleteOtherInfoComponent;
  let fixture: ComponentFixture<EntityDeleteOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDeleteOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDeleteOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
