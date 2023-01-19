import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotifComponent } from './search-notif.component';

describe('SearchNotifComponent', () => {
  let component: SearchNotifComponent;
  let fixture: ComponentFixture<SearchNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
