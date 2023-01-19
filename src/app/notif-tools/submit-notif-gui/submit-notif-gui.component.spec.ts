import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNotifGuiComponent } from './submit-notif-gui.component';

describe('SubmitNotifGuiComponent', () => {
  let component: SubmitNotifGuiComponent;
  let fixture: ComponentFixture<SubmitNotifGuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitNotifGuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNotifGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
