import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oservice } from '../interfaces/oservice';
import { Bolla } from '../model/bolla';
import { Ordine } from '../model/ordine';
import { OrdineProdotto } from '../model/ordine-prodotto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrdineService implements Oservice {

  private orderUrl :string;

  constructor(private http : HttpClient) {
    this.orderUrl=`${environment.serverUrl}/orders`;
  }
  getOrdiniUtente(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.orderUrl);
  }
  getBolla(or: Ordine): Observable<Bolla> {
    return this.http.post<Bolla>(this.orderUrl+'/bolla',or, httpOptions)
  }

  getProdottiOrdinati(or: Ordine): Observable<OrdineProdotto[]> {
    return this.http.post<OrdineProdotto[]>(this.orderUrl+'/ordered', or, httpOptions);
  }

  getPDF(): Observable<Blob>{
    return this.http.get(this.orderUrl+'/download', {responseType: 'blob' });
  }

  }


