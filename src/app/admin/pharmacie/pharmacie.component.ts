import { Component , OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
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
 async ngOnInit() {
     const refAllPharmacie = await getDocs(collection(this.fire,"PHARMACIES")) 
     refAllPharmacie.forEach(element => {
      this.AllPharmacie.push(element.data()) 
     })
     this.pharmacie=this.AllPharmacie
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
 //Go to one Pharmacie 

}
