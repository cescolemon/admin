import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Carrello } from '../model/carrello';
import { Prodotto } from '../model/prodotto';
import { CarrelloService } from '../services/carrello.service';
import { ShopService } from '../services/shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShopComponent implements OnInit {

  expandedElement: Prodotto | null;
  dataSource: MatTableDataSource<Prodotto>;

  dc = ['nome', 'categoria', 'prezzo', 'venditore'];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  prodotti : Prodotto[];

  carrello =new Carrello();


  isButtonEnable:boolean =true;

  selection = new SelectionModel<Prodotto>(true, []);

  constructor(private router: Router, private shopService : ShopService,
     private carrelloService : CarrelloService,
      private changeDetectorRefs: ChangeDetectorRef) {

        this.selection.changed.subscribe(item=>{
          this.isButtonEnable = this.selection.selected.length == 0;

      })
       }

  async ngOnInit() {
    this.shopService.getProdotti().subscribe(
      prodotti => this.prodotti=prodotti
    );
    this.carrelloService.getProdottiCarrello().subscribe(
      carrello => this.carrello=carrello
    );
    this.shopService.getProdotti().subscribe(uts => {

      this.dataSource = new MatTableDataSource(uts);

      this.dataSource.paginator=this.paginator;

      this.dataSource.sort = this.sort;

    })

    this.refresh();

  }

  refresh(): void {

    this.shopService.getProdotti().subscribe(uts => {

      this.dataSource = new MatTableDataSource(uts);

      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();

    })

  }

  addToCart(prodotto : Prodotto){
    this.shopService.getCarrello().subscribe(
        carrello => this.carrello = carrello
      );
   this.shopService.aggiungiAlCarrello(prodotto, 1).subscribe(
        () => window.location.reload()
      );
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }


