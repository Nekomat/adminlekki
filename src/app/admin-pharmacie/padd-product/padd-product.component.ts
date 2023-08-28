import { Component , OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-padd-product',
  templateUrl: './padd-product.component.html',
  styleUrls: ['./padd-product.component.scss']
})
export class PaddProductComponent implements OnInit {
 constructor(
  private fire : Firestore,
  private storage : Storage , 
  private formCtrl : FormBuilder , 
  private route : ActivatedRoute
 ){}
 //control formulaire 
 public section : FormGroup = this.formCtrl.group({
  name:['',[Validators.required]] ,
  prix :['',Validators.required],
  poids:['',[Validators.required]],
  categories:['',[Validators.required]],
  description:['',[Validators.required]],
 })
 file:any 
 TakeImg(event){
 this.file=event.target.files[0] 
 }
 onPharmacie:any
async ngOnInit() {
   let getid = this.route.snapshot.paramMap.get('id') 
   const refPharmacie = await getDoc(doc(this.fire,"PHARMACIES",getid)) 
    if(refPharmacie.exists()){  
      this.onPharmacie = refPharmacie.data() 
    }
 }
 //add Product 
 async AddProduct(){
  if(this.section.valid){
    if(this.file){
      let linkImg=""
      const refProductImge = ref(this.storage , "Pharmacie/"+this.file.name) 
      let refImg = await uploadBytes(refProductImge,this.file)
      linkImg = await getDownloadURL(refImg.ref) 
      
    }
  }
 }
}
