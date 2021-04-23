import { Observable } from "rxjs";
import { Prodotto } from "../model/prodotto";

export interface Pservice {
  getProdotti(): Observable<Prodotto[]>;

  addProdotto(pr: Prodotto): Observable<any>;

  deleteProdotto(idpr: number): Observable<any>;

  updateQuantita( prid: number): Observable<any>;

  getProdotto(idpr: number): Observable<any>;
}
