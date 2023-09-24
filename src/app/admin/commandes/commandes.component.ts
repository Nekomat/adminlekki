import { Component , OnInit} from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
 constructor(private router : Router ,
  private fire : Firestore
  ){}
 //Go to commande detail
 GoToCommandeDetail(id){
  this.router.navigate(['/admin_commandes_detail',id])
 }
 allCommandes:Array<any>=[]
 allCommandesSearch:Array<any>=[]
 async ngOnInit() {
    const refAllCommande = await getDocs(collection(this.fire,"COMMANDES"))  
    refAllCommande.forEach(element =>{
      let take : any = element.data()
      take.date = new Date(take.time.seconds*1000).toLocaleString('fr')
      this.allCommandes.push(take) 
    })
    this.allCommandesSearch=this.allCommandes
 }
//  recherche 
word="" 
Search(){
  if(this.word){
    this.allCommandes= this.allCommandesSearch.filter(e=>e.code == e.code.toLowerCase().includes(this.word.toLowerCase())) 
  }else{
    this.allCommandes = this.allCommandesSearch
  }
}
}
