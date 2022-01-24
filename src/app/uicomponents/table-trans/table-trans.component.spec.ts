import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTransComponent } from './table-trans.component';

describe('TableTransComponent', () => {
  let component: TableTransComponent;
  let fixture: ComponentFixture<TableTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
