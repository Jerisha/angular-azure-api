import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainDurationThresholdComponent } from './maintain-duration-threshold.component';

describe('MaintainDurationThresholdComponent', () => {
  let component: MaintainDurationThresholdComponent;
  let fixture: ComponentFixture<MaintainDurationThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainDurationThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainDurationThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
