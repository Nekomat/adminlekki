import { Component , OnInit} from '@angular/core';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-pharmacie',
  templateUrl: './detail-pharmacie.component.html',
  styleUrls: ['./detail-pharmacie.component.scss']
})
export class DetailPharmacieComponent implements OnInit {
  constructor(
    private fire : Firestore,
    private route : ActivatedRoute ,
    private formCtrl : FormBuilder,
    private storage : Storage
  ){}
  public onePharmacie :any
  //control formulaire
  public Section:FormGroup
 async ngOnInit() {
      let getid = this.route.snapshot.paramMap.get('id') 
      const refPharmacie = await getDoc(doc(this.fire,"PHARMACIES", getid))
      if(refPharmacie.exists()){
      this.onePharmacie=refPharmacie.data()
     this.Section= this.formCtrl.group({
        name:[this.onePharmacie.name,[Validators.required]],
        contact:[this.onePharmacie.contact,[Validators.required]],
        openHour:[this.onePharmacie.openHour,[Validators.required]],
        closeHour:[this.onePharmacie.closeHour,[Validators.required]],
        description:[this.onePharmacie.description,[Validators.required]],
         longitude:[this.onePharmacie.longitude , [Validators.required]],
         latitude:[this.onePharmacie.latitude, [Validators.required]],
         userName : [this.onePharmacie.email],
         password:[this.onePharmacie.password]
       })
      }
  }
  //take new img 
  file:any
  TakeImg(event){
  this.file=event.target.files[0]
  }
  //update pharmacie 
  loader=false
 async Update(){
  try {
  
    if(this.Section.valid){
      this.loader=true
      if(this.file){
        const refProductImge = ref(this.storage , "Pharmacie/"+this.file.name) 
        let refImg = await uploadBytes(refProductImge,this.file)
        this.onePharmacie.img= await getDownloadURL(refImg.ref)
      }
      updateDoc(doc(this.fire,"PHARMACIES",this.route.snapshot.paramMap.get('id') ),{
        name:this.Section.value.name , 
        contact:this.Section.value.contact, 
        openHour:this.Section.value.openHour, 
        closeHour:this.Section.value.closeHour, 
        description : this.Section.value.description, 
        longitude:this.Section.value.longitude,
        latitude:this.Section.value.latitude,
        img:this.onePharmacie.img,
        email:this.Section.value.userName,
        password:this.Section.value.password,
      })
      alert('Mise à jour effectué')
      this.loader=false
    }else{
      alert('veuillez bien remplir le formulaire')
    }
  } catch (error) {
    alert('erreur veuillez reeassayer')
  }
  }

  // delete pharmacie 
  delete(){
    
  }
}
