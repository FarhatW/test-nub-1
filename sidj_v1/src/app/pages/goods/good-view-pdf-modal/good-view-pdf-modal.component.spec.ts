import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodViewPdfModalComponent } from './good-view-pdf-modal.component';

describe('GoodViewPdfModalComponent', () => {
  let component: GoodViewPdfModalComponent;
  let fixture: ComponentFixture<GoodViewPdfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodViewPdfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodViewPdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
