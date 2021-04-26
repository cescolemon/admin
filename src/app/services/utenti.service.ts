import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AService } from '../interfaces/aservice';
import { Utente } from '../model/utente';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UtenteService implements AService{


  utenti: Utente[];
  private utenteuri = `${environment.serverUrl}/users`
  getUtenti() : Observable<Utente[]>{
    return this.http.get<Utente[]>(this.utenteuri);
  }

  addUtente(newUtente : Utente): Observable<any>{
   return this.http.post<Utente>(this.utenteuri + '/add', newUtente, httpOptions);
  }

  deleteUtente(utid: number): Observable<any> {
    return this.http.delete<Utente>(this.utenteuri+'/'+utid);
  }


  constructor(private http: HttpClient) {}
}


