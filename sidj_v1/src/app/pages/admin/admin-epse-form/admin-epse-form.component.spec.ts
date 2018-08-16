import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEpseFormComponent } from './admin-epse-form.component';

describe('AdminEpseFormComponent', () => {
  let component: AdminEpseFormComponent;
  let fixture: ComponentFixture<AdminEpseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEpseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEpseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
