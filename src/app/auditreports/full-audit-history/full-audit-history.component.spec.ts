import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAuditHistoryComponent } from './full-audit-history.component';

describe('FullAuditHistoryComponent', () => {
  let component: FullAuditHistoryComponent;
  let fixture: ComponentFixture<FullAuditHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAuditHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAuditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
