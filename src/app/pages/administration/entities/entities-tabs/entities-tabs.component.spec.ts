import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesTabsComponent } from './entities-tabs.component';

describe('EntitiesTabsComponent', () => {
  let component: EntitiesTabsComponent;
  let fixture: ComponentFixture<EntitiesTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
