import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiverecordsComponent } from './liverecords.component';

describe('LiverecordsComponent', () => {
  let component: LiverecordsComponent;
  let fixture: ComponentFixture<LiverecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiverecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiverecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
