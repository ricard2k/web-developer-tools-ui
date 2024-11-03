import { TestBed } from '@angular/core/testing';

import { BtoaService } from './btoa.service';

describe('BtoaService', () => {
  let service: BtoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
