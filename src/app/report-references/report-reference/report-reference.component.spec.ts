import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReferenceComponent } from './report-reference.component';

describe('ReportReferenceComponent', () => {
  let component: ReportReferenceComponent;
  let fixture: ComponentFixture<ReportReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
