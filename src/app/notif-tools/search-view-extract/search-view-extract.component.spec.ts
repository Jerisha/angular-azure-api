import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewExtractComponent } from './search-view-extract.component';

describe('SearchViewExtractComponent', () => {
  let component: SearchViewExtractComponent;
  let fixture: ComponentFixture<SearchViewExtractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchViewExtractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
