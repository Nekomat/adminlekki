import { Component , OnInit } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
 constructor(
  private fire : Firestore,
  public service : DataService
 ){
  service.messages[this.index].active = true 
 }
 async ngOnInit() {
    this.upadetMessageStatus(this.index)
  }
 index = 0 
 
upadetMessageStatus(Index){
   this.index = Index
  this.service.messages[Index].badge=0
  this.service.messages[Index].active = true 
  this.service.messages[Index].message.forEach(element=>{
    element.vuAdmin=true
  })
  updateDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId),{
    messages:this.service.messages
  }) 
}
// send message 
word=""
  sendMessage(){
    if(this.word){
      let take = this.service.messages 
    take[this.index].message.push({
      message:this.word,
      time:new Date().toLocaleDateString('fr') ,
      type:'admin',
      vuC:false,
      vuAdmin:true
    })
    updateDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId),{
      messages:take
    })
    this.word = ""
    }
    
  }
}
