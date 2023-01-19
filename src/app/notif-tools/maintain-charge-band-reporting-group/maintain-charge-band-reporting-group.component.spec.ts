import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainChargeBandReportingGroupComponent } from './maintain-charge-band-reporting-group.component';

describe('MaintainChargeBandReportingGroupComponent', () => {
  let component: MaintainChargeBandReportingGroupComponent;
  let fixture: ComponentFixture<MaintainChargeBandReportingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainChargeBandReportingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainChargeBandReportingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
