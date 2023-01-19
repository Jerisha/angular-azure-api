import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateinternalauditdetailsComponent } from './separateinternalauditdetails.component';

describe('SeparateinternalauditdetailsComponent', () => {
  let component: SeparateinternalauditdetailsComponent;
  let fixture: ComponentFixture<SeparateinternalauditdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparateinternalauditdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateinternalauditdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
