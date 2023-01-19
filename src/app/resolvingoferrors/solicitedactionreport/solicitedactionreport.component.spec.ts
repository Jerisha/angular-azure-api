import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitedactionreportComponent } from './solicitedactionreport.component';

describe('SolicitedactionreportComponent', () => {
  let component: SolicitedactionreportComponent;
  let fixture: ComponentFixture<SolicitedactionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitedactionreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitedactionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
