import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidereportComponent } from './inflightreport.component';

describe('ProvidereportComponent', () => {
  let component: ProvidereportComponent;
  let fixture: ComponentFixture<ProvidereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
