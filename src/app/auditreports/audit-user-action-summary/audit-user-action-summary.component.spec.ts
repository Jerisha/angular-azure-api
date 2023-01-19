import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditUserActionSummaryComponent } from './audit-user-action-summary.component';

describe('AuditUserActionSummaryComponent', () => {
  let component: AuditUserActionSummaryComponent;
  let fixture: ComponentFixture<AuditUserActionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditUserActionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditUserActionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
