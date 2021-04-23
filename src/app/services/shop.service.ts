import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sservice } from '../interfaces/sservice';
import { Carrello } from '../model/carrello';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShopService implements Sservice {
  private shopUrl :string;

  constructor(private http : HttpClient) {
    this.shopUrl=`${environment.serverUrl}/shop`
  }
  updateCarrello(cart: Carrello) {
    return this.http.post(this.shopUrl+'/updatecart', cart, httpOptions);
  }
  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.serverUrl}/shop`);
  }
  registraOrdine(indirizzo: string): Observable<any>{
    return this.http.post(this.shopUrl+'/orderreg', indirizzo, httpOptions);
  }
  getCategoria(): Observable<any> {
    return  this.http.get<any>(this.shopUrl+'/categorie');
  }
  getCarrello(): Observable<Carrello> {
    return this.http.get<Carrello>(this.shopUrl+'/cart');
  }

  aggiungiAlCarrello(prod: Prodotto, qnt: number){
    const prodttoInCarr = new ProdottoCarrello();
    prodttoInCarr.setProdotto(prod);
    prodttoInCarr.setQuantita(qnt);
    prodttoInCarr.setId(0);
    prodttoInCarr.subTotale=qnt*prodttoInCarr.prodotto.prezzo;
    console.log(prodttoInCarr.prodotto.nome+","+prodttoInCarr.prodotto.quantita+",       ->>>>"+prodttoInCarr.prodotto.id);
    return this.http.post(this.shopUrl+'/addtocart', prodttoInCarr,httpOptions);
  }

}
