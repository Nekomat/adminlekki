import { Component , OnInit } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import {MatDialog,} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPharmacieComponent } from '../add-pharmacie/add-pharmacie.component';
@Component({
  selector: 'app-pharmacie',
  templateUrl: './pharmacie.component.html',
  styleUrls: ['./pharmacie.component.scss']
})
export class PharmacieComponent implements OnInit {
constructor(private dialogCtrl : MatDialog , private router : Router ,
   private fire : Firestore
  ){}
 public AllPharmacie:Array<any>=[]
 private pharmacie:Array<any>=[]
 loader = false
 async ngOnInit() {
  this.loader= true
     const refAllPharmacie = await getDocs(collection(this.fire,"PHARMACIES")) 
     refAllPharmacie.forEach(async element => { 
      let take:any = element.data() 
      //prendre le nombre de produits de la pharmacie
      const refIsProduct = await getDocs(query(collection(this.fire,"PRODUCTS"), where("pharId","==",take.id))) 
      take.nbreP=0
      refIsProduct.forEach(elementP=>{
        take.nbreP+=1
      })
      // prendre le nombre de commandes 
      take.nbreC=0
      const refIscommande = await getDocs(query(collection(this.fire,"COMMANDES"), where("idPhar","==",take.id)))
       refIscommande.forEach(elementC=>{
        take.nbreC+=1
       })
      this.AllPharmacie.push(take)
      this.pharmacie=this.AllPharmacie
     })
    
     this.loader = false
     
  }
//open add pharmacie 
 OpenAddPharmacie(){
  this.dialogCtrl.open(AddPharmacieComponent)
  this.dialogCtrl.afterOpened.subscribe(()=>{
    this.ngOnInit()
  })
 }
 //click on pharmacie 
 GoToOnePharmacie(id){
   this.router.navigate(['/pharmacie_detail',id])
 }
 //search 
 word=""
 OnSearch(){
  if(this.word){
    this.AllPharmacie=this.pharmacie.filter(e => e.name.toLowerCase().includes(this.word.toLowerCase()))
  }else{
    this.AllPharmacie=this.pharmacie 
  }
 }
  

}
