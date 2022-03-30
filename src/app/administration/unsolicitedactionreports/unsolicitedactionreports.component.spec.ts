import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsolicitedactionreportsComponent } from './unsolicitedactionreports.component';

describe('UnsolicitedactionreportsComponent', () => {
  let component: UnsolicitedactionreportsComponent;
  let fixture: ComponentFixture<UnsolicitedactionreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsolicitedactionreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsolicitedactionreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
