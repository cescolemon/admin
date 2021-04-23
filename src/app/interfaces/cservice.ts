import { Observable } from 'rxjs';
import { Carrello } from '../model/carrello';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';
import { Utente } from '../model/utente';

export interface Cservice {

  emptyCart(): Observable<any>;

  rimuoviProdotto(pr: ProdottoCarrello): Observable<any>;

  registraOrdine(indirizzo: string): Observable<any>;

  getProdottiCarrello(): Observable<Carrello>;

  getUtente(): Observable<Utente>;

  getUtenteEmail(): Observable<string>;

  getUtenteName(): Observable<string>;
}
