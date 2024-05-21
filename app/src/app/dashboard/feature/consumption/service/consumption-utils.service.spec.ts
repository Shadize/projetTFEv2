import { TestBed } from '@angular/core/testing';

import { ConsumptionUtilsService } from './consumption-utils.service';

describe('ConsumptionUtilsService', () => {
  let service: ConsumptionUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
