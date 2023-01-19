import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargeBandComponent } from './add-charge-band.component';

describe('AddChargeBandComponent', () => {
  let component: AddChargeBandComponent;
  let fixture: ComponentFixture<AddChargeBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChargeBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChargeBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
