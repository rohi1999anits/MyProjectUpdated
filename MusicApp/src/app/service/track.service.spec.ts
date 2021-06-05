import { TestBed } from '@angular/core/testing';

import { TrackService } from './track.service';
import {HttpClientModule} from '@angular/common/http';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
