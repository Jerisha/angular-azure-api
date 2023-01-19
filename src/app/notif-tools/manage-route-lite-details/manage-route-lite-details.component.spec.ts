import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRouteLiteDetailsComponent } from './manage-route-lite-details.component';

describe('ManageRouteLiteDetailsComponent', () => {
  let component: ManageRouteLiteDetailsComponent;
  let fixture: ComponentFixture<ManageRouteLiteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRouteLiteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRouteLiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
