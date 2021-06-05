import { TestBed } from '@angular/core/testing';

import { MyInterceptorServiceService } from './my-interceptor-service.service';

describe('MyInterceptorServiceService', () => {
  let service: MyInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
