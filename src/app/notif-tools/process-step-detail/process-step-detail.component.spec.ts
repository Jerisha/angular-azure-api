import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStepDetailComponent } from './process-step-detail.component';

describe('ProcessStepDetailComponent', () => {
  let component: ProcessStepDetailComponent;
  let fixture: ComponentFixture<ProcessStepDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessStepDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessStepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
