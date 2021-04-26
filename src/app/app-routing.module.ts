import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CarrelloComponent } from './carrello/carrello.component';
import { ManagerComponent } from './manager/manager.component';
import { ProdottoComponent } from './prodotto/prodotto.component';
import { ShopComponent } from './shop/shop.component';
import { UserComponent } from './user/user.component';
import { UtenteComponent } from './utente/utente.component';
import { OrdiniComponent } from './ordini/ordini.component';
import { ModificaProdottoComponent } from './modifica-prodotto/modifica-prodotto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/admin/utenti',
    component: UtenteComponent,
    canActivate: [AuthGuard],
    // The user need to have this roles to access
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'home/admin/prodotti',
    component: ProdottoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'home/admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'home',
    component: ManagerComponent
     },
     {
      path: 'home/user/shop',
      component: ShopComponent
       },
       {
        path: 'home/user',
        component: UserComponent
         },
         {
          path: 'home/user/cart',
          component: CarrelloComponent
           },
           {
            path: 'home/user/orders',
            component: OrdiniComponent
             },
             {
              path: 'home/admin/modificaprodotto',
              component: ModificaProdottoComponent,
              canActivate: [AuthGuard],
              data: { roles: ['ROLE_ADMIN'] },
            },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
