import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component ,OnInit } from '@angular/core';
import { doc, Firestore , getDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-commades-status',
  templateUrl: './commades-status.component.html',
  styleUrls: ['./commades-status.component.scss']
})
export class CommadesStatusComponent implements OnInit { 
  constructor(
    private service : DataService,
    private fire : Firestore ,
    private http:HttpClient ,
    private dialoCtrl : MatDialog
  ){}
  commadeData:any
async  ngOnInit() {
    const refcommande = await getDoc(doc(this.fire,"COMMANDES",this.service.commandId))
     if(refcommande.exists()){
       this.commadeData = refcommande.data() 
       if(this.commadeData.status == "En traitement"){
        this.statut[0].active=true
        this.statut[0].checked=true
       }else if (this.commadeData.status == "En cour de livraison"){
        this.statut[1].active=true
        this.statut[1].checked=true
       }else if (this.commadeData.status == "Livrée"){
        this.statut[1].active=true
        this.statut[1].checked=true
        this.statut[2].active=true 
        this.statut[2].checked=true
       }else if (this.commadeData.status =="Annulée"){
        this.statut[0].active=true
        this.statut[0].checked=false
        this.statut[1].active=true
        this.statut[1].checked=false
        this.statut[2].active=true 
        this.statut[2].checked=false
        this.statut[3].active=true
        this.statut[3].checked=false
       }
     }
  }
  statut=[
    {
      name:'En traitement',
      active:true ,
      checked:true ,
      text:'En traitement'
    },
    
    {
      name:'En cour de livraison',
      active:false ,
      checked:false ,
      text : 'En cours de livraison'
    },
    {
      name:'Livrée',
      active:false  ,
      checked:false ,
      text:"Livrée"
    },
    {
      name:'Annulée',
      active:false ,
      checked:false ,
      text:'Annulée'
    },

  ]
  //changement de statut
  Onecommande={ID:""}
  Statut:any
  Texte=""
  // change le statut 
  change(event){
   if(event.target.checked == true){
     this.Statut = event.target.name
   }else{
    this.Statut = undefined
   }
  }
  // changer le statut envoyer le message 
  loader = false
 async ChangeStatus(){
  if(this.Statut){
    this.loader = true
    const refToken = await getDoc(doc(this.fire,"APPINFO","DjhFwmiL3MK9p8jghUEd")) 
    let token:any
    if(refToken.exists()){
      token=refToken.data()
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.tokenSms}`})
      };
      let data2= {
        'outboundSMSMessageRequest': {
          'address': `tel:+224${this.commadeData.userNumero}`,
          'senderAddress': 'tel:+2240000',
          "senderName": "Lekki appli",
          'outboundSMSTextMessage': { 
              'message': this.Texte 
          }
      }
        }
        this.http.post('https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',data2,httpOptions).subscribe(()=>{
           updateDoc(doc(this.fire,"COMMANDES",this.commadeData.id),{
            status:this.Statut
           })
           alert("le Statut de la commande a été changé et le message a été envoyé")
           this.loader=false
           this.dialoCtrl.closeAll()
        },()=>{
          this.loader = false
          alert('erreur veuillez reessayer')
        })
    }
  }else{
    alert('Veuiller choisir un statut')
  }
    
  }
}
