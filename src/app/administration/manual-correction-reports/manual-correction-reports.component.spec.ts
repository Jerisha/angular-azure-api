import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCorrectionReportsComponent } from './manual-correction-reports.component';

describe('ManualCorrectionReportsComponent', () => {
  let component: ManualCorrectionReportsComponent;
  let fixture: ComponentFixture<ManualCorrectionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualCorrectionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCorrectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
