import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditexcelreportsComponent } from './auditexcelreports.component';

describe('AuditexcelreportsComponent', () => {
  let component: AuditexcelreportsComponent;
  let fixture: ComponentFixture<AuditexcelreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditexcelreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditexcelreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
