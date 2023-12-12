import { Component , OnInit } from '@angular/core';
import { collection, doc, Firestore, getDoc, setDoc, Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

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
  private route : ActivatedRoute ,
  private service : DataService ,
  private dialogCtrl : MatDialog
 ){}
 //control formulaire 
 public section : FormGroup = this.formCtrl.group({
  name:['',[Validators.required]] ,
  prix :['',Validators.required],
  poids:['',[Validators.required]],
  categories:['',[Validators.required]],
  description:['',[Validators.required]],
  smallDescribe:[""]
 })
 file:any 
 TakeImg(event){
 this.file=event.target.files[0] 
 }
 onPharmacie:any
async ngOnInit() {
   let getid = this.route.snapshot.paramMap.get('id') 
   console.log(getid);
   const refPharmacie = await getDoc(doc(this.fire,"PHARMACIES",this.service.adminPharId)) 
    if(refPharmacie.exists()){  
      this.onPharmacie = refPharmacie.data() 
    } 
 }
//  selection de pharmacie pour generer la sous categorie 
sousCate="" 
    SelectCate(event){
      this.sousCate=event.target.value
    } 
 //add Product
 loader = false
 async AddProduct(){
  if(this.section.valid){
    if(this.file){ 
      this.loader = true
      let linkImg=""
      const refProductImge = ref(this.storage , "Product/"+this.file.name) 
      let refImg = await uploadBytes(refProductImge,this.file)
      linkImg = await getDownloadURL(refImg.ref) 
      const refDoc = doc(collection(this.fire,"PRODUCTS")) 
      setDoc(refDoc,{ 
        id:refDoc.id,
        name:this.section.value.name,
        price:this.section.value.prix,
        poids:this.section.value.poids,
        pharId:this.service.adminPharId,
        pharName:this.onPharmacie.name,
        photo:linkImg,
        cateName:this.section.value,
        description:this.section.value.description,
        time:Timestamp.now() ,
        smallDescribe:this.section.value.smallDescribe,
        disponible:'true'
      })
      this.loader = false 
      this.dialogCtrl.closeAll()
      alert('produits ajoutés') 
    }else{
      alert('Veuillez ajouter une photo')
    }
  }else{
    console.log(this.section.value)
    alert("Veuillez bien remplir le formulaire")
  }
 }
}
