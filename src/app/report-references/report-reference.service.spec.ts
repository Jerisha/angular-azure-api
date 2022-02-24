import { TestBed } from '@angular/core/testing';

import { ReportReferenceService } from './report-reference.service';

describe('ReportReferenceService', () => {
  let service: ReportReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
