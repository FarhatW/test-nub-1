import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsFileListComponent } from './eps-file-list.component';

describe('EpsFileListComponent', () => {
  let component: EpsFileListComponent;
  let fixture: ComponentFixture<EpsFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
