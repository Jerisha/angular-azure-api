import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullauditdetailsComponent } from './fullauditdetails.component';

describe('FullauditdetailsComponent', () => {
  let component: FullauditdetailsComponent;
  let fixture: ComponentFixture<FullauditdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullauditdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullauditdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
