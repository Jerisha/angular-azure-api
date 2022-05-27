import { TestBed } from '@angular/core/testing';

import { AuthentiationGuard } from './authentiation.guard';

describe('AuthentiationGuard', () => {
  let guard: AuthentiationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentiationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
