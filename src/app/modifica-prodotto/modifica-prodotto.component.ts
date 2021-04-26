import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Prodotto } from '../model/prodotto';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.component.html',
  styleUrls: ['./modifica-prodotto.component.css']
})
export class ModificaProdottoComponent implements OnInit {

  constructor(private pservice : ProdottiService,
    private router : Router) {}

  ngOnInit(): void {
    this.prodottoForm.get('id')!.valueChanges.subscribe(val => {this.prodotto.id = val; } );
    this.prodottoForm.get('nome')!.valueChanges.subscribe(val => {this.prodotto.nome = val; } );
    this.prodottoForm.get('categoria')!.valueChanges.subscribe(val => {this.prodotto.categoria = val; } );
    this.prodottoForm.get('quantita')!.valueChanges.subscribe(val => {this.prodotto.quantita = val; } );
    this.prodottoForm.get('prezzo')!.valueChanges.subscribe(val => {this.prodotto.prezzo = val; } );
    this.prodottoForm.get('venditore')!.valueChanges.subscribe(val => {this.prodotto.venditore = val; } );
    this.prodottoForm.get('descrizione')!.valueChanges.subscribe(val => {this.prodotto.descrizione = val; } );
    this.prodottoForm.get('immagine')!.valueChanges.subscribe(val => {this.prodotto.imagePath = val; } );
  }

  prodottoForm = new FormGroup({
    id:  new FormControl([Validators.required]),
    nome:  new FormControl(),
    categoria: new FormControl(),
    quantita: new FormControl(),
    prezzo: new FormControl(),
    venditore: new FormControl(),
    descrizione: new FormControl(),
    immagine: new FormControl()
  });

  prodotto: Prodotto = new Prodotto();

  updateProd() : void{
    let pr = new Prodotto();
    pr.id = this.prodottoForm.value.id;
    pr.nome = this.prodottoForm.value.nome;
    pr.categoria = this.prodottoForm.value.categoria;
    pr.quantita = this.prodottoForm.value.quantita;
    pr.prezzo= this.prodottoForm.value.prezzo;
    pr.venditore=this.prodottoForm.value.venditore;
    pr.descrizione=this.prodottoForm.value.descrizione;
    pr.imagePath=this.prodottoForm.value.immagine;
    this.pservice.updateProdotto(pr).subscribe(x => {this.router.navigateByUrl('home/admin/prodotti')});
    console.log(this.prodotto);
  }

}
