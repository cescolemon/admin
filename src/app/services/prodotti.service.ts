import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
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
  private prodottouri = 'http://localhost:8888/products'

  constructor(private http: HttpClient) { }


  getProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${environment.serverUrl}/products`);
  }
  addProdotto(pr: Prodotto): Observable<any> {
    return this.http.post<Prodotto>(this.prodottouri + '/add', pr, httpOptions);
  }
  deleteProdotto(idpr: number): Observable<any> {
    return this.http.delete<Prodotto>(this.prodottouri+'/'+idpr);
  }

  updateQuantita(prid: number): Observable<any> {
   return this.http.post<Prodotto>(`${environment.serverUrl}/products/`+prid, httpOptions);
  }
  getProdotto(idpr: number): Observable<any> {
    return this.http.get<Prodotto>(this.prodottouri+'/'+idpr);
  }
}
