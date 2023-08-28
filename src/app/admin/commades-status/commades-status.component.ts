import { Component } from '@angular/core';

@Component({
  selector: 'app-commades-status',
  templateUrl: './commades-status.component.html',
  styleUrls: ['./commades-status.component.scss']
})
export class CommadesStatusComponent {
  statut=[
    {
      name:'En traitement',
      active:true  ,
      checked:true ,
      text:'En traitement'
    },
    {
      name:'Acceptée',
      active:false  ,
      checked:false ,
      text:'Aceeptée'
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
  Statut=""
  Texte=""
  
}
