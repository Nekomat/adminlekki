import { Component,OnInit } from '@angular/core';
import { Firestore, getDoc,doc, deleteDoc, collection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss']
})
export class ClientsDetailComponent implements OnInit {
 constructor(private fire : Firestore,
  private route : ActivatedRoute,
  private router:Router
  ){
    
 }
 user:any
 loader=false
async ngOnInit() {
  this.loader =true
   let geId = this.route.snapshot.paramMap.get('id')
   const refUser = await getDoc(doc(this.fire,'USERS',geId))
   if(refUser.exists()){ 
    this.user=refUser.data() 
    this.user.date = new Date(this.user.time.seconds*1000).toLocaleDateString('fr') 
    this.loader = false 
   }
 }
//  delete Account 
  DeleteAccount(){
    let value = confirm('Voulez-vous supprimer cet utilisateur') 
    if(value){
      deleteDoc(doc(this.fire,"USERS",this.route.snapshot.paramMap.get('id'))).then(()=>{
        alert('Utilisateur supprimé')
        this.router.navigateByUrl('/clients')
      })
    }
   
  }
}
