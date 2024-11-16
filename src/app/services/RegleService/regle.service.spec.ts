import { TestBed } from '@angular/core/testing';

import { RegleService } from './regle.service';

describe('RegleService', () => {
  let service: RegleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
