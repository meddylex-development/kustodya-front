import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDeleteEntityComponent } from './entity-delete-entity.component';

describe('EntityDeleteEntityComponent', () => {
  let component: EntityDeleteEntityComponent;
  let fixture: ComponentFixture<EntityDeleteEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDeleteEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDeleteEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
