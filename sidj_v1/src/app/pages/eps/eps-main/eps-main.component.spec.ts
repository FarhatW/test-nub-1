import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsMainComponent } from './eps-main.component';

describe('EpsMainComponent', () => {
  let component: EpsMainComponent;
  let fixture: ComponentFixture<EpsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
