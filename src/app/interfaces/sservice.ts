import { Observable } from 'rxjs';
import { Carrello } from '../model/carrello';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';

export interface Sservice {

getProdotti(): Observable<Prodotto[]>;

registraOrdine(indirizzo: string): Observable<any>;

getCategoria(): Observable<any>;

getCarrello(): Observable<Carrello>;

aggiungiAlCarrello(prod: Prodotto, qnt: number):Observable<any>;

updateCarrello(cart: Carrello):Observable<any>;

}
