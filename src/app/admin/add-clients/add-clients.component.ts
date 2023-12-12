import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore,doc,collection,setDoc, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss']
})
export class AddClientsComponent {
 constructor(
  private fire:Firestore,
  private auth : Auth,
  private formCtrl : FormBuilder ,
  private matDialog:MatDialog
 ){}
 section :FormGroup = this.formCtrl.group({
  prenom:["",[Validators.required , Validators.minLength(4)]],
  family:["",[Validators.required , Validators.minLength(4)]],
  numero:["",[Validators.required , Validators.pattern(/^(\+\d{3}\s?)?\(?6\d{2}\)?[\s-]*\d{2}[\s-]*\d{2}[\s-]*\d{2}$/)]] ,
  password :["",[Validators.required , Validators.minLength(5)]] 
})   

// ajouter l'utilisateur 
loader = false
 AddUser(){
  if(this.section.valid){
    try {
      let  code =this.section.value.prenom[0]+this.section.value.family[0]+`${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`
      createUserWithEmailAndPassword(this.auth,`${code}l@lekki.com`,this.section.value.password).then((user)=>{
        this.loader = true
        const refUser = doc(this.fire,"USERS",user.user.uid) 
        setDoc(refUser,{
             id:user.user.uid,
             code:code,
              name:this.section.value.prenom,
              family : this.section.value.family,
               numero : this.section.value.numero,
               email:`${code}@lekki.com`,
               password:this.section.value.password,
               time:Timestamp.now()
        })
        this.loader=false
        alert("Utilisateur ajouté") 
        this.matDialog.closeAll()
      })
    } catch (error) {
      alert('Erreur reessayer')
    }
   
  }else{
    console.log(this.section.value);
    
    alert('Veuillez bien remplir le formulaire')
  }
 }
}
