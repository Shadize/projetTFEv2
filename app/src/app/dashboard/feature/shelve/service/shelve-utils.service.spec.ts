import { TestBed } from '@angular/core/testing';

import { ShelveUtilsService } from './shelve-utils.service';

describe('ShelveUtilsService', () => {
  let service: ShelveUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelveUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
