import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneAuditTrailComponent } from './telephone-audit-trail.component';

describe('TelephoneAuditTrailComponent', () => {
  let component: TelephoneAuditTrailComponent;
  let fixture: ComponentFixture<TelephoneAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneAuditTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
