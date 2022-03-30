import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCorrectionReportsComponent } from './auto-correction-reports.component';

describe('AutoCorrectionReportsComponent', () => {
  let component: AutoCorrectionReportsComponent;
  let fixture: ComponentFixture<AutoCorrectionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCorrectionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCorrectionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
