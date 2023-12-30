import { Location } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { CommadesStatusComponent } from '../commades-status/commades-status.component';

@Component({
  selector: 'app-commades-detail',
  templateUrl: './commades-detail.component.html',
  styleUrls: ['./commades-detail.component.scss']
})
export class CommadesDetailComponent implements OnInit {
  constructor(private dialogCtrl : MatDialog ,
     private route : ActivatedRoute,
     private Back:Location,
     private fire : Firestore ,
     private service : DataService
    ){}
  //open status commande 
  OpenStatus(){ 
    if(this.oneCommande.statut=='En cour de traitement'){
      alert("la commande n'est pas encore traitée par une pharmacie") 
      return
    }
    this.service.commandId=this.route.snapshot.paramMap.get('id') 
    this.dialogCtrl.open(CommadesStatusComponent)
    this.dialogCtrl.afterAllClosed.subscribe(()=>{
      this.ngOnInit()
    })
  }
  oneCommande:any
  loader = false
 async ngOnInit() {
  this.loader = true
     let getId =  this.route.snapshot.paramMap.get('id')  
     const refCommande = await getDoc(doc(this.fire,"COMMANDES",getId)) 
     if(refCommande.exists()) {
    this.oneCommande = refCommande.data() 
    this.oneCommande.date = new Date(this.oneCommande.time.seconds*1000).toLocaleDateString('fr') 
    this.loader = false
     }
  }

  // go back 
  GoBack(){
    this.Back.back()
  }
}
