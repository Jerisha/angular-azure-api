import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExpansionNewComponent } from './table-expansion-new.component';

describe('TableExpansionNewComponent', () => {
  let component: TableExpansionNewComponent;
  let fixture: ComponentFixture<TableExpansionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableExpansionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExpansionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
