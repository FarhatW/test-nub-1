import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidjFormComponent } from './admin-sidj-form.component';

describe('AdminSidjFormComponent', () => {
  let component: AdminSidjFormComponent;
  let fixture: ComponentFixture<AdminSidjFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSidjFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSidjFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
