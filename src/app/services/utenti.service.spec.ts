import { TestBed } from '@angular/core/testing';

import { UtenteService } from './utenti.service';

describe('UtenteService', () => {
  let service: UtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
