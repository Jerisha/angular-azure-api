import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsolicitederrorsComponent } from './unsolicitederrors.component';

describe('UnsolicitederrorsComponent', () => {
  let component: UnsolicitederrorsComponent;
  let fixture: ComponentFixture<UnsolicitederrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsolicitederrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsolicitederrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
