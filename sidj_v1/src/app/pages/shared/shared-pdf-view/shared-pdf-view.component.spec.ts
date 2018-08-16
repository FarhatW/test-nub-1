import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPdfViewComponent } from './shared-pdf-view.component';

describe('SharedPdfViewComponent', () => {
  let component: SharedPdfViewComponent;
  let fixture: ComponentFixture<SharedPdfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPdfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
