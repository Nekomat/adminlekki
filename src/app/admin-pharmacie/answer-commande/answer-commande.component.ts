import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Firestore, updateDoc,doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-answer-commande',
  templateUrl: './answer-commande.component.html',
  styleUrls: ['./answer-commande.component.scss']
})
export class AnswerCommandeComponent {
  constructor(private fire:Firestore , private service : DataService ,
     private dialogCtrl : MatDialog ,
     private http:HttpClient
    ){}
  description=""
  Total = ""
  fs = ""
  loader = false
async Envoyer(){
  if(this.Total && this.description && this.fs){
    this.loader = true
    const refToken = await getDoc(doc(this.fire,"APPINFO","WO3qaXwpoanK4N84qPF7")) 
    if(refToken.exists()) {
       const tokenHisData :any = refToken.data() 
       const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenHisData.tokenSms}`})
      };
      let data2= {
        'outboundSMSMessageRequest': {
          'address': `tel:+224${this.service.commande.numero}`,
          'senderAddress': 'tel:+2240000',
          "senderName": "Lekki",
          'outboundSMSTextMessage': { 
              'message': `Bonjour votre commande N°${this.service.commande.code} a été traitée avec succes veuillez vous rendre dans lekki la section commande pour plus de detail` 
          }
      }
        }
        this.http.post('https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',data2,httpOptions).subscribe(()=>{
          updateDoc(doc(this.fire,"COMMANDES",this.service.commandId),{
            statut:'Traite',
            note:this.description,
            st: parseInt(this.Total) ,
            fs:parseInt(this.fs),
            idPhar:this.service.pharmacie.id,
            pharName:this.service.pharmacie.name,
            pharContact:this.service.pharmacie.contact
           }) 
           this.loader=false
           alert("Reponse envoyer à l'utilisateur")
           this.dialogCtrl.closeAll()
        },()=>{
          alert('Erreur veuillez reessayer') 
          this.loader = false
        })
  }else{
    alert('Veuillez bien remplir le formulaire')
  }
}
 }
}
