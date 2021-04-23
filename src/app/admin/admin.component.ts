import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {


title = 'CalabrianShop/Admin';
constructor(private keycloakService: KeycloakService, private router: Router) {}
  ngOnInit(): void {

  }
logout() {
  this.keycloakService.logout();
}

goToProd($myParam: string = ''): void {
  const navigationDetails: string[] = ['home/admin/prodotti'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}
goToUser($myParam: string = ''): void {
  const navigationDetails: string[] = ['home/admin/utenti'];
  if($myParam.length) {
    navigationDetails.push($myParam);
  }
  this.router.navigate(navigationDetails);
}


}
