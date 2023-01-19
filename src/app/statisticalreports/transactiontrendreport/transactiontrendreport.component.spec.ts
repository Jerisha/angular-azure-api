import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsourcecommandhistoryComponent } from './transactiontrendreport.component';

describe('TransactionsourcecommandhistoryComponent', () => {
  let component: TransactionsourcecommandhistoryComponent;
  let fixture: ComponentFixture<TransactionsourcecommandhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsourcecommandhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsourcecommandhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
