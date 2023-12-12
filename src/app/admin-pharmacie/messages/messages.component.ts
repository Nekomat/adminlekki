import { Component , OnInit } from '@angular/core';
import { collection, doc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { AnswerOrdonnanceComponent } from '../answer-ordonnance/answer-ordonnance.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
 constructor(
  private fire : Firestore,
  public service : DataService,
  private dialogCtrl : MatDialog
 ){
  // if(service.messages){
  //   service.messages[this.index].active = true 
  // }
 
 }
 ordonnances:Array<any> = []
 async ngOnInit() {
   onSnapshot(collection(this.fire,"ORDONNANCES"),(data)=>{
    this.ordonnances = []
    data.forEach((element)=>{
      let take :any = element.data()
      take.time = new Date(take.time.seconds*1000)
      take.date = take.time.toLocaleDateString('fr') 
      this.ordonnances.push(take) 
      this.ordonnances.sort((a,b)=>b.time - a.time)
    })
   })
  }
// voir l'ordonnace 
 showPicture(data){
  window.open(data.link)
 }
//  repondre a l'ordonnance 
repondre(data){
  this.service.ordonance = data
 this.dialogCtrl.open(AnswerOrdonnanceComponent)
}
//  index = 0 
 
// upadetMessageStatus(Index){
//    if(this.service.messages){
//     this.index = Index
//   this.service.messages[Index].badge=0
//   this.service.messages[Index].active = true 
//   this.service.messages[Index].message.forEach(element=>{
//     element.vuAdmin=true
//   })
//   updateDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId),{
//     messages:this.service.messages
//   }) 
//    }
// }
// send message 
// word=""
  // sendMessage(){
  //   if(this.word){
  //     let take = this.service.messages 
  //   take[this.index].message.push({
  //     message:this.word,
  //     time:new Date().toLocaleDateString('fr') ,
  //     type:'admin',
  //     vuC:false,
  //     vuAdmin:true
  //   })
  //   updateDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId),{
  //     messages:take
  //   })
  //   this.word = ""
  //   }
    
  // }
}
