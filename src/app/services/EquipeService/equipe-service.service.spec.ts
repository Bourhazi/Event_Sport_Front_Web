import { TestBed } from '@angular/core/testing';

import { EquipeServiceService } from './equipe-service.service';

describe('EquipeServiceService', () => {
  let service: EquipeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
