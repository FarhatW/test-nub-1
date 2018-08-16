import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProductListComponent } from './shared-product-list.component';

describe('SharedProductListComponent', () => {
  let component: SharedProductListComponent;
  let fixture: ComponentFixture<SharedProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
