import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAuditTypeComponent } from './external-audit-type.component';

describe('ExternalAuditTypeComponent', () => {
  let component: ExternalAuditTypeComponent;
  let fixture: ComponentFixture<ExternalAuditTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalAuditTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalAuditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
