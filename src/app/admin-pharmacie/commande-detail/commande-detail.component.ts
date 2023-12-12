import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { doc, Firestore, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommadesStatusComponent } from 'src/app/admin/commades-status/commades-status.component';
import { DataService } from 'src/app/data.service';
import { AnswerCommandeComponent } from '../answer-commande/answer-commande.component';

@Component({
  selector: 'app-commande-detail',
  templateUrl: './commande-detail.component.html',
  styleUrls: ['./commande-detail.component.scss']
})
export class CommandeDetailComponent {
  constructor(private dialogCtrl : MatDialog ,
    private route : ActivatedRoute,
    private Back:Location,
    private fire : Firestore ,
    private service : DataService
   ){}

  //   //open status commande 
  OpenStatus(){
    this.service.commandId=this.route.snapshot.paramMap.get('id') 
    this.service.commande=this.oneCommande
    this.dialogCtrl.open(AnswerCommandeComponent)
  }
  oneCommande:any
  loader = false
 async ngOnInit() {
  this.loader = true
     let getId =  this.route.snapshot.paramMap.get('id')  
     onSnapshot(doc(this.fire,"COMMANDES",getId),(data)=>{
      if(data.exists()){
        this.oneCommande = data.data()
        this.oneCommande.date = new Date(this.oneCommande.time.seconds*1000).toLocaleDateString('fr') 
        this.loader = false
      }
     }) 
    //  const refCommande = await onSnapshot(doc(this.fire,"COMMANDES",getId)) 
    //  if(refCommande.exists()) {
    // this.oneCommande = refCommande.data() 
    // 
    // 
    //  }
  }

  // go back 
  GoBack(){
    this.Back.back()
  }
}
