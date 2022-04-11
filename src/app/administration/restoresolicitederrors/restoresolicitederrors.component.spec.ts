import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoresolicitederrorsComponent } from './restoresolicitederrors.component';

describe('SolicitederrorsComponent', () => {
  let component: RestoresolicitederrorsComponent;
  let fixture: ComponentFixture<RestoresolicitederrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoresolicitederrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoresolicitederrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
