import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdministratorComponent } from './delete-administrator.component';

describe('DeleteAdministratorComponent', () => {
  let component: DeleteAdministratorComponent;
  let fixture: ComponentFixture<DeleteAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
