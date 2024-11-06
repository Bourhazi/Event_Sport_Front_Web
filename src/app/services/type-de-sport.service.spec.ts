import { TestBed } from '@angular/core/testing';

import { TypeDeSportService } from './type-de-sport.service';

describe('TypeDeSportService', () => {
  let service: TypeDeSportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDeSportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
