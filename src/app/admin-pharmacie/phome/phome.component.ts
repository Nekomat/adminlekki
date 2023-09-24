import { Component,OnInit } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phome',
  templateUrl: './phome.component.html',
  styleUrls: ['./phome.component.scss']
})
export class PhomeComponent implements OnInit {
  constructor(
    private fire:Firestore ,
    private route: ActivatedRoute
  ){}
  commandeDetail={
    total:0,
    st:0,
    li:0,
    nbreC:0,
    // status des commandes
    ct:0,
    ccl:0,
    cl:0,
    ca:0
  }
  nbreProduit=0
  loader = false
async  ngOnInit() {
  this.loader = true
  let getId = this.route.snapshot.paramMap.get('id')
    const refHisCommande = await getDocs(query(collection(this.fire,'COMMANDES'), where('idPhar','==',getId))) 
     refHisCommande.forEach(element =>{
      let take:any = element.data()
       if(take.status=="En traitement"){
        this.commandeDetail.ct+=1
       }else if (take.status == "En cour de livraison"){
        this.commandeDetail.ccl+=1
       }else if (take.status=="Livrée"){
        this.commandeDetail.cl+=1
       }else if (take.status== "Annulée"){
         this.commandeDetail.ca+=1
       }
       this.commandeDetail.nbreC+=1
       this.commandeDetail.total+=take.total
       this.commandeDetail.st +=take.st
       this.commandeDetail.li+=take.ft
     })
    //  le nombre de produits 
    const refHisProduit = await getDocs(query(collection(this.fire,'PRODUCTS'), where('pharId','==',getId)))
    refHisProduit.forEach((element)=>{
      this.nbreProduit+=1
    })
    this.loader = false
  }
}
