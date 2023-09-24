import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './admin-pharmacie/messages/messages.component';
import { PcommandesComponent } from './admin-pharmacie/pcommandes/pcommandes.component';
import { PhomeComponent } from './admin-pharmacie/phome/phome.component';
import { ProduitsComponent } from './admin-pharmacie/produits/produits.component';
import { ProfilComponent } from './admin-pharmacie/profil/profil.component';
import { ClientsDetailComponent } from './admin/clients-detail/clients-detail.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { CommadesDetailComponent } from './admin/commades-detail/commades-detail.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { DetailPharmacieComponent } from './admin/detail-pharmacie/detail-pharmacie.component';
import { HomeComponent } from './admin/home/home.component';
import { PharmacieComponent } from './admin/pharmacie/pharmacie.component';
import { ProductsComponent } from './admin/products/products.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
 {
  path:'',
  component:HomeComponent
 },
 {
  path:"pharmacie",
  component:PharmacieComponent
 },
 {
  path:"pharmacie_detail/:id",
  component:DetailPharmacieComponent
 },
 {
  path:'admin_product',
  component:ProductsComponent
 },
 {
  path:"admin_commandes",
  component:CommandesComponent
 },
 {
  path:"admin_commandes_detail/:id",
  component:CommadesDetailComponent
 },
 {
  path:"clients",
  component:ClientsComponent
 },
 {
  path:'client_detail/:id',
  component:ClientsDetailComponent
 },
 //les routes admin Pharmacies
 {
  path:"admin_pharmacie/:id",
  component:PhomeComponent
 },
 {
  path:"admin_pharmacie_profil/:id",
  component:ProfilComponent
 },
 {
  path:"admin_pharmacie_products/:id",
  component:ProduitsComponent
 },
 {
  path:"admin_pharmacie_commandes", 
  component:PcommandesComponent
 },
 {
  path:"admin_pharmacie_commende_detail/:id",
  component:CommadesDetailComponent
 },
 {
  path:"admin_pharmacie_messages",
  component:MessagesComponent
 }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
