import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabDescriptionComponent } from './add-tab-description.component';

describe('AddTabDescriptionComponent', () => {
  let component: AddTabDescriptionComponent;
  let fixture: ComponentFixture<AddTabDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTabDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
