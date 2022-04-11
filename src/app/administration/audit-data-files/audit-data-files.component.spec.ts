import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDataFilesComponent } from './audit-data-files.component';

describe('AuditDataFilesComponent', () => {
  let component: AuditDataFilesComponent;
  let fixture: ComponentFixture<AuditDataFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditDataFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDataFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
