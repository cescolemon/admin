import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { Prodotto } from '../model/prodotto';
import { ProdottiService } from '../services/prodotti.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {

prodotti: Prodotto[];

  constructor(private keycloakService: KeycloakService, private sservice : ShopService) {}

  ngOnInit(): void {
    this.sservice.getProdotti().subscribe(uts => {
      this.prodotti=uts;
  });
}
logout() {
  this.keycloakService.logout();
}

}
