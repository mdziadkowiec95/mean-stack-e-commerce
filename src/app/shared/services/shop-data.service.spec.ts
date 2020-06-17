import { TestBed } from '@angular/core/testing';

import { ShopDataService } from './shop-data.service';

describe('ShopDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopDataService = TestBed.get(ShopDataService);
    expect(service).toBeTruthy();
  });
});
