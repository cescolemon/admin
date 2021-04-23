import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cservice } from '../interfaces/cservice';
import { Carrello } from '../model/carrello';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';
import { Utente } from '../model/utente';

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
  getUtente(): Observable<Utente> {
    return this.http.get<Utente>(this.carrelloUrl+'/utente');
  }
  getUtenteEmail(): Observable<string> {
    return this.http.get<string>(this.carrelloUrl+'/utenteemail');
  }
  getUtenteName(): Observable<string> {
    return this.http.get<string>(this.carrelloUrl + '/utentename');
  }
  emptyCart(): Observable<any> {
    return this.http.get<Carrello>(`${environment.serverUrl}/cart` + '/empty');
  }

  rimuoviProdotto(pr: ProdottoCarrello): Observable<any> {
    return this.http.post(`${environment.serverUrl}/cart` + '/remove', pr, httpOptions);

  }

  registraOrdine(indirizzo: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}/cart`+'/orderreg',indirizzo, httpOptions);
  }

  getProdottiCarrello(): Observable<any> {

  return this.http.get<Carrello>(`${environment.serverUrl}/cart`);
}

}

