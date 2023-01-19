import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedtransactionComponent } from './unresolvedtransaction.component';

describe('UnresolvedtransactionComponent', () => {
  let component: UnresolvedtransactionComponent;
  let fixture: ComponentFixture<UnresolvedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnresolvedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
