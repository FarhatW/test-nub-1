import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccusbatteriesListComponent } from './accusbatteries-list.component';

describe('AccusbatteriesListComponent', () => {
  let component: AccusbatteriesListComponent;
  let fixture: ComponentFixture<AccusbatteriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccusbatteriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccusbatteriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
