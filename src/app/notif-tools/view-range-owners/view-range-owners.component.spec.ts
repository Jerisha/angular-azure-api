import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRangeOwnersComponent } from './view-range-owners.component';

describe('ViewRangeOwnersComponent', () => {
  let component: ViewRangeOwnersComponent;
  let fixture: ComponentFixture<ViewRangeOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRangeOwnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRangeOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
