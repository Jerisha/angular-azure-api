import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneNoComponent } from './telephone-no.component';

describe('TelephoneNoComponent', () => {
  let component: TelephoneNoComponent;
  let fixture: ComponentFixture<TelephoneNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
