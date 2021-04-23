import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Carrello } from '../model/carrello';
import { CarrelloService } from '../services/carrello.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private carrelloService : CarrelloService,private keycloakService: KeycloakService, private router: Router,private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      this.matIconRegistry.addSvgIcon(
        "carrel",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/3594363.svg")
      );
  }
  carrello = new Carrello();

  ngOnInit(): void {
    this.carrelloService.getProdottiCarrello().subscribe((data: any) => {
      this.carrello=data;
    }, (err) => {
      console.error(err);
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

  goToCart($myParam: string = ''): void {
    const navigationDetails: string[] = ['home/user/cart'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  emptyCart(){
    this.carrelloService.emptyCart().subscribe(
      () => window.location.reload()
    );
}


  goToOrder($myParam: string = ''): void {
    const navigationDetails: string[] = ['home/user/orders'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

}
