import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAuditComponent } from './full-audit.component';

describe('FullAuditComponent', () => {
  let component: FullAuditComponent;
  let fixture: ComponentFixture<FullAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
