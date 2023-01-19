import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewDetailsComponent } from './data-view-details.component';

describe('DataViewDetailsComponent', () => {
  let component: DataViewDetailsComponent;
  let fixture: ComponentFixture<DataViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
