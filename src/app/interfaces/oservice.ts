import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Bolla } from '../model/bolla';
import { Ordine } from '../model/ordine';
import { OrdineProdotto } from '../model/ordine-prodotto';


export interface Oservice {

  getOrdiniUtente(): Observable<Ordine[]>;

  getProdottiOrdinati(or: Ordine): Observable<OrdineProdotto[]>;

  getBolla(or: Ordine): Observable<Bolla>;

  getPDF(): Observable<Blob>;
}
