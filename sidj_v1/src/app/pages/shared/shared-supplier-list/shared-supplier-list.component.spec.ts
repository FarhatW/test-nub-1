import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSupplierListComponent } from './shared-supplier-list.component';

describe('SharedSupplierListComponent', () => {
  let component: SharedSupplierListComponent;
  let fixture: ComponentFixture<SharedSupplierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSupplierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
