import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAdministratorListComponent } from './entity-administrator-list.component';

describe('EntityAdministratorListComponent', () => {
  let component: EntityAdministratorListComponent;
  let fixture: ComponentFixture<EntityAdministratorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAdministratorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAdministratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
