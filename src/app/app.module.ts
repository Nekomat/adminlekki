import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule , } from '@angular/forms';
import { BrowserModule ,} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { PharmacieComponent } from './admin/pharmacie/pharmacie.component';
import { HeadComponent } from './admin/head/head.component';
import { AddPharmacieComponent } from './admin/add-pharmacie/add-pharmacie.component';
import { DetailPharmacieComponent } from './admin/detail-pharmacie/detail-pharmacie.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { CommadesDetailComponent } from './admin/commades-detail/commades-detail.component';
import { CommadesStatusComponent } from './admin/commades-status/commades-status.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { ClientsDetailComponent } from './admin/clients-detail/clients-detail.component';
import { AddClientsComponent } from './admin/add-clients/add-clients.component';
import { ProduitsComponent } from './admin-pharmacie/produits/produits.component';
import { MessagesComponent } from './admin-pharmacie/messages/messages.component';
import { PhomeComponent } from './admin-pharmacie/phome/phome.component';
import { PcommandesComponent } from './admin-pharmacie/pcommandes/pcommandes.component';
import { PaddProductComponent } from './admin-pharmacie/padd-product/padd-product.component';
import { PeditProductComponent } from './admin-pharmacie/pedit-product/pedit-product.component';
import { PheadComponent } from './admin-pharmacie/phead/phead.component';
import { ProfilComponent } from './admin-pharmacie/profil/profil.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideStorage , getStorage} from '@angular/fire/storage'
import {provideAuth , getAuth} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AddCategorieComponent } from './admin/add-categorie/add-categorie.component';
import { AnswerCommandeComponent } from './admin-pharmacie/answer-commande/answer-commande.component';
import { CommandeDetailComponent } from './admin-pharmacie/commande-detail/commande-detail.component';
import { AnswerOrdonnanceComponent } from './admin-pharmacie/answer-ordonnance/answer-ordonnance.component';
import { ConfidentialiteComponent } from './confidentialite/confidentialite.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PharmacieComponent, 
    HeadComponent,
    AddPharmacieComponent,
    DetailPharmacieComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CommandesComponent,
    CommadesDetailComponent,
    CommadesStatusComponent,
    ClientsComponent,
    ClientsDetailComponent,
    AddClientsComponent,
    ProduitsComponent,
    MessagesComponent,
    PhomeComponent,
    PcommandesComponent,
    PaddProductComponent,
    PeditProductComponent,
    PheadComponent,
    ProfilComponent,
    AddCategorieComponent,
    AnswerCommandeComponent,
    CommandeDetailComponent,
    AnswerOrdonnanceComponent,
    ConfidentialiteComponent,
    
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
     AppRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    MatButtonModule ,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatBadgeModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=> getStorage()) ,
    provideAuth(()=> getAuth()),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
