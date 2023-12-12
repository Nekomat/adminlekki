import { Component,OnInit } from '@angular/core';
import { collection, Firestore, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-pcommandes',
  templateUrl: './pcommandes.component.html',
  styleUrls: ['./pcommandes.component.scss']
})
export class PcommandesComponent implements OnInit {
  constructor(private router : Router , 
     private fire : Firestore ,
     private service : DataService
    ){}
  //Go to commande detail
  GoToCommandeDetail(id){
    this.router.navigate(["/admin_pharmacie_commende_detail",id])
  }
  commandes:Array<any>=[]
  commandesSearch:Array<any>=[]
 async ngOnInit() {
  onSnapshot(collection(this.fire,"COMMANDES"),(data)=>{ 
    this.commandes = []
    this.commandesSearch=[]
      data.forEach((element)=>{
        let take :any = element.data() 
        take.time = new Date(take.time.seconds*1000)
        take.date = take.time.toLocaleDateString('fr') 
        this.commandes.push(take) 
        this.commandes.sort((a,b)=>b.time - a.time) 
         this.commandesSearch = this.commandes 
      })
  })
  //  const refPharCommande = await getDocs(collection(this.fire,"COMMANDES"))  
  //  refPharCommande.forEach((element)=>{
  //   let take :any = element.data() 
  //   take.time = new Date(take.time.seconds*1000) 
  //   // take.date = new Date(take.date.seconds*1000).toLocaleDateString('fr')
  //   this.commandes.push(take) 
  //  })
  //  this.commandes.sort((a,b)=>b.time - a.time) 
  //  this.commandesSearch = this.commandes 
  }

  // recherches 
  word=""
  
  Search(){
    if(this.word){
      this.commandes = this.commandesSearch.filter(e=>e.code.toLowerCase().includes(this.word.toLowerCase()))
    }else{
      this.commandes = this.commandesSearch
    }
  }
}
