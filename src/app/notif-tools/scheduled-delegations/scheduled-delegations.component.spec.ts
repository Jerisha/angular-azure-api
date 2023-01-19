import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDelegationsComponent } from './scheduled-delegations.component';

describe('ScheduledDelegationsComponent', () => {
  let component: ScheduledDelegationsComponent;
  let fixture: ComponentFixture<ScheduledDelegationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledDelegationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDelegationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
