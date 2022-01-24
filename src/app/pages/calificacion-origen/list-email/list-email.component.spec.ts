import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmailComponent } from './list-email.component';

describe('ListEmailComponent', () => {
  let component: ListEmailComponent;
  let fixture: ComponentFixture<ListEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
