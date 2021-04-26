import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Prodotto } from '../model/prodotto';
import { ProdottiService } from '../services/prodotti.service';


@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})




export class ProdottoComponent implements OnInit {

@ViewChild(MatTable) table: MatTable<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

dataSource: MatTableDataSource<Prodotto>;
dc =['select','image','id','nome','categoria','quantita','prezzo','venditore'];


  constructor(private pservice : ProdottiService,
    private router : Router, private activetedRoute : ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef
    ) {

  this.selection.changed.subscribe( () =>{​​​​​​​​
  this.isButtonEnable = this.selection.selected.length == 0;
      }​​​​​​​​)


     }




  ngOnInit(): void {
    this.prodottoForm.get('nome')!.valueChanges.subscribe(val => {this.prodotto.nome = val; } );
    this.prodottoForm.get('categoria')!.valueChanges.subscribe(val => {this.prodotto.categoria = val; } );
    this.prodottoForm.get('quantita')!.valueChanges.subscribe(val => {this.prodotto.quantita = val; } );
    this.prodottoForm.get('prezzo')!.valueChanges.subscribe(val => {this.prodotto.prezzo = val; } );
    this.prodottoForm.get('venditore')!.valueChanges.subscribe(val => {this.prodotto.venditore = val; } );
    this.prodottoForm.get('descrizione')!.valueChanges.subscribe(val => {this.prodotto.descrizione = val; } );
    this.prodottoForm.get('immagine')!.valueChanges.subscribe(val => {this.prodotto.imagePath = val; } );
    this.refresh();


  }

  refresh(): void {
    this.pservice.getProdotti().subscribe(uts => {
      this.dataSource = new MatTableDataSource(uts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    })
  }


  prodottoForm = new FormGroup({
    nome:  new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    quantita: new FormControl('', [Validators.required]),
    prezzo: new FormControl('', [Validators.required]),
    venditore: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    immagine: new FormControl('', [Validators.required])
  });



  prodotto: Prodotto = new Prodotto();

  add() : void{
    let pr = new Prodotto();
    pr.id = 0;
    pr.nome = this.prodottoForm.value.nome;
    pr.categoria = this.prodottoForm.value.categoria;
    pr.quantita = this.prodottoForm.value.quantita;
    pr.prezzo= this.prodottoForm.value.prezzo;
    pr.venditore=this.prodottoForm.value.venditore;
    pr.descrizione=this.prodottoForm.value.descrizione;
    pr.imagePath=this.prodottoForm.value.immagine;
    this.pservice.addProdotto(pr).subscribe(x => {this.router.navigateByUrl('home/admin/prodotti'), this.refresh()});
    console.log(this.prodotto);


  }

  delete(): void{
      for (let prod of this.selection.selected){
        this.pservice.deleteProdotto(prod.id).subscribe(
          x => { this.refresh()});
          console.log(this.prodotto);
        }
        this.selection.clear();
      }


      updateQuantita(): void{
        for (let prod of this.selection.selected){
          this.pservice.updateQuantita(prod.id).subscribe(
            x => { this.refresh()}
          )
          console.log(this.prodotto);
        }
        this.selection.clear();
      }

      goToUpdate($myParam: string = ''): void {
        const navigationDetails: string[] = ['home/admin/modificaprodotto'];
        if($myParam.length) {
          navigationDetails.push($myParam);
        }
        this.router.navigate(navigationDetails);
      }

      isButtonEnable:boolean =true;
      selection = new SelectionModel<Prodotto>(true, []);

      /** Whether the number of selected elements matches the total number of rows. */
        isAllSelected() {
          const numSelected = this.selection.selected.length;
          const numRows = this.dataSource.data.length;
          return numSelected === numRows;
        }

        /** Selects all rows if they are not all selected; otherwise clear selection. */
       masterToggle() {
            if(this.isAllSelected()){
                    this.selection.clear();
                    this.isButtonEnable = true;
                }else{
                    this.dataSource.data.forEach(row => this.selection.select(row));
                    this.isButtonEnable = false;
            }
        }
      }

