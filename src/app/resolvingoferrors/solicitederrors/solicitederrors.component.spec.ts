import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitederrorsComponent } from './solicitederrors.component';

describe('SolicitederrorsComponent', () => {
  let component: SolicitederrorsComponent;
  let fixture: ComponentFixture<SolicitederrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitederrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitederrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
