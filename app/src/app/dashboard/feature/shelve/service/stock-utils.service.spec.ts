import { TestBed } from '@angular/core/testing';

import { StockUtilsService } from './stock-utils.service';

describe('StockUtilsService', () => {
  let service: StockUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
