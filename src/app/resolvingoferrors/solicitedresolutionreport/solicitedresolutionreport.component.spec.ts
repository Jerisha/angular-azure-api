import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitedresolutionreportComponent } from './solicitedresolutionreport.component';

describe('SolicitederrorsComponent', () => {
  let component: SolicitedresolutionreportComponent;
  let fixture: ComponentFixture<SolicitedresolutionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitedresolutionreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitedresolutionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
