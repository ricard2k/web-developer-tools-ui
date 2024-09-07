import { TestBed } from '@angular/core/testing';

import { SecondClockService } from './second-clock.service';

describe('SecondClockService', () => {
  let service: SecondClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
