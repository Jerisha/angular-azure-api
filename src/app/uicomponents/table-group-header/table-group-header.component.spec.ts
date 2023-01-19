import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGroupHeaderComponent } from './table-group-header.component';

describe('TableGroupHeaderComponent', () => {
  let component: TableGroupHeaderComponent;
  let fixture: ComponentFixture<TableGroupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGroupHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
