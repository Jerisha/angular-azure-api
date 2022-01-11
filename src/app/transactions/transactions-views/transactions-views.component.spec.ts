import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsViewsComponent } from './transactions-views.component';

describe('TransactionsViewsComponent', () => {
  let component: TransactionsViewsComponent;
  let fixture: ComponentFixture<TransactionsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
