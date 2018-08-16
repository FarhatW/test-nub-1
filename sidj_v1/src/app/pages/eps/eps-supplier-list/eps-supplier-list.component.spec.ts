import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsSupplierListComponent } from './eps-supplier-list.component';

describe('EpsSupplierListComponent', () => {
  let component: EpsSupplierListComponent;
  let fixture: ComponentFixture<EpsSupplierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsSupplierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
