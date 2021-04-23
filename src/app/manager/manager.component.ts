
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Prodotto } from '../model/prodotto';

import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {

prodotti: Prodotto[];

  constructor(private keycloakService: KeycloakService, private sservice : ShopService,private router: Router) {}

  ngOnInit(): void {
    this.sservice.getProdotti().subscribe(uts => {
      this.prodotti=uts;
  });
}
logout() {
  this.keycloakService.logout();
}


goToShop($myParam: string = ''): void {
  const navigationDetails: string[] = ['home/user/shop'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}

}
