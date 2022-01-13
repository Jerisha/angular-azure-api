import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAuditTypeComponent } from './full-audit-type.component';

describe('FullAuditTypeComponent', () => {
  let component: FullAuditTypeComponent;
  let fixture: ComponentFixture<FullAuditTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAuditTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAuditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
