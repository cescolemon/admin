
import { Data } from "@angular/router";
import { Bolla } from "./bolla";
import { OrdineProdotto } from "./ordine-prodotto";
import { Utente } from "./utente";

export class Ordine {

  data: string;
  id: number;
  totale: number;
  indirizzo: string;
  utente: Utente;
  ordineProdotto: OrdineProdotto[];
  bolla: Bolla;

}
