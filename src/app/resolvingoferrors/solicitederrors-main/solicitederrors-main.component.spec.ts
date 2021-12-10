import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitederrorsMainComponent } from './solicitederrors-main.component';

describe('SolicitederrorsMainComponent', () => {
  let component: SolicitederrorsMainComponent;
  let fixture: ComponentFixture<SolicitederrorsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitederrorsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitederrorsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
