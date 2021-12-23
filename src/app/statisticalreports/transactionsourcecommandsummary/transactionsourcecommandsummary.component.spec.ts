import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsourcecommandsummaryComponent } from './transactionsourcecommandsummary.component';

describe('TransactionsourcecommandsummaryComponent', () => {
  let component: TransactionsourcecommandsummaryComponent;
  let fixture: ComponentFixture<TransactionsourcecommandsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsourcecommandsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsourcecommandsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
