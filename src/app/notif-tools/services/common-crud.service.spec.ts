import { TestBed } from '@angular/core/testing';

import { CommonCrudService } from './common-crud.service';

describe('CommonCrudService', () => {
  let service: CommonCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
