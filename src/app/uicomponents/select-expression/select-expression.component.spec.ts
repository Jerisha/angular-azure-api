import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExpressionComponent } from './select-expression.component';

describe('SelectExpressionComponent', () => {
  let component: SelectExpressionComponent;
  let fixture: ComponentFixture<SelectExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
