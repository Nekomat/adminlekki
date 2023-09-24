import { Component , OnInit } from '@angular/core';
import { collection, Firestore,getDocs } from '@angular/fire/firestore';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 constructor(public service :DataService ,
  private fire : Firestore 
  ){}
comandesDetail={
  total:0,
  fs:0,
  ft:0,
  tc:0,
  st:0,
  // pour le statut des commandes
  ct:0,
  ccl:0,
  cl:0,
  ca:0,
  // pour le total commandes
  allCt:0
}
// le total des client 
totalClient=0
// total Pharmacie
totalPharmacie = 0
// pour le total Produits
totalProduits = 0
// loader
loader = true
async ngOnInit()  {
    //  prendres les commandes 
    const refCommandes = await getDocs(collection(this.fire,"COMMANDES")) 
     refCommandes.forEach(element=>{
      let take:any = element.data() 
      this.comandesDetail.total+=take.total 
      this.comandesDetail.fs+=take.fs
      this.comandesDetail.ft+=take.ft
      this.comandesDetail.st+=take.st
      // pour le status des commandes 
      if(take.status == 'En traitement'){
      this.comandesDetail.ct+=1
      }else if (take.status == "En cour de livraison"){
          this.comandesDetail.ccl+=1
      }else if (take.status == 'Livrée'){
         this.comandesDetail.cl+=1
      }else if (take.status == 'Annuléé') {
         this.comandesDetail.ca+=1
      }
   this.comandesDetail.allCt+=1
     })
    //  prendre le total des clients 
    const refClients = await getDocs(collection(this.fire,"USERS"))
    refClients.forEach(element=>{
      this.totalClient+=1
    })
    // prendre le total Pharmacie 
    const refPharmacies = await getDocs(collection(this.fire,"PHARMACIES")) 
    refPharmacies.forEach(element=>{
      this.totalPharmacie+=1
    })
     // prenre tous les produits 
  const refProduct = await getDocs(collection(this.fire,"PRODUCTS"))
  refProduct.forEach(element =>{
     this.totalProduits+=1
  })
  this.loader = false
  }

 

}
