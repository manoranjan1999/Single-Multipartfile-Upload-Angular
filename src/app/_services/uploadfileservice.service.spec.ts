import { TestBed } from '@angular/core/testing';

import { UploadfileserviceService } from './uploadfileservice.service';

describe('UploadfileserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadfileserviceService = TestBed.get(UploadfileserviceService);
    expect(service).toBeTruthy();
  });
});
