import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTabDescriptionComponent } from './edit-tab-description.component';

describe('EditTabDescriptionComponent', () => {
  let component: EditTabDescriptionComponent;
  let fixture: ComponentFixture<EditTabDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTabDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTabDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
