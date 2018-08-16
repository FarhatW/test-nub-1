import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListFormComponent } from './admin-list-form.component';

describe('AdminListFormComponent', () => {
  let component: AdminListFormComponent;
  let fixture: ComponentFixture<AdminListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
