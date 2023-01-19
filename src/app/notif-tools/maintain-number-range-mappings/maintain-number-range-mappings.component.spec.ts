import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainNumberRangeMappingsComponent } from './maintain-number-range-mappings.component';

describe('MaintainNumberRangeMappingsComponent', () => {
  let component: MaintainNumberRangeMappingsComponent;
  let fixture: ComponentFixture<MaintainNumberRangeMappingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainNumberRangeMappingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainNumberRangeMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
