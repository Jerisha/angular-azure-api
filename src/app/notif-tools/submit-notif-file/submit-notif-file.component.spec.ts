import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNotifFileComponent } from './submit-notif-file.component';

describe('SubmitNotifFileComponent', () => {
  let component: SubmitNotifFileComponent;
  let fixture: ComponentFixture<SubmitNotifFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitNotifFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNotifFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
