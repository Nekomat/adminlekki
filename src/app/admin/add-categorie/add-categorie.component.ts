import { DialogModule } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { arrayUnion, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent {
   constructor(
    private fire:Firestore,
    private dialogCtrl : MatDialog
   ){

   }
  //  ajouter des categorie 
  cate=""
 async addCate(){ 
  if(this.cate) { 
    updateDoc(doc(this.fire,'CATEGORIE',"ZZJrAv46HHtHG48X7lVQ"),{
      cate:arrayUnion(this.cate)
    })
    alert('Categorie ajouté avec succes')
  }else{
    alert('Veuillez bien remplir le formulaire')
  }

  }

  close(){
   this.dialogCtrl.closeAll()
  }
}
