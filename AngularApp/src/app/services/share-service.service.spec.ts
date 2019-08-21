import { TestBed } from '@angular/core/testing';

import { ShareServiceService } from './share-service.service';

describe('ShareServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareServiceService = TestBed.get(ShareServiceService);
    expect(service).toBeTruthy();
  });
});
