import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsolicitedactionreportComponent } from './unsolicitedactionreport.component';

describe('UnsolicitedactionreportComponent', () => {
  let component: UnsolicitedactionreportComponent;
  let fixture: ComponentFixture<UnsolicitedactionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsolicitedactionreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsolicitedactionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
