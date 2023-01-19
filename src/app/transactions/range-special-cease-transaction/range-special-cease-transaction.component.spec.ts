import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSpecialCeaseTransactionComponent } from './range-special-cease-transaction.component';

describe('RangeSpecialCeaseTransactionComponent', () => {
  let component: RangeSpecialCeaseTransactionComponent;
  let fixture: ComponentFixture<RangeSpecialCeaseTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeSpecialCeaseTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSpecialCeaseTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
