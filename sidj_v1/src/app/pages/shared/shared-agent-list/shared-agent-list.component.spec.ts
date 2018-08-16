import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAgentListComponent } from './shared-agent-list.component';

describe('SharedAgentListComponent', () => {
  let component: SharedAgentListComponent;
  let fixture: ComponentFixture<SharedAgentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedAgentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
