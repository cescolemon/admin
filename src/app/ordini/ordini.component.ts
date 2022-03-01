import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Bolla } from '../model/bolla';
import { Ordine } from '../model/ordine';
import { OrdineService } from '../services/ordine.service';

export interface DialogData {
  indirizzo: string;
}

@Component({
  selector: 'app-ordine',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.css']
})
export class OrdiniComponent implements OnInit {

  dataSource: MatTableDataSource<Ordine>;

  dc = ['data','totale','indirizzo','id','actions'];

@ViewChild(MatTable) table: MatTable<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
bolla= new Bolla();


  constructor(private oService : OrdineService,
      private changeDetectorRefs: ChangeDetectorRef,
      public dialog: MatDialog) { }

  ngOnInit(): void {

    this.oService.getOrdiniUtente().subscribe(uts => {

      this.dataSource = new MatTableDataSource(uts);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

  });
  this.refresh();

}

refresh(): void {

  this.oService.getOrdiniUtente().subscribe(uts => {

    this.dataSource = new MatTableDataSource(uts);

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.changeDetectorRefs.detectChanges();

  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


generaBolla(or: Ordine){
  this.oService.getBolla(or).subscribe(bolla => this.bolla = bolla);
  this.openDialog();
}

generaPdf(){
  this.oService.getPDF().subscribe( ()=> {window.location.reload()});
}


openDialog() {
  this.dialog.open(DialogDataBolla, {
    data: {}
  });
}
}

@Component({
  selector: 'dialog-data-bolla',
  templateUrl: 'dialog-data-bolla.html',
})
export class DialogDataBolla {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private oService : OrdineService) {}

  generaPdf(){
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
