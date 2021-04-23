import { Prodotto } from "./prodotto";
import { Utente } from "./utente";

export class ProdottoCarrello {

  id: number;
  quantita: number;
  subTotale: number;
  utente: Utente;
  prodotto: Prodotto;


  setId(id : number){
    this.id=id;
  }

  setQuantita(quantita : number){
    this.quantita=quantita;
  }
  setProdotto(prodotto : Prodotto){
    this.prodotto=prodotto;
  }
}
