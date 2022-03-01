import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ordine } from '../model/ordine';
import { Utente } from '../model/utente';
import { Carrello } from '../model/carrello';
import { ProdottoCarrello } from '../model/prodotto-in-carrello';
import { CarrelloService } from '../services/carrello.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prodotto } from '../model/prodotto';
import { OrdineProdotto } from '../model/ordine-prodotto';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

export interface DialogData {
  indirizzo: string;
}

export interface DialogDataDue {
  ret : Prodotto;
}

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})


export class CarrelloComponent implements OnInit {

  carrello = new Carrello();
  dataSource: MatTableDataSource<ProdottoCarrello>;
  dc = ['select','nome','prezzo', 'quantita'];
  ordine = new Ordine();
  utente = new Utente();
  prodotti : ProdottoCarrello[];
  indirizzo: string;
  ret : Prodotto;

  @ViewChild(MatSort) sort: MatSort;

  isButtonEnable:boolean =true;
  selection = new SelectionModel<ProdottoCarrello>(true, []);

  constructor(
    public dialog: MatDialog,
    public dialogdue: MatDialog,
    private cService : CarrelloService,
    private changeDetectorRefs: ChangeDetectorRef) {
      this.prodotti=[];
     this.selection.changed.subscribe(item=>{
       this.isButtonEnable = this.selection.selected.length == 0;
     })
 }


 async ngOnInit() {
   this.cService.getProdottiCarrello().subscribe(
     carrello => {this.carrello=carrello, this.prodotti=carrello.prodotti}
   );
   this.cService.getProdottiCarrello().subscribe(uts => {
     this.dataSource = new MatTableDataSource(uts.prodotti);
     this.dataSource.sort = this.sort;
   });
 }

 rimuoviProdotto(){
   for (let prod of this.selection.selected){
     this.cService.rimuoviProdotto(prod).subscribe(
       x => {this.refresh(), window.location.reload()});
       console.log(this.carrello);
   }
   this.selection.clear();
 }

 refresh(): void {
   this.cService.getProdottiCarrello().subscribe(uts => {
     this.dataSource = new MatTableDataSource(uts.prodotti);
     this.dataSource.sort = this.sort;
     this.changeDetectorRefs.detectChanges();
   })
 }

  registOrder(indirizzo: string){
    this.ordine = new Ordine();
    this.ordine.utente=this.utente;
    this.cService.registraOrdine(indirizzo).subscribe(
      () => window.location.reload()
    );
  }

  isEmpty(){
    return this.carrello.totale==0;
  }

  isThereAny(){
    for(let i=0; i<this.prodotti.length; i++){
      if(this.prodotti[i].quantita>this.prodotti[i].prodotto.quantita){
      this.ret=this.prodotti[i].prodotto;
        return false;
      }
    }
    return true;
  }

  openDialogdue() {
    this.dialogdue.open(DialogErrore, {
      data : {ret : this.ret}
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDataInd, {
      width: '250px',
      data: {indirizzo: this.indirizzo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.indirizzo=result;
      console.log('Ordine confermato:'+this.indirizzo);
      this.registOrder(this.indirizzo)
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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

@Component({
  selector: 'dialog-data-ind',
  templateUrl: 'dialog-data-ind.html',
})
export class DialogDataInd {

  constructor(
    public dialogRef: MatDialogRef<DialogDataInd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-errore',
  templateUrl: 'dialog-errore.html',
})
export class DialogErrore{

@ViewChild(CarrelloComponent) carrello : CarrelloComponent;

constructor(
  public dialogRef: MatDialogRef<DialogErrore>,
  @Inject(MAT_DIALOG_DATA) public data: DialogDataDue) {

  }

  ret: Prodotto = this.data.ret;



  onNoClick(): void {
    this.dialogRef.close();
  }

}

