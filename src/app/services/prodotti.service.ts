import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Prodotto } from '../model/prodotto';
import { Pservice } from '../interfaces/pservice';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProdottiService implements Pservice {

  prodotti: Prodotto[];
  private prodottouri = `${environment.serverUrl}/products`

  constructor(private http: HttpClient) { }


updateProdotto(pr: Prodotto): Observable<any> {
    return this.http.post<Prodotto>(this.prodottouri+'/upprod', pr , httpOptions);
}

  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.prodottouri);
  }
  addProdotto(pr: Prodotto): Observable<any> {
    return this.http.post<Prodotto>(this.prodottouri + '/add', pr, httpOptions);
  }
  deleteProdotto(idpr: number): Observable<any> {
    return this.http.delete<Prodotto>(this.prodottouri+'/'+idpr);
  }

  updateQuantita(prid: number): Observable<any> {
   return this.http.post<Prodotto>(this.prodottouri+'/'+prid, httpOptions);
  }
  getProdotto(idpr: number): Observable<any> {
    return this.http.get<Prodotto>(this.prodottouri+'/'+idpr);
  }
}
