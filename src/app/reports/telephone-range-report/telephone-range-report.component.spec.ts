import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneRangeReportComponent } from './telephone-range-report.component';

describe('TelephoneRangeReportComponent', () => {
  let component: TelephoneRangeReportComponent;
  let fixture: ComponentFixture<TelephoneRangeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneRangeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneRangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
