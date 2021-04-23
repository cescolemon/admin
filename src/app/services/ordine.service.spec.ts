/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdineService } from './ordine.service';

describe('Service: Ordine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdineService]
    });
  });

  it('should ...', inject([OrdineService], (service: OrdineService) => {
    expect(service).toBeTruthy();
  }));
});
