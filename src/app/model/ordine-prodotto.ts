import { Ordine } from "./ordine";
import { Prodotto } from "./prodotto";

export class OrdineProdotto {

  id: number;
  quantita: number;
  prodotto: Prodotto;
  ordine: Ordine;

}
