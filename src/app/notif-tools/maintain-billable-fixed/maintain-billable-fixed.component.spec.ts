import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainBillableFixedComponent } from './maintain-billable-fixed.component';

describe('MaintainBillableFixedComponent', () => {
  let component: MaintainBillableFixedComponent;
  let fixture: ComponentFixture<MaintainBillableFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainBillableFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainBillableFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
