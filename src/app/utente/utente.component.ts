import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Bolla } from '../model/bolla';
import { Ordine } from '../model/ordine';
import { Utente } from '../model/utente';
import { OrdineService } from '../services/ordine.service';
import { UtenteService } from '../services/utenti.service';

export interface DialogData {
  ordini: Ordine[];
}

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent implements OnInit {

  utente: Utente = new Utente();

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Utente>;
  dc =['select','id','nome','email','ordini'];
  ordini: Ordine[];

  constructor(private aservice : UtenteService,
              private oService: OrdineService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
                this.selection.changed.subscribe(item=>{​​​​​​​​
                  this.isButtonEnable = this.selection.selected.length == 0;
                      }​​​​​​​​)
              }

callPopUp(id: number): void { //richiami il metodo della classe DialogDataOrdini per
                //imposttare l'utente di cui visualizzare gli ordini
this.setOrdini(id);
setTimeout(() => {
  this.openDialog();
}, 100);
}

  ngOnInit(): void {
    this.refresh();
  }

  setOrdini(id: number): void {//inserisci mail, ottieni gli ordini e li esponi sul datasource
    this.oService.getOrdiniById(id).subscribe(uts => {
      this.ordini = uts
    });
  }


  openDialog(): void { //apri popup quando clicchi su "Storico ordini"
    const dialogRef = this.dialog.open(DialogDataOrdini,
      {data : {ordini: this.ordini},
      height: '720px', width: '1080px'});
  }


  refresh(): void {
    this.aservice.getUtenti().subscribe(uts => {
      this.dataSource = new MatTableDataSource(uts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    })
  }

  delete(): void{
    for (let uts of this.selection.selected){
      this.aservice.deleteUtente(uts.id).subscribe(
        x => {this.refresh()});
        console.log(this.utente);
      }
      this.selection.clear();
    }

    isButtonEnable:boolean =true;
    selection = new SelectionModel<Utente>(true, []);

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



//popUp
@Component({​​​
selector:'dialog-data-ordini',
templateUrl:'dialog-data-ordini.html',
}​​​)
export class DialogDataOrdini {​​​
constructor(
public dialogRef: MatDialogRef<DialogDataOrdini>,
private oService : OrdineService,
public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {​​​}​​​
//ordini
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSourceOrdini: MatTableDataSource<Ordine>;
bolla: Bolla = new Bolla();
ordini: Ordine[] = this.data.ordini;
dcOrdini = ['data','totale','id','bolla'];
onNoClick(): void {​​​
this.dialogRef.close();
      }​​​
ngOnInit(){​​​
this.dataSourceOrdini = new MatTableDataSource(this.ordini);
this.dataSourceOrdini.paginator = this.paginator;
this.dataSourceOrdini.sort = this.sort;
this.refresh();
      }​​​

refresh(): void {​​​
this.dataSourceOrdini = new MatTableDataSource(this.ordini);
this.dataSourceOrdini.paginator = this.paginator;
this.dataSourceOrdini.sort = this.sort;
this.changeDetectorRefs.detectChanges();
      }​​​

      generaBolla(or: Ordine){
        this.oService.getBolla(or).subscribe(
          bolla => this.bolla = bolla
        );
        this.openDialog();
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceOrdini.filter = filterValue.trim().toLowerCase();
      }

    openDialog() { //apre la bolla
      this.dialog.open(DialogDataBolla, {
        data: {

        }
      });
    }
}

    @Component({
      selector: 'dialog-data-bolla',
      templateUrl: 'dialog-data-bolla.html',
    })

    export class DialogDataBolla {
      constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private oService : OrdineService) {}

      generaPdf(){//classe per il pdf
        this.oService.getPDF().subscribe( x=> {
          const blob= new Blob([x], {type: 'application/pdf'});

          if(window.navigator && window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(blob);
            return;
          }

          const data= window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href= data;
          link.download= 'bolla.pdf';
          link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
           setTimeout(function() {
             window.URL.revokeObjectURL(data);
             link.remove();
           }, 100)
        });
      }
}
