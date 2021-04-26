import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cservice } from '../interfaces/cservice';
import { Carrello } from '../model/carrello';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarrelloService implements Cservice {
  private carrelloUrl : string;

constructor(private http : HttpClient) {
  this.carrelloUrl= `${environment.serverUrl}/cart`
 }

  emptyCart(): Observable<any> {
    return this.http.get<Carrello>(this.carrelloUrl + '/empty');
  }

  rimuoviProdotto(pr: ProdottoCarrello): Observable<any> {
    return this.http.post(this.carrelloUrl + '/remove', pr, httpOptions);

  }

  registraOrdine(indirizzo: string): Observable<any> {
    return this.http.post(this.carrelloUrl+'/orderreg',indirizzo, httpOptions);
  }

  getProdottiCarrello(): Observable<any> {

  return this.http.get<Carrello>(this.carrelloUrl);
}

}

