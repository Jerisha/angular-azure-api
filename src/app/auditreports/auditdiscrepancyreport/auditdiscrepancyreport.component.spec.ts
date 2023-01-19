import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditdiscrepancyreportComponent } from './auditdiscrepancyreport.component';

describe('AuditdiscrepancyreportComponent', () => {
  let component: AuditdiscrepancyreportComponent;
  let fixture: ComponentFixture<AuditdiscrepancyreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditdiscrepancyreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditdiscrepancyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
