import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvederrorsComponent } from './unresolvederrors.component';

describe('UnresolvederrorsComponent', () => {
  let component: UnresolvederrorsComponent;
  let fixture: ComponentFixture<UnresolvederrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnresolvederrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvederrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
