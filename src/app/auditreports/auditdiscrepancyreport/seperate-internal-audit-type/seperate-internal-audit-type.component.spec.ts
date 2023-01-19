import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeperateInternalAuditTypeComponent } from './seperate-internal-audit-type.component';

describe('SeperateInternalAuditTypeComponent', () => {
  let component: SeperateInternalAuditTypeComponent;
  let fixture: ComponentFixture<SeperateInternalAuditTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeperateInternalAuditTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeperateInternalAuditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
