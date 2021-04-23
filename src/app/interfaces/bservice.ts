import { Observable } from 'rxjs';
import { Carrello } from '../model/carrello';
import { Ordine } from '../model/ordine';

export interface Bservice {

  generaBolla(o: Ordine): Observable<Carrello>;

}
