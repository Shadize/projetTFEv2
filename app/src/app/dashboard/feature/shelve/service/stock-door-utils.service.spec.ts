import { TestBed } from '@angular/core/testing';

import { StockDoorUtilsService } from './stock-door-utils.service';

describe('StockDoorUtilsService', () => {
  let service: StockDoorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDoorUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
