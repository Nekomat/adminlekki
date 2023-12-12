import { Component , OnInit } from '@angular/core';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
   constructor(
    private fire:Firestore,
    private service : DataService,
  private route : ActivatedRoute,
   private formCtrl : FormBuilder ,
   private storage : Storage
   ){}
   //control formulaire
  public Section:FormGroup
  public onePharmacie :any
  CloseAndOpenHour=[{
    index:0,
    open:'',
    close:''
  },{
    index:1,
    open:'',
    close:''
  },{
    index:2,
    open:'',
    close:''
  },{
    index:3,
    open:'',
    close:''
  },{
    index:4,
    open:'',
    close:''
  },{
    index:5,
    open:'',
    close:''
  },{
    index:6,
    open:'',
    close:''
  }]
  async ngOnInit() {
       let getid = this.route.snapshot.paramMap.get('id')
       let refPharmacie = await getDoc(doc(this.fire,"PHARMACIES",getid))
       if(( refPharmacie).exists()){
         this.onePharmacie=refPharmacie.data() 
          if(this.onePharmacie.CloseAndOpenHour){
            this.CloseAndOpenHour = this.onePharmacie.CloseAndOpenHour
          }
         this.Section= this.formCtrl.group({
          name:[this.onePharmacie.name,[Validators.required]],
          contact:[this.onePharmacie.contact,[Validators.required]],
          description:[this.onePharmacie.description,[Validators.required]],
           longitude:[this.onePharmacie.longitude , [Validators.required]],
           latitude:[this.onePharmacie.latitude, [Validators.required]],
           userName : [this.onePharmacie.email],
           password:[this.onePharmacie.password],
         })
       }

   }
    //take new img 
  file:any
  TakeImg(event){
  this.file=event.target.files[0]
  }
  //update pharmacie content 
  loader = false
  async Update(){
     //
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
        description : this.Section.value.description, 
        longitude:this.Section.value.longitude,
        latitude:this.Section.value.latitude,
        img:this.onePharmacie.img,
        email:this.Section.value.userName,
        password:this.Section.value.password,
        CloseAndOpenHour:this.CloseAndOpenHour 
      })
      alert('Mise à jour avec succes')
      this.loader=false
      this.ngOnInit()
    }else{
      alert('Veuillez bien remplir le formulaire')
    }
   }
}
