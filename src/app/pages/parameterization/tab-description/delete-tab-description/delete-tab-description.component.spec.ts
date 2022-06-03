import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTabDescriptionComponent } from './delete-tab-description.component';

describe('DeleteTabDescriptionComponent', () => {
  let component: DeleteTabDescriptionComponent;
  let fixture: ComponentFixture<DeleteTabDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTabDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTabDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
