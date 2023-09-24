import { Component } from '@angular/core';
import { collection, doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-pharmacie',
  templateUrl: './add-pharmacie.component.html',
  styleUrls: ['./add-pharmacie.component.scss']
})
export class AddPharmacieComponent {
 constructor(private fire : Firestore , private formCtrl : FormBuilder,
  private storage : Storage ,
  private dialogCtrl : MatDialog
  ){} 
  //section controle de formulaire
  
 public Section:FormGroup = this.formCtrl.group({
   name:["",[Validators.required]],
   contact:["",[Validators.required]],
   openHour:["",[Validators.required]],
   closeHour:["",[Validators.required]],
   description:["",[Validators.required]],
   longitude:["" , [Validators.required]],
   latitude:["", [Validators.required]],
  })
  //take img 
  file:any
  TakeImg(event){
  this.file=event.target.files[0]
  }
  //add pharmacie 
  loader=false
  public AddPharmacie(){
    try {
      
      if(this.Section.valid){ 
        if(this.file){
          this.loader=true
      //add picture to the database
      const refProductImge = ref(this.storage , "Pharmacie/"+this.file.name) 
      uploadBytes(refProductImge,this.file).then(async(snapshot)=>{
        let linkPhoto = await getDownloadURL(snapshot.ref)
        //add now to firesstore 
         const refPharmacie = doc(collection(this.fire,"PHARMACIES")) 
         setDoc(refPharmacie,{
          id:refPharmacie.id,
          name:this.Section.value.name , 
          contact:this.Section.value.contact, 
          openHour:this.Section.value.openHour, 
          closeHour:this.Section.value.closeHour, 
          description : this.Section.value.description, 
          longitude:this.Section.value.longitude,
          latitude:this.Section.value.latitude,
          img:linkPhoto,
          email: `Phar${this.Section.value.name}@@lekki.web.app`,
          password:this.generateP(),
          time:Timestamp.now() 
         })
         this.loader=false
       alert('Pharmacie ajoutée avec succes')
       this.dialogCtrl.closeAll()
      })
        }else{
          alert('Veuillez bien remplir le formulaire')
          
        }
      
      }else{
        alert('Veuillez bien remplir le formulaire')
      }
    } catch (error) {
      alert('erreur veuillez reessayer')
      this.loader=false
    }
    
  }
  //generateur de mot passe 
  generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}
}
