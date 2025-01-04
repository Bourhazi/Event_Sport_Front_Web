import { TestBed } from '@angular/core/testing';

import { ResultatServiceService } from './resultat-service.service';

describe('ResultatServiceService', () => {
  let service: ResultatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
