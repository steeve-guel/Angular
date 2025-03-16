import { TestBed } from '@angular/core/testing';

import { OwlServicesService } from './owl-services.service';

describe('OwlServicesService', () => {
  let service: OwlServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwlServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
