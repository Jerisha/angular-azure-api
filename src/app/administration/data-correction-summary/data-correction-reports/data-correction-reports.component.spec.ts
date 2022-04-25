import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCorrectionReportsComponent } from './data-correction-reports.component';

describe('DataCorrectionReportsComponent', () => {
  let component: DataCorrectionReportsComponent;
  let fixture: ComponentFixture<DataCorrectionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCorrectionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCorrectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
