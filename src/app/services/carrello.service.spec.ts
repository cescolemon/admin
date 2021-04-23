/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarrelloService } from './carrello.service';

describe('Service: Carrello', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarrelloService]
    });
  });

  it('should ...', inject([CarrelloService], (service: CarrelloService) => {
    expect(service).toBeTruthy();
  }));
});
