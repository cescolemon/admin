import { Utente } from "../model/utente";
import { Observable } from 'rxjs';

export interface AService {

  getUtenti(): Observable<Utente[]>;

  addUtente(ut: Utente): Observable<any>;

  deleteUtente(utid: number): Observable<any>;

}
