import { Component,OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddClientsComponent } from '../add-clients/add-clients.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
 constructor(private dialogCtrl : MatDialog , private router : Router ,
   private fire : Firestore
  ){} 

 //open save client 
 OpenSaveClient(){ 
  this.dialogCtrl.open(AddClientsComponent)
  this.dialogCtrl.afterAllClosed.subscribe(()=>{
    this.allUser=[]
    this.allUserSearch=[]
    this.ngOnInit()
  })
 }
 //go to one client 
 GoToOneClient(id){
  this.router.navigate(['/client_detail',id])
 }
 allUser:Array<any>=[]
 allUserSearch:Array<any>=[]
 async ngOnInit() {
  // ajouter des categorie 
  
  const refAllUser = await getDocs(collection(this.fire,"USERS"))
  refAllUser.forEach(element=>{
    let take:any = element.data()
    take.Date = new Date(take.time.seconds*1000).toLocaleDateString('fr')
    this.allUser.push(take)
  })
  this.allUserSearch = this.allUser
 }
 word=""
 Search(){
 if(this.word){
  this.allUser = this.allUserSearch.filter(e=>e.code==this.word)
 }else{
  this.allUser = this.allUserSearch
 }
 }
}
