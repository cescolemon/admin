/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BollaService } from './bolla.service';

describe('Service: Bolla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BollaService]
    });
  });

  it('should ...', inject([BollaService], (service: BollaService) => {
    expect(service).toBeTruthy();
  }));
});
