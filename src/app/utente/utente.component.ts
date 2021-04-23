import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from '../model/utente';
import { UtenteService } from '../services/utenti.service';



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
  dc =['select','id','nome','email'];

  constructor(private aservice : UtenteService,
              private router : Router, private activetedRoute : ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef) {

                this.selection.changed.subscribe(item=>{​​​​​​​​
                  this.isButtonEnable = this.selection.selected.length == 0;
                      }​​​​​​​​)
              }



  ngOnInit(): void {
    this.refresh();
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
        x => {this.router.navigateByUrl('/utenti'), this.refresh()});
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
