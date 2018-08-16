import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSuppliersModalComponent } from './active-suppliers-modal.component';

describe('ActiveSuppliersModalComponent', () => {
  let component: ActiveSuppliersModalComponent;
  let fixture: ComponentFixture<ActiveSuppliersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSuppliersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSuppliersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
