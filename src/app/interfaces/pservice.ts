import { Observable } from "rxjs";
import { Prodotto } from "../model/prodotto";
import { ProdottoComponent } from "../prodotto/prodotto.component";

export interface Pservice {
  getProdotti(): Observable<Prodotto[]>;

  addProdotto(pr: Prodotto): Observable<any>;

  deleteProdotto(idpr: number): Observable<any>;

  updateQuantita( prid: number): Observable<any>;

  getProdotto(idpr: number): Observable<any>;

  updateProdotto(pr: Prodotto): Observable<any>;
}
