import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgnSearchTaskInboxComponent } from './ngn-search-task-inbox.component';

describe('NgnSearchTaskInboxComponent', () => {
  let component: NgnSearchTaskInboxComponent;
  let fixture: ComponentFixture<NgnSearchTaskInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgnSearchTaskInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgnSearchTaskInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
